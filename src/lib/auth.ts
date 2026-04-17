import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Credenciais inválidas");

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Credenciais inválidas");
        }

        const isMatchedPassword = await compare(
          credentials.password,
          user.password,
        );

        if (!isMatchedPassword) {
          throw new Error("Credenciais inválidas");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, 
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User & { id: string };
      trigger?: "signIn" | "signUp" | "update";
      session?: { image?: string };
    }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (trigger === "update" && typeof session?.image !== "undefined") {
        token.picture = session.image;
      }

      return token;
    },
    // Tipagem direta aqui também.
    session: ({ session, token }: { session: Session; token: JWT }) => {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture as string | null | undefined;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};