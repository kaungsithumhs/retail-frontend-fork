import React, { Dispatch, SetStateAction } from "react";

import { PAY_OPTIONS } from "@/common/constants/payment";
import { PayType, RecordItem, RecordReportQuery } from "@/common/types";
import If from "@/components/If";
import { Button } from "@/components/ui/button";
import CheckCircleSmIcon from "@/components/icons/check-circle-sm.svg";
import Image from "next/image";
import { FormDatePicker } from "@/components/form";
import { CalendarIcon } from "lucide-react";
import { Control, FieldErrors, useWatch } from "react-hook-form";
import { addMonths, subMonths } from "date-fns";

export interface RecordsFilterProps {
  control: Control<RecordReportQuery>;
  errors: FieldErrors<RecordReportQuery>;
  selectedPay: PayType | null;
  setSelectedPay: Dispatch<SetStateAction<PayType | null>>;
}

export function RecordsFilter({
  control,
  errors,
  selectedPay,
  setSelectedPay,
}: RecordsFilterProps) {
  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  // Dynamic windows
  const startMin = end ? subMonths(end, 3) : undefined;
  const startMax = end || undefined;

  const endMin = start || undefined;
  const endMax = start ? addMonths(start, 3) : undefined;

  return (
    <div className="rt-py-[15px] rt-px-5 rt-bg-white rt-flex rt-flex-col rt-gap-5">
      <div className="rt-grid rt-grid-cols-[1fr_auto_1fr] rt-items-center">
        <FormDatePicker
          name="startDate"
          control={control}
          placeholder="ရက်စွဲ"
          endIcon={<CalendarIcon className="rt-h-4 rt-w-4 rt-mb-1" />}
          floatingLabel={false}
          error={errors.startDate?.message}
          showError={false}
          showOkButton
          showCancelButton
          showClearButton
          className="rt-text-[#1e77ed] hover:rt-text-[#1e77ed]"
          btnClassName="hover:rt-text-[#1e77ed]"
          disabledDays={{
            ...(startMin && { before: startMin }),
            ...(startMax && { after: startMax }),
          }}
          defaultMonth={start || end || undefined}
        />
        <span className="rt-px-6 rt-text-[#929292] rt-font-noto">မှ</span>
        <FormDatePicker
          name="endDate"
          control={control}
          placeholder="ရက်စွဲ"
          endIcon={<CalendarIcon className="rt-h-4 rt-w-4 rt-mb-1" />}
          floatingLabel={false}
          error={errors.endDate?.message}
          showError={false}
          showOkButton
          showCancelButton
          showClearButton
          className="rt-text-[#1e77ed] hover:rt-text-[#1e77ed]"
          btnClassName="hover:rt-text-[#1e77ed]"
          disabledDays={{
            ...(endMin && { before: endMin }),
            ...(endMax && { after: endMax }),
          }}
          defaultMonth={end || start || undefined}
        />
      </div>
      <div>
        <div className="rt-flex rt-items-center rt-gap-[12px]">
          <Button
            type="button"
            variant="plain"
            size="plain"
            onClick={() => setSelectedPay(null)}
            className="rt-relative"
          >
            <span className="rt-px-[14px] rt-py-[9.5px] rt-text-center rt-bg-[#1e77ed] rt-text-white rt-rounded-[5px] rt-text-[11px]">
              All
            </span>
            <If
              isTrue={selectedPay === null}
              ifBlock={
                <CheckCircleSmIcon className="rt-w-[5px]! rt-h-[5px]! rt-absolute -rt-right-2 -rt-top-2" />
              }
            />
          </Button>
          {PAY_OPTIONS.map((pay) => (
            <Button
              type="button"
              variant="plain"
              size="plain"
              onClick={() => setSelectedPay(pay.value as PayType)}
              key={pay.value}
              className="rt-relative"
            >
              <Image
                src={pay.image}
                width={43.02}
                height={43.02}
                alt={pay.value}
                className="rt-rounded-[5px]"
              />
              <If
                isTrue={selectedPay === (pay.value as PayType)}
                ifBlock={
                  <CheckCircleSmIcon className="rt-w-[5px]! rt-h-[5px]! rt-absolute -rt-right-2 -rt-top-2" />
                }
              />
            </Button>
          ))}
          <Button
            type="button"
            variant="plain"
            size="plain"
            onClick={() => setSelectedPay("other")}
            className="rt-relative"
          >
            <span className="rt-px-[5.1px] rt-py-[10px] rt-text-center rt-bg-[#1e77ed] rt-text-white rt-rounded-[5px] rt-text-[11px]">
              အခြား
            </span>
            <If
              isTrue={selectedPay === "other"}
              ifBlock={
                <CheckCircleSmIcon className="rt-w-[5px]! rt-h-[5px]! rt-absolute -rt-right-2 -rt-top-2" />
              }
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
