import { SimpleGrid } from "@/components/chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

export default function Lock() {
  return (
    <SimpleGrid
      w={10}
      h={10}
      bgColor="cyan.300"
      placeContent="center"
      rounded="base"
    >
      <LockIcon />
    </SimpleGrid>
  );
}
