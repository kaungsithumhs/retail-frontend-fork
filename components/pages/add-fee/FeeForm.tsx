"use client";

import { CreateFeeApiInput, Fee } from "@/common/types";
import { toast } from "sonner";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Control,
  FieldErrors,
  UseFieldArrayRemove,
  useForm,
  UseFormReset,
} from "react-hook-form";
import ArrowCircleRightIcon from "@/components/icons/arrow-circle-right.svg";
import CircleXIcon from "@/components/icons/circle-x.svg";
import WarningIcon from "@/components/icons/warning.svg";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import QuestionMarkIcon from "@/components/icons/question-mark.svg";
import CheckCircleIcon from "@/components/icons/check-circle.svg";
import { useRouter } from "next/router";
import { cn, removeNumberComma } from "@/common/utils";
import { feeService } from "@/lib/api/fees";
import { ROUTES } from "@/common/constants";

export interface FeeInputsProps {
  fields: Fee[];
  remove: UseFieldArrayRemove;
  control: Control<{ fees: Fee[] }>;
  trigger: ReturnType<typeof useForm<{ fees: Fee[] }>>["trigger"];
  handleSubmit: ReturnType<typeof useForm<{ fees: Fee[] }>>["handleSubmit"];
  isDirty: boolean;
  errors: FieldErrors<{ fees: Fee[] }>;
  reset: UseFormReset<{
    fees: Fee[];
  }>;
}

