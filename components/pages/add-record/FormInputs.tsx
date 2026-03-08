import React from "react";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { FormInput, FormDatePicker, FormSelect } from "@/components/form";
import CalendarIcon from "@/components/icons/calendar.svg";
import PhoneIcon from "@/components/icons/phone.svg";
import { CreateRecordInput } from "@/common/types";
import { removeNumberComma } from "@/common/utils";
import { Branch } from "@/common/types";

export interface FormInputsProps {
  control: Control<CreateRecordInput>;
  trigger: ReturnType<typeof useForm<CreateRecordInput>>["trigger"];
  setValue: (name: keyof CreateRecordInput, value: any) => void;
  errors: FieldErrors<CreateRecordInput>;
  branches: Branch[];
  currentAmount: number;
  setCurrentAmount: (amount: number) => void;
}

export function FormInputs({
  control,
  trigger,
  setValue,
  errors,
  branches,
  currentAmount,
  setCurrentAmount,
}: FormInputsProps) {
  return (
    <div className="rt-px-5 rt-flex rt-flex-col rt-gap-7">
      <FormInput
        name="phoneNo"
        control={control}
        label="ဖုန်းနံပါတ်"
        placeholder="ဖုန်းနံပါတ်ထည့်ပါ"
        type="number"
        isPhoneNumber
        limit={false}
        startIcon={
          <PhoneIcon className="rt-w-[19px] rt-h-[19px] rt-text-[#929292]" />
        }
        floatingLabel={true}
        error={errors.phoneNo?.message}
      />

      <FormSelect
        name="branchId"
        control={control}
        placeholder="ဆိုင်ခန်းရွေးရန်"
        helperText="(မရှိပါက ရွေးရန်မလို)"
        options={branches.map((branch) => ({
          value: branch.Id,
          label: branch.Name,
        }))}
        required={true}
        disabled={branches.length === 0}
        error={errors.branchId?.message}
      />

      <FormDatePicker
        name="date"
        control={control}
        label="ရက်စွဲ"
        placeholder="ရက်စွဲထည့်ပါ"
        startIcon={<CalendarIcon className="rt-h-4 rt-w-4" />}
        disabledDays={{
          after: new Date(),
        }}
        floatingLabel={true}
        error={errors.date?.message}
      />

      <div className="rt-grid rt-grid-cols-2 rt-gap-4">
        <FormInput
          name="amount"
          control={control}
          trigger={trigger}
          label="ငွေသွင်း/ထုတ်ပမာဏ"
          placeholder="ငွေသွင်း/ထုတ်ပမာဏထည့်ပါ"
          endIcon={
            <span className="rt-font-inter rt-text-sm rt-text-[#929292]">
              Ks
            </span>
          }
          floatingLabel={false}
          type="number"
          isCurrency
          error={errors.amount?.message}
          onChange={(value) => {
            !isNaN(Number(removeNumberComma(value))) &&
              setCurrentAmount(Number(removeNumberComma(value)));
          }}
        />
        <FormInput
          name="fee"
          control={control}
          label="လွှဲခ/အမြတ်"
          placeholder="လွှဲခ/အမြတ်ထည့်ပါ"
          endIcon={
            <span className="rt-font-inter rt-text-sm rt-text-[#929292]">
              Ks
            </span>
          }
          floatingLabel={false}
          type="number"
          isCurrency
          error={errors.fee?.message}
        />
      </div>
    </div>
  );
}
