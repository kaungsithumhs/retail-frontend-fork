/**
 * FormDatePicker Component
 * Reusable date picker wrapper with RHF integration, optional floating labels, and validation
 */

import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatCalendarDate } from "@/common/utils";

export interface FormDatePickerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  btnClassName?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  floatingLabel?: boolean;
  error?: string;
  showError?: boolean;
  dateFormat?: string;
  showClearButton?: boolean;
  showOkButton?: boolean;
  showCancelButton?: boolean;
  onClear?: () => void;
  disabledDays?: any;
  defaultMonth?: Date;
}

export function FormDatePicker<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Pick a date",
  disabled = false,
  className,
  btnClassName,
  startIcon,
  endIcon,
  floatingLabel = true,
  error,
  showError = true,
  dateFormat = "yyyy-MM-dd",
  showClearButton = false,
  showOkButton = false,
  showCancelButton = false,
  onClear,
  disabledDays,
  defaultMonth,
}: FormDatePickerProps<TFieldValues>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date | undefined>(undefined);

  const [month, setMonth] = React.useState<Date | undefined>(undefined);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const errorMessage = error || fieldState.error?.message;
        const dateValue = field.value ? new Date(field.value) : undefined;
        const isFloating = floatingLabel && (isOpen || !!field.value);

        const handleOpenChange = (open: boolean) => {
          if (open) {
            setTempDate(dateValue);
            if (defaultMonth) {
              setMonth(defaultMonth);
            }
          }
          setIsOpen(open);
          if (!open) {
            setTempDate(undefined);
          }
        };

        const handleDateSelect = (date: Date | undefined) => {
          if (!date) return;

          if (showOkButton || showCancelButton) {
            // If action buttons are shown, just update temp date
            setTempDate(date);
          } else {
            // If no action buttons, apply change immediately
            handleDateChange(date);
          }
        };

        const handleDateChange = (date: Date | undefined) => {
          const formattedDate = date ? formatCalendarDate(date) : "";
          field.onChange(formattedDate);
          setIsOpen(false);
        };

        const handleOk = () => {
          handleDateChange(tempDate);
        };

        const handleCancel = () => {
          setTempDate(undefined);
          setIsOpen(false);
        };

        const handleClear = () => {
          field.onChange("");
          setTempDate(undefined);
          setIsOpen(false);
          onClear?.();
        };

        if (floatingLabel) {
          return (
            <div className={cn("rt-w-full", className)}>
              <div className="rt-relative">
                <Popover open={isOpen} onOpenChange={handleOpenChange}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={disabled}
                      className={cn(
                        "rt-w-full rt-justify-start rt-text-left rt-font-normal rt-px-3 rt-py-[10px] rt-h-auto rt-rounded-[10px] rt-border-[#eeeeee] rt-bg-white hover:rt-bg-white hover:rt-text-black",
                        !dateValue && "rt-text-[#ababab]",
                        errorMessage && "rt-border-[#dd5144]",
                        startIcon ? "rt-pl-10" : "rt-pl-3",
                        endIcon ? "rt-pr-10" : "rt-pr-3",
                        btnClassName,
                      )}
                    >
                      {startIcon && (
                        <div className="rt-absolute rt-left-3 rt-top-1/2 -rt-translate-y-1/2 rt-text-[#929292]">
                          {startIcon}
                        </div>
                      )}
                      {dateValue ? (
                        formatCalendarDate(dateValue)
                      ) : (
                        <span className="rt-text-transparent">
                          {placeholder}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="rt-w-auto rt-p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      navLayout="after"
                      selected={tempDate || dateValue}
                      onSelect={handleDateSelect}
                      onMonthChange={setMonth}
                      month={month}
                      autoFocus
                      disabled={disabledDays}
                    />
                    {(showClearButton || showOkButton || showCancelButton) && (
                      <div className="rt-flex rt-justify-end rt-gap-2 rt-p-3 rt-mb-1">
                        {showClearButton && (
                          <Button
                            type="button"
                            variant="plain"
                            size="plain"
                            onClick={handleClear}
                            className="rt-text-[#1e77ed] rt-text-[15px] hover:rt-text-[#1e77ed] rt-font-inter rt-px-2"
                          >
                            Clear
                          </Button>
                        )}
                        {showOkButton && (
                          <Button
                            type="button"
                            variant="plain"
                            size="plain"
                            onClick={handleOk}
                            className="rt-text-[#1e77ed] rt-text-[15px] hover:rt-text-[#1e77ed] rt-font-inter rt-px-2"
                          >
                            OK
                          </Button>
                        )}
                        {showCancelButton && (
                          <Button
                            type="button"
                            variant="plain"
                            size="plain"
                            onClick={handleCancel}
                            className="rt-text-[#1e77ed] rt-text-[15px] hover:rt-text-[#1e77ed] rt-font-inter rt-px-2"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>

                {/* Floating Label */}
                {label && (
                  <label
                    className={cn(
                      "rt-absolute rt-left-3 rt-top-1/2 -rt-translate-y-1/2",
                      "rt-pointer-events-none rt-font-pyi rt-text-sm rt-text-[#929292]",
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
              </div>

              {/* Error Message */}
              {showError && errorMessage && (
                <p className="rt-text-[11px] rt-text-[#dd5144] rt-mt-1">
                  {errorMessage}
                </p>
              )}
            </div>
          );
        }

        // Normal label above input
        return (
          <div className={cn("rt-w-full rt-space-y-2", className)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(errorMessage && "rt-text-[#dd5144]")}
              >
                {label}
              </Label>
            )}

            <Popover open={isOpen} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  id={name}
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    "rt-w-full rt-justify-start rt-text-left rt-font-noto rt-font-normal rt-bg-white hover:rt-bg-white focus:rt-bg-white rt-relative",
                    !dateValue && "rt-text-[#ababab]",
                    errorMessage && "rt-border-[#dd5144]",
                    startIcon ? "rt-pl-10" : "rt-pl-3",
                    endIcon ? "rt-pr-10" : "rt-pr-3",
                    btnClassName,
                  )}
                >
                  {startIcon && (
                    <div className="rt-absolute rt-left-3 rt-top-1/2 -rt-translate-y-1/2 rt-text-[#929292]">
                      {startIcon}
                    </div>
                  )}
                  {endIcon && (
                    <div className="rt-absolute rt-right-3 rt-top-1/2 -rt-translate-y-1/2 rt-text-[#929292]">
                      {endIcon}
                    </div>
                  )}
                  {dateValue ? (
                    formatCalendarDate(dateValue)
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="rt-w-auto rt-p-0" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  navLayout="after"
                  selected={tempDate || dateValue}
                  onSelect={handleDateSelect}
                  onMonthChange={setMonth}
                  month={month}
                  autoFocus
                  disabled={disabledDays}
                />
                {(showClearButton || showOkButton || showCancelButton) && (
                  <div className="rt-flex rt-justify-end rt-gap-2 rt-p-3 rt-mb-1">
                    {showClearButton && (
                      <Button
                        type="button"
                        variant="plain"
                        size="plain"
                        onClick={handleClear}
                        className="rt-text-[#1e77ed] rt-text-[15px] hover:rt-text-[#1e77ed] rt-font-inter rt-px-2"
                      >
                        Clear
                      </Button>
                    )}
                    {showOkButton && (
                      <Button
                        type="button"
                        variant="plain"
                        size="plain"
                        onClick={handleOk}
                        className="rt-text-[#1e77ed] rt-text-[15px] hover:rt-text-[#1e77ed] rt-font-inter rt-px-2"
                      >
                        OK
                      </Button>
                    )}
                    {showCancelButton && (
                      <Button
                        type="button"
                        variant="plain"
                        size="plain"
                        onClick={handleCancel}
                        className="rt-text-[#1e77ed] rt-text-[15px] hover:rt-text-[#1e77ed] rt-font-inter rt-px-2"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                )}
              </PopoverContent>
            </Popover>

            {/* Error Message */}
            {showError && errorMessage && (
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
