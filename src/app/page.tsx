"use client";

import { Box, Heading, SimpleGrid } from "@/components/chakra-ui/react";

export default function Home() {
  return (
    <SimpleGrid placeContent="stretch" placeItems="center" p={4} gap={4}>
      <Box>
        <Heading size="lg">
          WINSORは、スマートフォンから窓の開閉を確認することができるサービスです。あらゆる場所からアプリを通して自宅の窓の状態をチェックでき、あなたの生活をさらに快適にします。
        </Heading>
      </Box>
    </SimpleGrid>
  );
}
