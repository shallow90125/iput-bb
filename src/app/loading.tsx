import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <main className=" grid min-h-[calc(100dvh_-_3.75rem)] place-content-center place-items-center gap-8 p-4">
      <Loader2Icon size={40} className=" animate-spin text-primary" />
    </main>
  );
}
