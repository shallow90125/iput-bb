"use client";

import { initAtom, userAtom } from "@/utils/atom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

type Props = {
  children: React.ReactNode;
  isExists: boolean;
};

export default function AuthRedirector(props: Props) {
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const isInit = useRecoilValue(initAtom);

  useEffect(() => {
    console.log("AuthRedirector: useEffect");
    if (!isInit) return;
    if ((props.isExists && user) || (!props.isExists && !user))
      router.replace("/");
  });
  return <>{props.children}</>;
}