export function FeeForm({
  fields,
  remove,
  control,
  handleSubmit,
  trigger,
  errors,
  isDirty,
  reset,
}: FeeInputsProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [pendingData, setPendingData] = useState<CreateFeeApiInput[]>([]);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [showSaveConfirmDialog, setShowSaveConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [currentSelectedFeeIndex, setCurrentSelectedFeeIndex] = useState<
    number | null
  >(null);

  const handleDeleteConfirm = () => {
    if (currentSelectedFeeIndex !== null) {
      remove(currentSelectedFeeIndex);

      toast.success("လွှဲခကို ဖျက်ပြီးပါပြီ။");
      setShowDeleteConfirmDialog(false);
      setCurrentSelectedFeeIndex(null);
    }
  };

  const handleCancel = () => {
    setShowSaveConfirmDialog(false);
    setShowDeleteConfirmDialog(false);
    setCurrentSelectedFeeIndex(null);
  };

  const handleConfirmSubmit = async () => {
    if (pendingData.length === 0) return;
    setIsLoading(true);
    try {
      await feeService.create({ data: pendingData });

      setIsLoading(false);
      setShowSaveConfirmDialog(false);
      setShowSuccessDialog(true);
    } catch (error) {
      setIsLoading(false);
      setShowSaveConfirmDialog(false);
      toast.error(
        "လွှဲခအသစ် ထည့်ရာတွင် အမှားတစ်ခုခု ဖြစ်ပွားခဲ့သည်။ ကျေးဇူးပြု၍ နောက်မှ ထပ်မံကြိုးစားပါ။",
      );
    }
  };

  const handleFormSubmit = async (data: { fees: Fee[] }) => {
    setPendingData(
      data.fees.map((fee) => ({
        from: Number(removeNumberComma(fee.from)),
        to: Number(removeNumberComma(fee.to)),
        fee: Number(removeNumberComma(fee.fee)),
      })),
    );
    setShowSaveConfirmDialog(true);
  };

  return (
    <div className="rt-mt-[15px] rt-relative rt-flex-1 rt-flex rt-flex-col">
      <form
        className="rt-flex-1 rt-flex rt-flex-col"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="rt-pl-5 rt-pr-3 last:rt-border-0">
          {fields.map((fee, index) => (
            <div
              className="rt-border-b last:rt-border-0 rt-py-[15px]"
              key={fee.id}
            >
              <div className="rt-grid rt-grid-cols-[188fr_132fr_30fr] rt-gap-[10px] rt-w-full">
                <FormInput
                  name={`fees.${index}.from`}
                  control={control}
                  label="ငွေသွင်း/ထုတ်ပမာဏ"
                  placeholder="ငွေသွင်း/ထုတ်ပမာဏထည့်ပါ"
                  startIcon={
                    <span className="rt-font-noto rt-text-14px rt-text-[#929292]">
                      မှ
                    </span>
                  }
                  endIcon={
                    <span className="rt-font-inter rt-text-14px rt-text-[#929292]">
                      Ks
                    </span>
                  }
                  floatingLabel={false}
                  error={errors?.fees?.[index]?.from?.message}
                  isCurrency
                />
                <FormInput
                  name={`fees.${index}.fee`}
                  control={control}
                  label="လွှဲခ/အမြတ်"
                  placeholder="လွှဲခ/အမြတ်ထည့်ပါ"
                  endIcon={
                    <span className="rt-font-inter rt-text-14px rt-text-[#929292]">
                      Ks
                    </span>
                  }
                  floatingLabel={false}
                  isCurrency
                  error={errors?.fees?.[index]?.fee?.message}
                />
                {index > 0 && (
                  <Button
                    variant="plain"
                    size="plain"
                    type="button"
                    className={cn(
                      "rt-self-center rt-rounded-full",
                      errors.fees?.[index]?.from
                        ? "rt-self-center"
                        : "rt-self-end rt-mb-[10px]",
                    )}
                    onClick={() => {
                      setCurrentSelectedFeeIndex(index);
                      setShowDeleteConfirmDialog(true);
                    }}
                  >
                    <CircleXIcon className="rt-rounded-full" />
                  </Button>
                )}
              </div>
              <div className="rt-grid rt-grid-cols-[188fr_132fr_30fr] rt-gap-[10px] rt-w-full rt-mt-4">
                <FormInput
                  name={`fees.${index}.to`}
                  control={control}
                  startIcon={
                    <span className="rt-font-noto rt-text-14px rt-text-[#929292]">
                      သို့
                    </span>
                  }
                  endIcon={
                    <span className="rt-font-inter rt-text-14px rt-text-[#929292]">
                      Ks
                    </span>
                  }
                  trigger={trigger}
                  revalidateInputName={`fees.${index}.from`}
                  floatingLabel={false}
                  error={errors?.fees?.[index]?.to?.message}
                  isCurrency
                />
              </div>
            </div>
          ))}
        </div>
        <div className="rt-flex rt-items-center rt-justify-center rt-gap-3 rt-w-full rt-h-[94px] rt-shadow-[0px_-2px_15px_0px_rgba(0,0,0,0.1)] rt-sticky rt-bottom-0 rt-left-0 rt-bg-white rt-mt-auto rt-z-50">
          <Button
            type="submit"
            className="rt-text-white rt-w-11/12"
            disabled={!isDirty}
          >
            <span className="rt-font-noto rt-text-15px rt-mr-[7px] rt-font-medium">
              လွှဲခမှတ်မည်
            </span>
            <ArrowCircleRightIcon />
          </Button>
        </div>
      </form>

      <ConfirmDialog
        open={showDeleteConfirmDialog}
        onOpenChange={setShowDeleteConfirmDialog}
        icon={<WarningIcon />}
        title="လွှဲခဖျက်ရန် သေချာပါသလား။"
        subtitle="ယခုလွှဲခကို ဖျက်ရန် သေချာပါသလား။"
        primaryButtonText="သေချာပါသည်"
        secondaryButtonText="ပြန်စစ်ဆေးမည်"
        onPrimaryClick={handleDeleteConfirm}
        onSecondaryClick={handleCancel}
        showCloseButton
      />

      <ConfirmDialog
        open={showSaveConfirmDialog}
        onOpenChange={setShowSaveConfirmDialog}
        icon={<QuestionMarkIcon />}
        title="လွှဲခ မှတ်ရန် သေချာပါသလား။"
        subtitle="ယခုလွှဲခကို မှတ်ရန် သေချာပါသလား။"
        primaryButtonText="သေချာပါသည်"
        secondaryButtonText="ပြန်စစ်ဆေးမည်"
        primaryButtonDisabled={isLoading}
        onPrimaryClick={handleConfirmSubmit}
        onSecondaryClick={handleCancel}
        showCloseButton
      />

      <ConfirmDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        icon={<CheckCircleIcon />}
        title="လွှဲခအသစ် မှတ်ပြီးပါပြီ။"
        primaryButtonText="ပင်မစာမျက်မှာသို့သွားမည်"
        onPrimaryClick={() => router.push("/retail")}
      />
    </div>
  );
}
