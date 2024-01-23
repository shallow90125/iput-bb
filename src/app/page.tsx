import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className=" grid min-h-[calc(100dvh_-_3.75rem)] place-content-center place-items-center gap-8 p-4">
        <div className=" grid place-items-center gap-4 p-4">
          <div className=" bg-gradient-to-br from-primary to-orange-600 bg-clip-text p-4 text-center text-6xl font-bold text-transparent">
            WinsoR
          </div>
          <div className=" max-w-2xl text-center text-2xl text-muted-foreground">
            WinsoRは、スマートフォンから窓の開閉を確認することができるサービスです。あらゆる場所からアプリを通して自宅の窓の状態をチェックでき、あなたの生活をさらに快適にします。
          </div>
        </div>
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
