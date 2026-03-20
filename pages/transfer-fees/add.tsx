"use client";

import { useEffect, useState } from "react";
import { feeService } from "@/lib/api/fees";
import { Fee } from "@/common/types";
import { ROUTES } from "@/common/constants";
import Header from "@/components/Header";
import { FeeForm, InfoCard } from "@/components/pages/add-fee";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feeSchema } from "@/common/validators";
import { formatNumber } from "@/common/utils";

export default function AddFee() {
  const [fees, setFees] = useState<Fee[]>([]);

  useEffect(() => {
    feeService.getAll().then(({ transferFees }) => {
      setFees(transferFees);
    });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
    reset,
    trigger,
  } = useForm<{ fees: Fee[] }>({
    resolver: zodResolver(feeSchema),
    defaultValues: {
      fees: fees?.map((fee) => ({
        from: formatNumber(Number(fee.from)),
        to: formatNumber(Number(fee.to)),
        fee: formatNumber(Number(fee.fee)),
      })) || [{ from: "0", to: "0", fee: "0" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fees",
  });

  useEffect(() => {
    if (fees && fees.length > 0) {
      reset({
        fees: fees.map((fee) => ({
          from: formatNumber(Number(fee.from)),
          to: formatNumber(Number(fee.to)),
          fee: formatNumber(Number(fee.fee)),
        })),
      });
    }
  }, [fees, reset]);

  return (
    <div className="rt-h-screen rt-font-noto rt-flex rt-flex-col">
      <Header
        navLink={ROUTES.HOME}
        navLabel="လွှဲခထည့်မည်"
        enableInstructionModal
        confirmNavigate={isDirty}
      />
      <main className="rt-w-full rt-flex-1 rt-flex rt-flex-col rt-pt-[17px]">
        <InfoCard append={append} />
        <FeeForm
          fields={fields}
          remove={remove}
          initialFeeCount={fees.length}
          control={control}
          getValues={getValues}
          trigger={trigger}
          errors={errors}
          handleSubmit={handleSubmit}
          isDirty={isDirty}
          reset={reset}
        />
      </main>
    </div>
  );
}
