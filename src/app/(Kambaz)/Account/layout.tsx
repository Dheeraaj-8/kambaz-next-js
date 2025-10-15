import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="d-flex" style={{ marginLeft: "100px", minHeight: "100vh" }}>
      <div className="flex-shrink-0" style={{ position: "relative", zIndex: 999 }}>
        <AccountNavigation />
      </div>
      <div className="flex-fill">
        {children}
      </div>
    </div>
  );
}