import SignForm from "@/components/SignForm";

export default function SignUp(): React.ReactNode {
  return (
    <main className=" grid min-h-[calc(100dvh_-_3.75rem)] place-content-center place-items-center gap-8 p-4">
      <SignForm isSignUp={true}></SignForm>
    </main>
  );
}
