import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz" className="d-flex">
      <KambazNavigation />
      <div className="flex-fill">
        {children}
      </div>
    </div>
  );
}
