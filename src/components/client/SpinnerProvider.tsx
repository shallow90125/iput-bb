"use client";

import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { RecoilState, useRecoilValue } from "recoil";

type Props = {
  children: React.ReactNode;
  atom: RecoilState<boolean>;
  state: boolean;
};

export default function SpinnerProvider(props: Props) {
  const state = useRecoilValue(props.atom);
  return props.state == state ? (
    <SimpleGrid placeContent="stretch" placeItems="center">
      <Spinner />
    </SimpleGrid>
  ) : (
    <>{props.children}</>
  );
}
