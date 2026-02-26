import { PAYMENT_IMAGES } from "@/common/constants/payment";
import type { RecordItem, ReportRecordItem } from "@/common/types";
import { cn, formatNumber } from "@/common/utils";
import Image from "next/image";

export interface RecordProps {
  record: Partial<RecordItem>;
  className?: string;
}
export interface ReportRecordProps {
  record: ReportRecordItem;
  className?: string;
  isLast?: boolean;
}

export function Record({ record, className }: RecordProps) {
  const PaymentImage = PAYMENT_IMAGES[record.pay!];

  return (
    <div
      key={record.id}
      className={cn(
        "rt-w-full rt-border-b last:rt-border-0 rt-pb-[15px] rt-px-[15px] rt-flex rt-flex-col rt-bg-white",
        PaymentImage ? "rt-pt-[12.75px] rt-gap-[12.75px]" : "rt-pt-5 rt-gap-5",
        className,
      )}
    >
      <div className="rt-flex rt-justify-between rt-items-center">
        {PaymentImage ? (
          <Image
            src={PaymentImage}
            alt={record.pay!}
            width={27}
            height={27}
            className="rt-rounded-[5px]"
          />
        ) : (
          <span className="rt-font-noto rt-font-medium rt-text-[13px] rt-leading-none">
            {record.description}
          </span>
        )}
        <span className="rt-font-inter rt-text-15px rt-leading-none">
          {formatNumber(record.amount!)} Ks
        </span>
      </div>
      <div className="rt-font-inter rt-text-15px rt-flex rt-justify-between rt-items-center rt-leading-none">
        <span>{record.phoneNo}</span>
        <span className="rt-text-[#65b448]">
          {formatNumber(record.fee!)} Ks
        </span>
      </div>
    </div>
  );
}

export function ReportRecord({ record, className, isLast }: ReportRecordProps) {
  const PaymentImage = PAYMENT_IMAGES[record.Pay!];

  return (
    <div
      key={record.Id}
      className={cn(
        "group rt-w-full rt-px-[15px] rt-flex rt-flex-col rt-bg-white",
        PaymentImage ? "rt-pt-[12.75px]" : "rt-pt-5",
        className,
      )}
    >
      <div
        className={cn(
          "rt-flex rt-flex-col rt-pb-[15px]",
          !isLast && "rt-border-b rt-border-gray-200",
          PaymentImage ? "rt-gap-[12.75px]" : "rt-gap-5",
        )}
      >
        <div className="rt-flex rt-justify-between rt-items-center">
          {PaymentImage ? (
            <Image
              src={PaymentImage}
              alt={record.Pay!}
              width={27}
              height={27}
              className="rt-rounded-[5px]"
            />
          ) : (
            <span className="rt-font-noto rt-font-medium rt-text-[13px] rt-leading-none">
              {record.Description}
            </span>
          )}
          <span className="rt-font-inter rt-text-15px rt-leading-none">
            {formatNumber(record.Amount!)} Ks
          </span>
        </div>
        <div className="rt-font-inter rt-text-15px rt-flex rt-justify-between rt-items-center rt-leading-none">
          <span>{record.PhoneNo}</span>
          <span className="rt-text-[#65b448]">
            {formatNumber(record.Fee!)} Ks
          </span>
        </div>
      </div>
    </div>
  );
}
