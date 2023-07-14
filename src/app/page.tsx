"use client";

import { Grid, Text } from "@/components/chakra-ui/react";
import AuthProvider from "@/components/client/AuthProvider";
import { userAtom } from "@/utils/atom";
import { initApp } from "@/utils/initApp";
import { getAuth } from "firebase/auth";
import { useRecoilValue } from "recoil";

export default function Home() {
  initApp();
  const auth = getAuth();

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     console.log(user);
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //     console.log("nothing");
  //   }
  // });

  const currentUser = useRecoilValue(userAtom);

  return (
    <AuthProvider>
      <Grid placeContent="streach" placeItems="center">
        <Text>user: {currentUser?.email}</Text>
      </Grid>
    </AuthProvider>
  );
}
