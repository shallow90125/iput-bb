import SignForm from "@/components/SignForm";
import Redirect from "@/components/layout/Redirect";
import { nextAuthOptions } from "@/utils/next-auth-options";
import { getServerSession } from "next-auth";
import Loading from "../loading";

export default async function SignUp() {
  const session = await getServerSession(nextAuthOptions);

  return session ? (
    <Redirect href="/dashboard">
      <Loading />
    </Redirect>
  ) : (
    <main className=" grid min-h-[calc(100dvh_-_3.75rem)] place-content-center place-items-center gap-8 p-4">
      <SignForm isSignUp={true} />
    </main>
  );
}
