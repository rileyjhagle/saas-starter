import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "@/trpc/react";
import { auth } from "@/server/auth";
import { getEvents } from "@/data";
import { ApplicationLayout } from "../components/application/application-layout";
import { SignIn } from "@/components/application/authentication/login";

export const metadata: Metadata = {
  title: "SaaS Starter",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const events = await getEvents();
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} className="text-zinc-950 dark:lg:bg-zinc-950" antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white`}
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <TRPCReactProvider>
          {session?.user ? (
            <ApplicationLayout session={session} events={events}>
              <Toaster />
              {children}
            </ApplicationLayout>
          ) : (
            <SignIn />
          )}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
