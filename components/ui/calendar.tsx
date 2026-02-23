// @ts-nocheck
import * as React from "react";
import { DayPicker, getDefaultClassNames, PropsSingle } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date | undefined>(
    props.selected instanceof Date
      ? props.selected
      : Array.isArray(props.selected)
        ? props.selected[0]
        : new Date(),
  );

  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      onMonthChange={setMonth}
      month={month}
      reverseYears
      disabledDays={{ after: new Date() }}
      className={cn("rt-p-3", className)}
      classNames={{
        selected: `${getDefaultClassNames().selected} rt-bg-[#DCEBFF]`,
        day: `${
          getDefaultClassNames().day
        } hover:rt-bg-[#cde0fb] rt-rounded-full`,
        day_button: `${
          getDefaultClassNames().day_button
        } rt-w-9 rt-h-9 rt-p-0 rt-font-medium`,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
