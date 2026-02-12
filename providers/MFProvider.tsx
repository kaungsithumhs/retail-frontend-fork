//@ts-ignore
import "tailwindcss/tailwind.css";

import { ReactNode } from "react";

const MFProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rt-flex rt-items-center rt-justify-center rt-bg-white rt-overflow-y-auto">
      <div className="container-md">{children}</div>
    </div>
  );
};

export default MFProvider;
