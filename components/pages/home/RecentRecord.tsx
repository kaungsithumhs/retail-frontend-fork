import { ROUTES } from "@/common/constants";
import NoRecordIcon from "@/components/icons/no-record.svg";
import RightArrowIcon from "@/components/icons/right-arrow.svg";
import IfElse from "@/components/IfElse";
import { RecordsList } from "@/components/pages/home";
import { recordService } from "@/lib/api/records";
import Link from "next/link";
import { useEffect, useState } from "react";

import { RecordItem } from "@/common/types";

export function RecentRecord() {
  const [records, setRecords] = useState<RecordItem[]>([]);

  useEffect(() => {
    let ignore = false;

    async function fetchRecords() {
      try {
        const data = await recordService.getRecents({
          page: 1,
          limit: 10,
        });

        if (!ignore) {
          setRecords(data.transferRecords);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Failed to fetch records:", error);
        }
      }
    }

    fetchRecords();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="rt-w-full rt-flex-1 rt-bg-white rt-py-[14px] rt-px-[19px] rt-rounded-t-[20px] rt-flex rt-flex-col">
      <div className="rt-flex rt-items rt-justify-between rt-font-pyi">
        <p className="rt-font-bold rt-text-[#1e77ed] rt-text-17px">
          နောက်ဆုံးစာရင်းမှတ်တမ်း
        </p>
        <Link
          href={ROUTES.VIEW_RECORDS}
          className="rt-flex rt-items-center rt-font-bold"
        >
          <span>အားလုံးကြည့်ရန်</span>{" "}
          <RightArrowIcon className="rt-w-6 rt-h-6 rt-text-[#686868]" />
        </Link>
      </div>
      <div className="rt-w-full rt-flex rt-items-center rt-justify-center rt-flex-1 rt-mt-[13px]">
        <IfElse
          isTrue={records.length > 0}
          ifBlock={<RecordsList records={records} />}
          elseBlock={
            <div className="rt-flex rt-flex-col rt-gap-3 rt-items-center rt-justify-center">
              <NoRecordIcon className="rt-text-[#F7F7F7]" />
              <span className="rt-text-[#D7D7D7]">စာရင်းမှတ်တမ်းမရှိသေးပါ</span>
            </div>
          }
        />
      </div>
    </div>
  );
}
