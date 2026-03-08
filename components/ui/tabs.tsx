import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "rt-inline-flex rt-h-9 rt-items-center rt-justify-center rt-rounded-lg rt-p-1 rt-text-[#ababab]",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "rt-inline-flex rt-items-center rt-justify-center rt-text-[#929292] rt-whitespace-nowrap rt-rounded-md rt-px-3 rt-py-2 rt-text-sm rt-font-medium rt-ring-offset-[#f5f5f5] rt-transition-all focus-visible:rt-outline-none focus-visible:rt-ring-2 focus-visible:rt-ring-[#7d7d7d] focus-visible:rt-ring-offset-2 disabled:rt-pointer-events-none disabled:rt-opacity-50 data-[state=active]:rt-bg-white data-[state=active]:rt-text-[#4C4C4C]",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "rt-mt-2 rt-ring-offset-[#f5f5f5] focus-visible:rt-outline-none focus-visible:rt-ring-2 focus-visible:rt-ring-[#7d7d7d] focus-visible:rt-ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
