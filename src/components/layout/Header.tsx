import { LayoutGridIcon } from "lucide-react";
import Link from "next/link";
import Session from "./Session";

export default function Header() {
  return (
    <header className=" sticky top-0 z-50 grid flex-none place-content-stretch border-b bg-background">
      <div className=" flex place-items-center gap-4 p-3 px-4 md:container">
        <Link
          href="/dashboard"
          className=" flex flex-none place-items-center gap-2 rounded text-lg font-bold text-primary"
        >
          <LayoutGridIcon />
          WinsoR
        </Link>
        <div className=" flex flex-grow justify-end gap-4">
          <Session />
        </div>
      </div>
    </header>
  );
}
