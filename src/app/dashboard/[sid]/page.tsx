import Loading from "@/app/loading";
import DeleteButton from "@/components/DeleteButton";
import Redirect from "@/components/layout/Redirect";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCollection } from "@/utils/firebase";
import { nextAuthOptions } from "@/utils/next-auth-options";
import { getDocs, limit, query, where } from "firebase/firestore";
import { ChevronLeftIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function DashboardId({
  params: { sid },
}: {
  params: { sid: string };
}) {
  const session = await getServerSession(nextAuthOptions);
  const uid = session?.user.uid ?? "";
  const { ref, path } = getCollection("sb");

  const q = query(
    ref,
    where(path.sid, "==", sid),
    where(path.uid, "==", uid),
    limit(1),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return (
      <Redirect href="/dashboard">
        <Loading />
      </Redirect>
    );
  }

  const data = snapshot.docs[0].data();

  return (
    <main className=" container flex min-h-[calc(100dvh_-_3.75rem)] flex-col gap-4 p-4">
      <div className=" flex flex-none place-items-center gap-4">
        <Link href="/dashboard" className=" flex-none">
          <Button size="icon">
            <ChevronLeftIcon />
          </Button>
        </Link>
        <div className=" flex-grow text-2xl">{data.name}</div>
        <DeleteButton id={snapshot.docs[0].id} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.history.reverse().map((v, i) => (
            <TableRow
              key={i}
              className={v.isOpen ? " text-amber-500" : " text-blue-500"}
            >
              <TableCell>{v.isOpen ? "Opened" : "Closed"}</TableCell>
              <TableCell>{`${v.timestamp
                .toDate()
                .toLocaleDateString()} ${v.timestamp
                .toDate()
                .toLocaleTimeString()}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
