"use client";

import { initAtom, userAtom } from "@/utils/atom";
import { initApp } from "@/utils/initApp";
import { Unsubscribe, getAuth, onAuthStateChanged } from "firebase/auth";
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
    let unsubscribe: Unsubscribe;
    startTransition(() => {
      initApp();
      const auth = getAuth();
      unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log(`AuthProvider: onAuthStateChanged: ${user?.email}`);
        setCurrentUser(user);
        if (!isInit) setIsInit(true);
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <>{children}</>;
}
