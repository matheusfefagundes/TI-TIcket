import { Lato } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "../providers/auth";
import { Toaster } from "sonner";

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lato",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Help Desk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
