import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prisma } from "./prisma";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
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
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (trigger === "update" && typeof session?.image !== "undefined") {
        token.picture = session.image;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        if (token.id) {
          session.user.id = token.id;
        }
        if (token.role) {
          session.user.role = token.role;
        }
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
