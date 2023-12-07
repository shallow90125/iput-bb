import { User as FirebaseUser } from "firebase/auth";

declare module "next-auth" {
  interface Session {
    user: FirebaseUser;
  }
  interface User {
    user: FirebaseUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: FirebaseUser;
  }
}
