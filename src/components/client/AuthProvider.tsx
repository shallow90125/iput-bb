"use client";

import { userAtom } from "@/utils/atom";
import { initApp } from "@/utils/initApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from "recoil";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  initApp();
  const auth = getAuth();

  const setCurrentUser = useSetRecoilState(userAtom);

  const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));

  unsubscribe();

  return <>{children}</>;
}
