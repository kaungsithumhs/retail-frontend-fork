"use client";

import React, { MutableRefObject, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { createRecordSchema } from "@/common/validators";
import { Branch, CreateRecordInput, PayType, RecordType } from "@/common/types";
import FloppyDisk from "@/components/icons/floppy-disk.svg";
import QuestionMarkIcon from "@/components/icons/question-mark.svg";
import CheckCircleIcon from "@/components/icons/check-circle.svg";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ROUTES } from "@/common/constants";
import { PaymentTabs } from "./PaymentTabs";
import { FormInputs } from "./FormInputs";
import { convertCalendarToNumeric, removeNumberComma } from "@/common/utils";
import { feeService } from "@/lib/api/fees";
import { branchService } from "@/lib/api/branch";
import { recordService } from "@/lib/api/records";
import { toast } from "sonner";

export function RecordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<CreateRecordInput | null>(
    null,
  );
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedPay, setSelectedPay] = useState<PayType>("kbz");
  const [selectedTab, setSelectedTab] = useState<RecordType>("pay");

  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [branches, setBranches] = useState<Branch[]>([]);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<CreateRecordInput>({
    resolver: async (data, context, options) => {
      const schema = createRecordSchema({
        selectedPay,
        selectedTab,
        hasBranches: branches.length > 0,
      });
      return zodResolver(schema)(data, context, options);
    },
    defaultValues: {
      fee: "0",
      amount: "0",
    } as Partial<CreateRecordInput>,
    mode: "onChange",
  });

  useEffect(() => {
    if (!currentAmount) {
      setValue("fee", "0");
      return;
    }

    feeService
      .getByAmount(currentAmount)
      .then((response) => {
        setValue("fee", String(response?.transferFee?.fee ?? 0));
      })
      .catch(() => {
        setValue("fee", "0");
      });
  }, [currentAmount, setValue]);

  useEffect(() => {
    branchService
      .getAll()
      .then((response) => {
        setBranches(response?.branches ?? []);
      })
      .catch(() => {
        setBranches([]);
      });
  }, []);

  const handleFormSubmit = async (data: CreateRecordInput) => {
    setPendingData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingData) return;
    setIsLoading(true);
    try {
      await recordService.create({
        ...pendingData,
        branchId: Number(pendingData.branchId) || undefined,
        amount: Number(removeNumberComma(pendingData.amount)),
        fee: Number(removeNumberComma(pendingData.fee)),
        date: convertCalendarToNumeric(pendingData.date),
        pay: selectedTab === "pay" ? selectedPay : "other",
        description:
          selectedPay === "other" || selectedTab === "bank"
            ? pendingData.description
            : "",
        type: selectedTab,
      });
      setIsLoading(false);
      setShowConfirmDialog(false);
      setPendingData(null);
      setShowSuccessDialog(true);
      reset();
    } catch (error: any) {
      setIsLoading(false);
      setShowConfirmDialog(false);
      setPendingData(null);
      toast.error(
        "ငွေလွှဲ/ငွေထုတ် ထည့်ရာတွင် အမှားတစ်ခုခု ဖြစ်ပွားခဲ့သည်။ ကျေးဇူးပြု၍ နောက်မှ ထပ်မံကြိုးစားပါ။",
      );
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmDialog(false);
    setPendingData(null);
  };

  const handleAddNewSubmit = async () => {
    setShowSuccessDialog(false);
    setPendingData(null);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="rt-flex rt-flex-col rt-gap-6 rt-mt-5 rt-relative rt-flex-1"
    >
      <PaymentTabs
        selectedTab={selectedTab}
        selectedPay={selectedPay}
        control={control}
        errors={errors}
        onTabChange={setSelectedTab}
        onPayChange={setSelectedPay}
      />

      <FormInputs
        control={control}
        setValue={setValue}
        errors={errors}
        branches={branches}
        currentAmount={currentAmount}
        setCurrentAmount={setCurrentAmount}
        trigger={trigger}
      />

      <div className="rt-flex rt-items-center rt-justify-center rt-gap-3 rt-w-full rt-h-[94px] rt-shadow-[0px_-2px_15px_0px_rgba(0,0,0,0.1)] rt-sticky rt-bottom-0 rt-left-0 rt-bg-white rt-mt-auto rt-z-50">
        <Button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="rt-text-white rt-w-11/12 "
        >
          <span className="rt-font-noto rt-text-md rt-mr-[7px]">
            စာရင်းမှတ်တမ်း မှတ်မည်
          </span>
          <FloppyDisk />
        </Button>
      </div>

      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        icon={<QuestionMarkIcon />}
        title="စာရင်းမှတ်ရန် သေချာပါသလား။"
        subtitle="ယခုစာရင်းကို မှတ်ရန် သေချာပါသလား။"
        primaryButtonText="သေချာပါသည်"
        secondaryButtonText="ပြန်စစ်ဆေးမည်"
        onPrimaryClick={handleConfirmSubmit}
        onSecondaryClick={handleCancelSubmit}
        showCloseButton
        primaryButtonDisabled={isLoading}
      />

      <ConfirmDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        icon={<CheckCircleIcon />}
        title="စာရင်းမှတ်ပြီးပါပြီ။"
        primaryButtonText="အသစ်ထပ်ထည့်မည်"
        secondaryButtonText="ပင်မစာမျက်မှာသို့သွားမည်"
        onPrimaryClick={handleAddNewSubmit}
        secondaryButtonHref={ROUTES.HOME}
        primaryButtonDisabled={isLoading}
      />
    </form>
  );
}
