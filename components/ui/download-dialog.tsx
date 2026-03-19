import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/common/utils";
import DownloadIcon from "@/components/icons/download.svg";
import PdfIcon from "@/components/icons/pdf.svg";
import ExcelIcon from "@/components/icons/excel.svg";
import { useForm, useWatch } from "react-hook-form";
import { FormDatePicker } from "../form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadDialogSchema } from "@/common/validators";

export interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: (params: {
    fileType: "pdf" | "excel";
    fromDate: string;
    toDate: string;
  }) => void;
  isDownloading: boolean;
  container?: HTMLElement | null;
}

export function DownloadDialog({
  open,
  onOpenChange,
  onDownload,
  isDownloading,
  container,
}: DownloadDialogProps) {
  const [selectedFileType, setSelectedFileType] = React.useState<
    "pdf" | "excel"
  >("pdf");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DownloadDialogSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
    },
    mode: "onChange",
  });

  const fromDate = useWatch({ control, name: "startDate" });
  const toDate = useWatch({ control, name: "endDate" });
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogPortal container={container}>
        <DialogOverlay />

        <DialogPrimitive.Content className="rt-absolute rt-left-0 rt-bottom-0 rt-z-50 rt-flex rt-items-center rt-justify-center rt-w-full rt-rounded-b-none">
          <form
            onSubmit={handleSubmit(() =>
              onDownload({
                fileType: selectedFileType,
                fromDate,
                toDate,
              }),
            )}
            className="rt-w-full rt-rounded-b-none rt-rounded-t-[20px] rt-border rt-bg-white rt-p-5 rt-shadow-lg rt-flex rt-flex-col rt-items-center rt-text-center"
          >
            {/* Close button */}
            <DialogPrimitive.Close className="rt-absolute rt-right-4 rt-top-4 rt-text-[#1E77ED] rt-border-[2px] rt-border-[#1E77ED] rt-rounded-full rt-p-[2px] focus-visible:rt-outline-none focus-visible:rt-border-[#1E77ED]">
              <X className="rt-h-4 rt-w-4 rt-font-bold" />
            </DialogPrimitive.Close>

            <DialogHeader className="rt-space-y-3 rt-border-b rt-w-full rt-pb-2">
              <h1 className="rt-text-base! rt-font-semibold">
                စာရင်းဒေါင်းလုပ်ဆွဲမည်
              </h1>
            </DialogHeader>

            <div className="rt-w-full rt-text-left rt-mt-4">
              <div>
                <p className="rt-mt-3 rt-text-md rt-font-pyi rt-mb-2">
                  အချိန်ကာလရွေးချယ်ပါ
                </p>
                <div className="rt-grid rt-grid-cols-[1fr_auto_1fr] rt-items-center">
                  <FormDatePicker
                    name="startDate"
                    control={control}
                    placeholder="ရက်စွဲ"
                    endIcon={<CalendarIcon className="rt-h-4 rt-w-4 rt-mb-1" />}
                    floatingLabel={false}
                    error={errors.startDate?.message}
                    className="rt-text-[#1e77ed] hover:rt-text-[#1e77ed]"
                    btnClassName="hover:rt-text-[#1e77ed]"
                    showError={false}
                    disabledDays={{ after: today }}
                  />
                  <span className="rt-px-6 rt-text-[#929292] rt-font-noto">
                    မှ
                  </span>
                  <FormDatePicker
                    name="endDate"
                    control={control}
                    placeholder="ရက်စွဲ"
                    endIcon={<CalendarIcon className="rt-h-4 rt-w-4 rt-mb-1" />}
                    floatingLabel={false}
                    error={errors.endDate?.message}
                    className="rt-text-[#1e77ed] hover:rt-text-[#1e77ed]"
                    btnClassName="hover:rt-text-[#1e77ed]"
                    showError={false}
                    disabledDays={{ after: today }}
                  />
                </div>
              </div>
              <div className="rt-mt-6">
                <p className="rt-mt-3 rt-text-md rt-font-pyi rt-mb-2">
                  ဖိုင်အမျိုးအစားရွေးချယ်ပါ
                </p>
                <div className="rt-flex rt-items-center rt-gap-3">
                  <Button
                    variant="outline"
                    className={cn(
                      "rt-px-4 rt-bg-[#F7F7F7] [&_svg]:rt-w-5 [&_svg]:rt-h-5 rt-py-0 hover:rt-bg-transparent",
                      selectedFileType === "pdf" && "rt-border-[#1e77ed]",
                    )}
                    onClick={() => setSelectedFileType("pdf")}
                    type="button"
                  >
                    <PdfIcon />
                    <span className="rt-font-pyi rt-text-md rt-font-normal rt-mt-[5px] rt-text-gray-900">
                      PDF
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className={cn(
                      "rt-px-3 rt-bg-[#F7F7F7] [&_svg]:rt-w-5 [&_svg]:rt-h-5 rt-py-0 hover:rt-bg-transparent",
                      selectedFileType === "excel" && "rt-border-[#1e77ed]",
                    )}
                    onClick={() => setSelectedFileType("excel")}
                    type="button"
                  >
                    <ExcelIcon className="bg-white" />
                    <span className="rt-font-pyi rt-text-md rt-font-normal rt-mt-[5px] rt-text-gray-900">
                      Excel
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <Button
              className="rt-w-full rt-mt-4 rt-gap-2 rt-text-white"
              disabled={isDownloading}
            >
              {isDownloading ? "ဒေါင်းလုပ်ဆွဲနေပါသည်..." : "ဒေါင်းလုပ်ဆွဲမည်"}
              <DownloadIcon />
            </Button>
          </form>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
