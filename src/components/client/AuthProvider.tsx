"use client";

import { currentUserState } from "@/utils/atom";
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

  const setCurrentUser = useSetRecoilState(currentUserState);

  onAuthStateChanged(auth, (user) => setCurrentUser(user));

  return <>{children}</>;
}
