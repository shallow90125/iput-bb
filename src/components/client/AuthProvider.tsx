"use client";

import { initAtom, userAtom } from "@/utils/atom";
import { initApp } from "@/utils/initApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useTransition } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const setCurrentUser = useSetRecoilState(userAtom);
  const [isInit, setIsInit] = useRecoilState(initAtom);

  useEffect(() => {
    startTransition(() => {
      initApp();
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        console.log(`AuthProvider: onAuthStateChanged: ${user?.email}`);
        setCurrentUser(user);
        if (!isInit) setIsInit(true);
      });
    });
  }, []);

  return <>{children}</>;
}
