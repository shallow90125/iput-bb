import { Box, Flex, Text } from "@/components/chakra-ui/react";
import Link from "next/link";
import LoginField from "../client/LoginField";

export default function Header() {
  return (
    <Flex
      as="header"
      h="16"
      flex="none"
      placeItems="center"
      fontWeight="bold"
      gap={4}
      p={4}
    >
      <Box flexGrow={1}>
        <Link href="/">
          <Text fontSize="2xl">This Is Title</Text>
        </Link>
      </Box>
      <Box>
        <LoginField />
      </Box>
    </Flex>
  );
}
