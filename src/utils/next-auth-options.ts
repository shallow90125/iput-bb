import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { auth } from "./firebase";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "signin",
      id: "signin",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      type: "credentials",
      authorize: async (credentials, _) => {
        try {
          if (!credentials) return null;
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
          return { user: userCredential.user, id: userCredential.user.uid };
        } catch (error) {
          return null;
        }
      },
    }),
    Credentials({
      name: "signup",
      id: "signup",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      type: "credentials",
      authorize: async (credentials, req) => {
        try {
          if (!credentials) return null;
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password,
          );
          return { user: userCredential.user, id: userCredential.user.uid };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user.user;
      return token;
    },

    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
