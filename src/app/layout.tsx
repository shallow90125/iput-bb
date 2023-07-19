import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
} from "@/components/chakra-ui/react";
import Provider from "@/components/client/Provider";
import Header from "@/components/server/Header";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";

const font = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata = {
  title: "WINSOR - 窓開閉確認アプリ",
  description: "窓開閉確認アプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Box
          as="body"
          fontFamily={font.style.fontFamily}
          fontWeight={font.style.fontWeight}
          fontStyle={font.style.fontStyle}
        >
          <Provider>
            <Flex direction="column" h="100dvh" w="100dvw">
              <Header />
              <Divider />
              <Container as="main" flexGrow={1} display="grid">
                {children}
              </Container>
              <Divider />
              <Grid
                as="footer"
                h="16"
                flex="none"
                placeItems="center"
                fontWeight="bold"
              >
                <GridItem>
                  <Link href="/login">&copy; 2023 iput-bb</Link>
                </GridItem>
              </Grid>
            </Flex>
          </Provider>
        </Box>
      </body>
    </html>
  );
}
