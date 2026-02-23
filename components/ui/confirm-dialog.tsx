import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/common/utils";
import IfElse from "../IfElse";
import If from "../If";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  secondaryButtonHref?: string;
  showCloseButton?: boolean;
  primaryButtonDisabled?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  icon,
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  secondaryButtonHref,
  showCloseButton = false,
  primaryButtonDisabled = false,
}: ConfirmDialogProps) {
  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="rt-fixed rt-left-[50%] rt-top-[50%] rt-z-50 rt-w-full rt-max-w-[335px] rt-translate-x-[-50%] rt-translate-y-[-50%] rt-gap-3 rt-border rt-bg-[#f5f5f5] rt-p-6 rt-shadow-lg rt-duration-200 data-[state=open]:rt-animate-in data-[state=closed]:rt-animate-out data-[state=closed]:rt-fade-out-0 data-[state=open]:rt-fade-in-0 data-[state=closed]:rt-zoom-out-95 data-[state=open]:rt-zoom-in-95 data-[state=closed]:rt-slide-out-to-left-1/2 data-[state=closed]:rt-slide-out-to-top-[48%] data-[state=open]:rt-slide-in-from-left-1/2 data-[state=open]:rt-slide-in-from-top-[48%] rt-rounded-[20px] rt-flex rt-flex-col rt-items-center rt-justify-center rt-text-center rt-font-noto"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          {showCloseButton && (
            <DialogPrimitive.Close className="rt-absolute rt-right-4 rt-top-4 rt-rounded-sm rt-opacity-70 rt-transition-opacity hover:rt-opacity-100 focus:rt-outline-none focus:rt-ring-0 disabled:rt-pointer-events-none rt-z-10 focus-visible:rt-outline-none focus-visible:rt-border-0 focus-visible:rt-ring-0">
              <X className="rt-h-4 rt-w-4" />
              <span className="rt-sr-only">Close</span>
            </DialogPrimitive.Close>
          )}

          <DialogHeader
            className={cn(
              "rt-flex rt-flex-col rt-items-center rt-space-y-3 rt-text-center rt-w-full",
              showCloseButton && "rt-mt-3",
              !subtitle ? "rt-mb-3" : "rt-mb-2",
            )}
          >
            {icon && (
              <div
                className={cn(
                  "rt-flex rt-justify-center",
                  subtitle ? "rt-mb-3" : "rt-mb-5",
                )}
              >
                {icon}
              </div>
            )}
            <DialogTitle className="rt-text-center rt-text-16px rt-font-semibold">
              {title}
            </DialogTitle>
            {subtitle && (
              <DialogDescription className="rt-text-12px rt-text-center rt-text-[#929292]">
                {subtitle}
              </DialogDescription>
            )}
          </DialogHeader>

          <DialogFooter className="rt-flex rt-flex-col sm:rt-flex-col rt-gap-2 rt-w-full rt-items-center rt-justify-center rt-mt-1 rt-font-noto">
            <Button
              onClick={onPrimaryClick}
              disabled={primaryButtonDisabled}
              className="rt-w-full rt-text-white"
            >
              <span className="rt-text-16px rt-w-full rt-font-medium">
                {primaryButtonText}
              </span>
            </Button>

            <If
              isTrue={!!secondaryButtonText}
              ifBlock={
                <IfElse
                  isTrue={!!secondaryButtonHref}
                  ifBlock={
                    <Button
                      asChild
                      variant="plain"
                      size="plain"
                      className="rt-w-full rt-py-[11px] rt-px-[77px] rt-text-15px hover:rt-text-gray-700"
                    >
                      <Link href={secondaryButtonHref!}>
                        {secondaryButtonText}
                      </Link>
                    </Button>
                  }
                  elseBlock={
                    <Button
                      onClick={handleSecondaryClick}
                      variant="plain"
                      className="rt-w-full rt-m-0 rt-font-normal hover:rt-text-gray-700"
                    >
                      {secondaryButtonText}
                    </Button>
                  }
                />
              }
            />
          </DialogFooter>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
