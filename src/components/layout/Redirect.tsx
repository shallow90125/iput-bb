"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, []);

  return <>{children}</>;
}
