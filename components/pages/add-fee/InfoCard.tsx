import { Button } from "@/components/ui/button";
import PlusIcon from "@/components/icons/plus.svg";
import Image from "next/image";
import { UseFieldArrayAppend } from "react-hook-form";
import { Fee } from "@/common/types";

export interface InfoCardProps {
  append: UseFieldArrayAppend<{ fees: Fee[] }>;
}

export function InfoCard({ append }: InfoCardProps) {
  return (
    <div className="rt-px-5 rt-border-0 rt-shadow-none rt-flex rt-flex-col rt-items-center rt-justify-center rt-gap-6 rt-font-noto">
      <div>
        <Image
          src="/images/add-fee-logo.png"
          alt="Info"
          width={105}
          height={106.54}
        />
      </div>
      <p className="rt-text-lg rt-font-medium">
        ငွေလွှဲငွေထုတ်အတွက် လွှဲခထည့်ရန်
      </p>
      <Button
        variant="secondary"
        className="rt-bg-[#fff9e5] rt-py-3 rt-px-[25px] rt-rounded-full rt-text-sm rt-font-medium"
        onClick={() =>
          append({ id: `temp-id-${Date.now()}`, fee: "0", from: "0", to: "0" })
        }
      >
        <PlusIcon />
        လွှဲခထပ်ထည့်မည်
      </Button>
    </div>
  );
}
