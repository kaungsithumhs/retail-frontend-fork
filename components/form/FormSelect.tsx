"use client";

import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import If from "../If";

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  options: FormSelectOption[];
  required?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
}

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled = false,
  className,
  error,
  options,
  required = false,
  helperText,
  onChange,
}: FormSelectProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field, fieldState }) => {
        const errorMessage = error || fieldState.error?.message;
        return (
          <div className={cn("rt-w-full", className)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(
                  errorMessage && "rt-text-[#dd5144]",
                  "rt-font-noto rt-text-sm rt-text-[#4C4C4C] rt-font-medium",
                )}
              >
                {label}
              </Label>
            )}

            <div className="rt-relative rt-flex rt-items-center rt-gap-2">
              <Select
                value={field.value ?? ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  if (onChange) {
                    onChange(value);
                  }
                }}
                disabled={disabled}
              >
                <SelectTrigger
                  className={cn(
                    "rt-w-full rt-rounded-[10px] rt-border rt-border-[#eeeeee] rt-bg-white rt-px-4 rt-py-[12px] rt-text-[13px] rt-text-[#929292] rt-shadow-sm rt-h-[46px]",
                    errorMessage && "rt-border-[#dd5144] rt-focus:ring-1",
                    field.value && "rt-text-black",
                  )}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder={placeholder} />
                  <If
                    isTrue={!!helperText && !field.value && !errorMessage}
                    ifBlock={
                      <span className="rt-ml-auto rt-mr-1 rt-text-[11px] rt-text-[#929292] rt-whitespace-nowrap">
                        {helperText}
                      </span>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="rt-text-[11px] rt-text-[#dd5144] rt-mt-1">
                {errorMessage}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
