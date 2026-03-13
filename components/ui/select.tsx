import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "rt-flex rt-h-10 rt-w-full rt-items-center rt-justify-between rt-rounded-md rt-border rt-border-[#eeeeee] rt-bg-[#f5f5f5] rt-px-3 rt-py-2 rt-text-sm rt-ring-offset-[#f5f5f5] placeholder:rt-text-[#ababab] focus:rt-outline-none focus:rt-ring-1 focus:rt-ring-[#7d7d7d] focus:rt-ring-offset-2 disabled:rt-cursor-not-allowed",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="rt-h-4 rt-w-4 rt-opacity-50 rt-text-[#1e77ed]" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "rt-flex rt-cursor-default rt-items-center rt-justify-center rt-py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="rt-h-4 rt-w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "rt-flex rt-cursor-default rt-items-center rt-justify-center rt-py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="rt-h-4 rt-w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "rt-relative rt-z-50 rt-max-h-96 rt-min-w-[8rem] rt-overflow-hidden rt-rounded-md rt-border rt-bg-[#ffffff] rt-text-[#09090b] rt-shadow-md data-[state=open]:rt-animate-in data-[state=closed]:rt-animate-out data-[state=closed]:rt-fade-out-0 data-[state=open]:rt-fade-in-0 data-[state=closed]:rt-zoom-out-95 data-[state=open]:rt-zoom-in-95 data-[side=bottom]:rt-slide-in-from-top-2 data-[side=left]:rt-slide-in-from-right-2 data-[side=right]:rt-slide-in-from-left-2 data-[side=top]:rt-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:rt-translate-y-1 data-[side=left]:-rt-translate-x-1 data-[side=right]:rt-translate-x-1 data-[side=top]:-rt-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "rt-p-1",
          position === "popper" &&
            "rt-h-[var(--radix-select-trigger-height)] rt-w-full rt-min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "rt-py-1.5 rt-pl-8 rt-pr-2 rt-text-sm rt-font-semibold",
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "rt-relative rt-flex rt-w-full rt-cursor-default rt-select-none rt-items-center rt-rounded-sm rt-py-1.5 rt-pl-8 rt-pr-2 rt-text-sm rt-outline-none focus:bg-[#f5f5f5] focus:text-black data-[disabled]:rt-pointer-events-none data-[disabled]:rt-opacity-50",
      className,
    )}
    {...props}
  >
    <span className="rt-absolute rt-left-2 rt-flex rt-h-3.5 rt-w-3.5 rt-items-center rt-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="rt-h-4 rt-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-rt-mx-1 rt-my-1 rt-h-px rt-bg-[#929292]", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
