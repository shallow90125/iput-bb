import Providers from "@/app/Providers";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Footer from "./Footer";
import Header from "./Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata = {
  title: "WinsoR 窓開閉確認アプリ",
  description: "窓開閉確認アプリ",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className + noto.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
