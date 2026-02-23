"use client";

import * as React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useForm,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber, removeNumberComma } from "@/common/utils";

export interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  trigger?: ReturnType<typeof useForm<TFieldValues>>["trigger"];
  revalidateInputName?: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: string;
  limit?: boolean;
  isPhoneNumber?: boolean;
  disabled?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  floatingLabel?: boolean;
  isCurrency?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

export function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  trigger,
  revalidateInputName,
  label,
  placeholder,
  type = "text",
  isPhoneNumber = false,
  limit = true,
  disabled = false,
  className,
  startIcon,
  endIcon,
  floatingLabel = true,
  isCurrency = false,
  error,
  onChange,
}: FormInputProps<TFieldValues>) {
  const MAX_NUMBER_VALUE = 100000000;
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = error || fieldState.error?.message;
        const isFloating =
          floatingLabel && (isFocused || hasValue || field.value);

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(true);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
          field.onBlur();
        };

        const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const isNumberType = type === "number";
          const rawValue = isNumberType
            ? e.target.value.replace(/[^0-9]/g, "")
            : e.target.value;

          if (
            isNumberType &&
            rawValue !== "" &&
            limit &&
            Number(rawValue) > MAX_NUMBER_VALUE
          ) {
            return;
          }

          if (isCurrency && !isNaN(Number(removeNumberComma(rawValue)))) {
            const formatted = formatNumber(Number(removeNumberComma(rawValue)));
            setHasValue(!!formatted);
            field.onChange(formatted);
          } else {
            setHasValue(!!rawValue);
            field.onChange(rawValue);
          }

          if (onChange) {
            onChange(rawValue);
          }

          if (trigger && revalidateInputName) {
            await trigger(revalidateInputName);
          }
        };

        // Floating label implementation
        if (floatingLabel) {
          return (
            <div className={cn("rt-w-full", className)}>
              <div className="rt-relative">
                {startIcon && (
                  <div className="rt-absolute rt-left-4 rt-top-1/2 -rt-translate-y-1/2 rt-text-[#929292] rt-pointer-events-none rt-z-10">
                    {startIcon}
                  </div>
                )}

                <input
                  {...field}
                  value={field.value ?? ""}
                  type="text"
                  inputMode={type === "number" ? "numeric" : undefined}
                  //   pattern={type === "number" ? "[0-9]*" : undefined}
                  disabled={disabled}
                  placeholder={placeholder}
                  className={cn(
                    "rt-hide-number-stepper rt-peer rt-w-full rt-rounded-[10px] rt-border rt-border-[#eeeeee] rt-bg-transparent rt-px-4 rt-py-[10px] rt-text-base rt-shadow-sm rt-transition-all rt-no-autofill-bg",
                    "placeholder:rt-text-transparent rt-overflow-hidden rt-whitespace-nowrap rt-leading-none rt-h-[46px]",
                    "focus-visible:rt-outline-none focus-visible:rt-ring-1 focus-visible:rt-ring-[#7d7d7d]",
                    "disabled:rt-cursor-not-allowed disabled:rt-opacity-50",
                    errorMessage &&
                      "rt-border-[#dd5144] focus-visible:rt-ring-[#dd5144]",
                    startIcon && "rt-pl-11",
                    endIcon && "rt-pr-10",
                  )}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {label && (
                  <label
                    className={cn(
                      "rt-absolute rt-left-3 rt-top-1/2 -rt-translate-y-1/2",
                      "rt-pointer-events-none rt-font-pyi rt-text-14px rt-text-[#929292]",
                      "rt-transition-all rt-duration-200 rt-ease-linear",
                      "rt-bg-white rt-px-1",
                      isFloating && "rt-top-0 rt-text-xs",
                      errorMessage && isFloating && "rt-text-[#dd5144]",
                      startIcon && !isFloating && "rt-left-10",
                      startIcon && isFloating && "rt-left-5",
                    )}
                  >
                    {label}
                  </label>
                )}

                {endIcon && (
                  <div className="rt-absolute rt-right-3 rt-top-1/2 -rt-translate-y-1/2 rt-text-[#929292] rt-pointer-events-none rt-z-10">
                    {endIcon}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="rt-text-11px rt-text-[#dd5144] rt-mt-1">
                  {errorMessage}
                </p>
              )}
            </div>
          );
        }

        // Normal label above input
        return (
          <div className={cn("rt-w-full", className)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(
                  errorMessage && "rt-text-[#dd5144]",
                  "rt-font-noto rt-text-13px rt-text-[#4C4C4C] rt-font-medium",
                )}
              >
                {label}
              </Label>
            )}

            <div className="rt-relative rt-mt-2">
              {startIcon && (
                <div className="rt-absolute rt-left-3 rt-top-1/2 -rt-translate-y-1/2 rt-text-[#929292] rt-pointer-events-none rt-z-10">
                  {startIcon}
                </div>
              )}

              <Input
                {...field}
                value={field.value ?? ""}
                id={name}
                type="text"
                inputMode={type === "number" ? "numeric" : undefined}
                // pattern={type === "number" ? "[0-9]*" : undefined}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete="one-time-code"
                className={cn(
                  "rt-hide-number-stepper rt-peer rt-w-full rt-rounded-[10px] rt-border rt-border-[#eeeeee] rt-bg-white rt-px-4 rt-py-[12px] rt-text-base rt-shadow-sm rt-transition-all rt-h-[46px] focus:rt-ring-0",
                  "placeholder:rt-text-[#929292]",
                  "focus-visible:rt-outline-none focus-visible:rt-ring-1 focus-visible:rt-ring-[#7d7d7d]",
                  "disabled:rt-cursor-not-allowed disabled:rt-opacity-50",
                  errorMessage &&
                    "rt-border-[#dd5144] focus-visible:rt-ring-[#dd5144]",
                  startIcon && "rt-pl-10",
                  endIcon && "rt-pr-10",
                )}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              {endIcon && (
                <div className="rt-absolute rt-right-3 rt-top-1/2 -rt-translate-y-1/2 rt-text-[#929292] rt-pointer-events-none rt-z-10">
                  {endIcon}
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="rt-text-11px rt-text-[#dd5144] rt-mt-1">
                {errorMessage}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
