import Image from "next/image";

import { formatNumber } from "@/common/utils";
import EyeClosedIcon from "@/components/icons/eye-closed.svg";
import EyeOpenedIcon from "@/components/icons/eye-opened.svg";
import IfElse from "@/components/IfElse";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { totalService } from "@/lib/api/total";

const SHOW_AMOUNT_STORAGE_KEY = "home-envelope-show-amount";

export function Envelope() {
  const [showAmount, setShowAmount] = useState(true);
  const [total, setTotal] = useState({ total: 0, fee: 0 });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedShowAmount = localStorage.getItem(SHOW_AMOUNT_STORAGE_KEY);
    if (storedShowAmount === null) {
      return;
    }

    setShowAmount(storedShowAmount === "true");
  }, []);

  const handleToggleShowAmount = () => {
    setShowAmount((prevShowAmount) => {
      const nextShowAmount = !prevShowAmount;

      if (typeof window !== "undefined") {
        localStorage.setItem(SHOW_AMOUNT_STORAGE_KEY, String(nextShowAmount));
      }

      return nextShowAmount;
    });
  };

  useEffect(() => {
    totalService
      .getOne()
      .then(({ transferTotal }) => {
        if (transferTotal) {
          setTotal({ total: transferTotal.total, fee: transferTotal.fee });
        } else {
          setTotal({ total: 0, fee: 0 });
        }
      })
      .catch((_error) => {
        setTotal({ total: 0, fee: 0 });
      });
  }, []);

  return (
    <div className="rt-mx-auto rt-relative rt-w-[378px] rt-h-[233px] rt-bg-[url('/images/envelope-bg.png')] rt-bg-cover rt-bg-no-repeat rt-flex rt-items-center rt-justify-center rt--mt-[116px]">
      <div className="rt-mx-auto rt-relative rt-w-[355px] rt-h-[206px] rt-bg-[url('/images/envelope-card-bg.png')] rt-bg-cover rt-bg-no-repeat rt-flex rt-items-center rt-justify-center">
        <div className="rt-absolute rt-top-3 rt-lef-0 rt-w-10/12 rt-flex rt-justify-between rt-items-center">
          <Image
            src="/images/logo.png"
            alt="page logo"
            width={84}
            height={42}
          />
          <span className="rt-font-noto rt-font-bold rt-text-13 rt-text-white">
            ငွေသွင်း/ထုတ်စာရင်း
          </span>
        </div>
        <div className="rt-mx-auto rt-relative rt-w-[380px] rt-h-[235px] rt-bg-[url('/images/envelope-front-bg.png')] rt-bg-contain rt-bg-no-repeat rt-bg-[position:0px_75px]">
          <div className="rt-absolute rt-bottom-12 rt-left-7 rt-w-10/12 rt-gap-8 rt-flex rt-justify-between">
            <div className="rt-flex rt-flex-col rt-basis-1/2 rt-gap-[2px]">
              <div className="rt-flex rt-items-center rt-gap-[5px]">
                <Button
                  onClick={handleToggleShowAmount}
                  variant="plain"
                  size="plain"
                >
                  <IfElse
                    isTrue={showAmount}
                    ifBlock={<EyeOpenedIcon />}
                    elseBlock={<EyeClosedIcon />}
                  />
                </Button>
                <span className="rt-font-noto rt-text-15px rt-text-[#313131]">
                  ငွေသွင်း/ထုတ်
                </span>
              </div>
              <div className="rt-flex rt-items-center">
                <span className="rt-font-inter rt-font-semibold rt-text-21px">
                  {showAmount ? formatNumber(total.total) : "* * * * * *"}
                </span>
                <span className="rt-text-15px rt-ml-1"> Ks</span>
              </div>
            </div>
            <div className="rt-flex rt-flex-col rt-basis-1/2 rt-gap-[2px]">
              <div className="rt-flex rt-items-center rt-gap-[5px]">
                <Button
                  onClick={handleToggleShowAmount}
                  variant="plain"
                  size="plain"
                >
                  <IfElse
                    isTrue={showAmount}
                    ifBlock={<EyeOpenedIcon />}
                    elseBlock={<EyeClosedIcon />}
                  />
                </Button>
                <span className="rt-font-noto rt-text-15px rt-text-[#313131]">
                  လွှဲခ/အမြတ်
                </span>
              </div>
              <div className="rt-flex rt-items-center rt-font-inter">
                <span className="rt-font-semibold rt-text-21px">
                  {showAmount ? formatNumber(total.fee) : "* * * * * *"}
                </span>
                <span className="rt-text-15px rt-ml-1">Ks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
