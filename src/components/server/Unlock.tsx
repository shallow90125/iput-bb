import { SimpleGrid } from "@/components/chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

export default function Unlock() {
  return (
    <SimpleGrid
      w={10}
      h={10}
      bgColor="red.300"
      placeContent="center"
      rounded="base"
    >
      <UnlockIcon />
    </SimpleGrid>
  );
}
