import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" grid h-[0.375rem] place-content-stretch border-t">
      <div className=" flex place-content-center place-items-center gap-4 p-4 md:container">
        <Link href="/" className=" text-primary">
          &copy; 2023 iput-bb
        </Link>
      </div>
    </footer>
  );
}
