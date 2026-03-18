import Link from "next/link";
import LeftArrowIcon from "@/components/icons/left-arrow.svg";
import CrossIcon from "@/components/icons/cross.svg";
import If from "./If";
import { Button } from "./ui/button";
import { cn } from "@/common/utils";
import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ConfirmDialog } from "./ui/confirm-dialog";
import QuestionMarkIcon from "@/components/icons/question-mark.svg";
import DownloadIcon from "@/components/icons/download.svg";
import { useRouter } from "next/router";

interface Props {
  navLabel: string;
  boldLabel?: boolean;
  navLink: string;
  enableDownload?: boolean;
  onDownload?: () => void;
  enableInstructionModal?: boolean;
  longHeader?: boolean;
  confirmNavigate?: boolean;
}

const Header = ({
  navLabel,
  boldLabel = false,
  navLink,
  enableDownload = false,
  onDownload,
  enableInstructionModal = false,
  longHeader = false,
  confirmNavigate = false,
}: Props) => {
  const router = useRouter();
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [showConfirmNavigateDialog, setShowConfirmNavigateDialog] =
    useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (confirmNavigate) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [confirmNavigate]);

  return (
    <header
      className={cn(
        "rt-bg-[#1e77ed] rt-text-white rt-border-b rt-px-[19px] rt-pt-4 rt-pb-4 rt-relative",
        boldLabel ? "rt-font-bold rt-font-pyi" : "rt-font-medium rt-font-noto",
        longHeader ? "rt-h-[185px]" : "rt-h-[65px]",
      )}
    >
      <div className="rt-flex rt-justify-between rt-items-center">
        <Link
          href={navLink}
          className="rt-flex rt-items-center"
          onClick={(e) => {
            if (confirmNavigate) {
              e.preventDefault();
              setShowConfirmNavigateDialog(true);
            } else {
              router.push(navLink);
            }
          }}
        >
          <LeftArrowIcon className="rt-w-9 rt-h-9" />
          <p className="rt-text-lg">{navLabel}</p>
        </Link>
        <If
          isTrue={enableDownload}
          ifBlock={
            <Button
              variant="plain"
              size="plain"
              className="rt-flex rt-items-center rt-gap-[5px] "
              onClick={onDownload}
            >
              <DownloadIcon />
              <span className="rt-font-bold rt-text-xs rt-mt-[6px]">
                ဒေါင်းလုပ်ဆွဲမည်
              </span>
            </Button>
          }
        />
        <If
          isTrue={enableInstructionModal}
          ifBlock={
            <Button
              variant="plain"
              size="plain"
              className="rt-flex rt-items-center rt-gap-[5px] [&_svg]:rt-w-4 [&_svg]:rt-h-4"
              onClick={() => setShowInstructionModal((state) => !state)}
            >
              <Info />
              <span className="rt-font-bold rt-text-xs">လွှဲခထည့်နည်း</span>
            </Button>
          }
        />
      </div>
      <If
        isTrue={showInstructionModal}
        ifBlock={
          <Card className="rt-absolute rt-left-1/2 -rt-bottom-[218px] -rt-translate-x-1/2 -rt-translate-y-1/2 rt-w-11/12 rt-bg-[#1e77ed] rt-text-white rt-rounded-[5px] rt-shadow-none rt-border-0 rt-z-10 rt-p-0 rt-font-noto">
            <CardHeader className="rt-px-[15px] rt-py-[10px] rt-flex rt-flex-row rt-items-center rt-justify-between">
              <CardTitle className="rt-text-base rt-font-bold rt-flex rt-items-center rt-gap-[10px]">
                <Info className="rt-w-5 rt-h-5" />
                <span className="rt-font-bold rt-text-sm rt-mt-[6px] rt-mb-1">
                  လွှဲခထည့်နည်း
                </span>
              </CardTitle>
              <Button
                variant="plain"
                size="plain"
                onClick={() => setShowInstructionModal(false)}
                className="!rt-m-0"
              >
                <CrossIcon className="rt-text-white" />
              </Button>
            </CardHeader>
            <CardContent className="rt-px-[15px] rt-pb-[15px] rt-mt-[1px]">
              <p className="rt-text-sm rt-font-normal">
                ၁၀၀၀ မှ ၁၀၀၀၀ အတွင်းကို လွှဲခ ၅၀၀ ကောက်လိုပါက ၁၀၀၀ ကို “မှ”
                တွင်ထည့်၍ ၁၀၀၀၀ ကို “သို့” တွင်ထည့်ပါ။ ၅၀၀ ကို “လွှဲခ”
                တွင်ထည့်ပါ။
              </p>
            </CardContent>
          </Card>
        }
      />

      <ConfirmDialog
        open={showConfirmNavigateDialog}
        onOpenChange={setShowConfirmNavigateDialog}
        icon={<QuestionMarkIcon />}
        title="ပင်မစာမျက်နှာသို့သွားမည်။"
        subtitle="လက်ရှိပြင်ဆင်ထားသော အချက်အလက်များ ပျောက်ဆုံးနိုင်ပါသည်။"
        primaryButtonText="သေချာပါသည်"
        secondaryButtonText="ပြန်စစ်ဆေးမည်"
        onPrimaryClick={() => {
          router.push(navLink);
        }}
        onSecondaryClick={() => setShowConfirmNavigateDialog(false)}
        showCloseButton
      />
    </header>
  );
};

export default Header;
