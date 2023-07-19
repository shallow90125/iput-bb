"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import AuthProvider from "./AuthProvider";

export default function Provider({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          backgroundColor: "blue.50",
          color: "black",
        },
      },
    },
  });

  return (
    <RecoilRoot>
      <AuthProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}
