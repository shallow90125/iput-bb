"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCollection } from "@/utils/firebase";
import { messaging } from "@/utils/sw";
import {
  arrayUnion,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useTransition } from "react";

export default function Session() {
  const { data, status } = useSession();
  const [isPending, startTransition] = useTransition();

  return status == "loading" ? (
    <></>
  ) : status == "authenticated" ? (
    <>
      <Link href="/dashboard">
        <Button variant="secondary" size="sm">
          Dashboard
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className=" h-8 w-8 flex-none">
            <AvatarImage src="https://github.com/shallow9025.png" />
            <AvatarFallback>
              <User2Icon />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Signed in as
            <br />
            {data.user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              startTransition(async () => {
                console.log("eee");
                const token = await getToken(messaging, {
                  vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
                });
                const { ref, path } = getCollection("sb");

                const snapshot = await getDocs(
                  query(ref, where(path.uid, "==", data.user.uid)),
                );

                if (snapshot.empty) return;

                console.log(token);

                for (const doc of snapshot.docs) {
                  await updateDoc(doc.ref, {
                    tokens: arrayUnion(token),
                  });
                }
              })
            }
          >
            Allow Notification
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()} className=" text-primary">
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : (
    <>
      <Link href="/signup">
        <Button variant="secondary" size="sm">
          Sign up
        </Button>
      </Link>
      <Link href="/signin">
        <Button size="sm">Sign in</Button>
      </Link>
    </>
  );
}
