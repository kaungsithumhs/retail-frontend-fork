/**
 * Quick Actions Component
 * Displays quick action buttons for common tasks
 */

import React from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/common/constants";
import NoteBookIcon from "@/components/icons/note-book.svg";
import NotePencilIcon from "@/components/icons/note-pencil.svg";
import GearSixIcon from "@/components/icons/gear-six.svg";
import Link from "next/link";

const actions = [
  {
    label: "စာရင်းမှတ်မည်",
    route: ROUTES.ADD_RECORD,
    icon: NotePencilIcon,
  },
  {
    label: "စာရင်းကြည့်မည်",
    route: ROUTES.VIEW_RECORDS,
    icon: NoteBookIcon,
  },
  {
    label: "လွှဲခထည့်မည်",
    route: ROUTES.ADD_FEE,
    icon: GearSixIcon,
  },
];

export function QuickActions() {
  return (
    <Card className="rt-w-[360px] rt-mx-auto rt-border-0 rt-shadow-none rt-rounded-[10px]">
      <CardContent className="rt-flex rt-justify-between rt-font-noto rt-px-[15px] rt-py-[13px]">
        {actions.map((action) => (
          <Link
            key={action.route}
            href={action.route}
            className="rt-flex rt-flex-col rt-items-center rt-gap-2"
          >
            <div className="rt-w-[52px] rt-h-[52px] rt-bg-[#cde0fb] rt-flex rt-items-center rt-justify-center rt-rounded-full">
              <action.icon className="rt-w-6 rt-text-[#2e6eff]" />
            </div>
            <span className="rt-text-xs">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
