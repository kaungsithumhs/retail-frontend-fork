import { RecordItem } from "@/common/types";

import { formatCalendarDate, formatCurrency } from "@/common/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NoRecordIcon from "@/components/icons/no-record.svg";
import { ReportRecord } from "@/components/pages/view-records";
import { transferRecordReport } from "@/lib/api/records";
import IfElse from "@/components/IfElse";
import { useEffect, useState } from "react";

export interface RecordsListProps {
  records?: transferRecordReport[];
  observerRef?: (node: HTMLDivElement) => void;
  loading?: boolean;
}

export function RecordsList({
  records,
  observerRef,
  loading,
}: RecordsListProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  // When records load, open all by default
  useEffect(() => {
    if (records) {
      setOpenItems(records.map((_, i) => i.toString()));
    }
  }, [records]);

  return (
    <div className="rt-px-5 rt-pt-[17px] rt-flex-1">
      <IfElse
        isTrue={records?.length === 0 && !loading}
        ifBlock={
          <div className="rt-h-full">
            <div className="rt-flex rt-flex-col rt-gap-3 rt-items-center rt-justify-center rt-h-full">
              <NoRecordIcon className="rt-text-[#EAEAEA] rt-mt-3!" />
              <span className="rt-text-[#D7D7D7]">စာရင်းမှတ်တမ်းမရှိသေးပါ</span>
            </div>
          </div>
        }
        elseBlock={
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="rt-space-y-[10px]"
          >
            {records?.map((record, index) => (
              <AccordionItem
                value={index.toString()}
                className="rt-border-0 rt-rounded-[10px]  [&_svg]:rt-size-6 [&_svg]:rt-text-[#1e77ed]"
                key={index}
              >
                <AccordionTrigger
                  className="hover:rt-no-underline rt-border-0 rt-items-start rt-overflow-hidden rt-bg-[#e0edff] rt-rounded-[10px] data-[state=open]:rt-rounded-b-none"
                  chevronClassName="rt-absolute rt-top-3 rt-right-4"
                >
                  <div className="rt-w-full rt-px-[15px]">
                    <span className="rt-font-inter rt-text-sm rt-font-bold rt-text-[#1e77ed] rt-mb-[18px]">
                      {formatCalendarDate(record.date)}
                    </span>
                    <div className="rt-flex rt-items-center rt-justify-between rt-mt-3">
                      <div className="rt-flex rt-flex-col">
                        <span className="rt-text-[#8f8f8f] rt-text-sm rt-font-pyi">
                          စုစုပေါင်း ငွေသွင်း/ထုတ်
                        </span>
                        <span className="rt-font-pyi rt-font-bold rt-text-lg">
                          {formatCurrency(record.totalAmount)} Ks
                        </span>
                      </div>
                      <div className="rt-flex rt-flex-col rt-items-end">
                        <span className="rt-text-[#8f8f8f] rt-text-sm rt-font-pyi">
                          စုစုပေါင်း လွှဲခ/ အမြတ်
                        </span>
                        <span className="rt-font-pyi rt-font-bold rt-text-lg rt-text-[#65b448] rt-z-50">
                          {formatCurrency(record.totalFee)} Ks
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="rt-absolute -rt-bottom-[70px] -rt-right-[112px] rt-w-36 rt-h-36 rt-bg-[#cde0fb] rt-rounded-full"></div>
                </AccordionTrigger>
                <AccordionContent>
                  {record.records.map((recordItem, index) => (
                    <ReportRecord
                      className="last:rt-rounded-b-[10px]"
                      key={index}
                      record={recordItem}
                      isLast={index === record.records.length - 1}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
            <div ref={observerRef} className="rt-h-1" />
          </Accordion>
        }
      />
    </div>
  );
}
