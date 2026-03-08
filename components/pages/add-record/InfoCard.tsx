import { Card, CardContent } from "@/components/ui/card";
import InfoIcon from "@/components/icons/info.svg";

export function InfoCard() {
  return (
    <Card className="rt-px-5 rt-border-0 rt-shadow-none">
      <CardContent className="rt-px-[15px] rt-py-[10px] rt-rounded-[5px] rt-bg-[#DCEBFF] rt-text-[#1e77ed] rt-flex rt-gap-[19px]">
        <div className="rt-mt-[2px]">
          <InfoIcon className="rt-w-5 rt-h-5" />
        </div>
        <p className="rt-font-bold rt-text-sm rt-leading-8">
          မိမိကြိုက်နှစ်သက်ရာငွေလွှဲပုံစံဖြင့်မှတ်လိုပါက “အခြားအမျိုးအစား”
          ကိုနှိပ်ပါ။
        </p>
      </CardContent>
    </Card>
  );
}
