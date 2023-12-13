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
import { User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Session() {
  const { data: session } = useSession();
  useEffect(() => {}, [session]);

  return session ? (
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
            {session.user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
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
