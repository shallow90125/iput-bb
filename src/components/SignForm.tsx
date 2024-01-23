"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type Props = {
  isSignUp: boolean;
};

type Form = {
  email: string;
  password: string;
};

export default function SignForm(props: Props): React.ReactNode {
  const router = useRouter();
  const [error, setError] = useState<string>();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="grid w-72 gap-4"
        onSubmit={form.handleSubmit(async (data) => {
          const res = await signIn(props.isSignUp ? "signup" : "signin", {
            email: data.email,
            password: data.password,
            redirect: false,
          });
          if (!res?.ok) {
            setError("email or password is invalid");
          } else {
            router.push("/dashboard");
          }
        })}
      >
        <div className=" text-center text-xl font-bold">
          {props.isSignUp ? "Sign up" : "Sign in"}
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" grid place-items-center gap-2">
          {props.isSignUp ? (
            <>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Link href="/signin">
                <Button variant="link">Click here to sign in</Button>
              </Link>
            </>
          ) : (
            <>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Link href="/signup">
                <Button variant="link">Click here to sign up</Button>
              </Link>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
