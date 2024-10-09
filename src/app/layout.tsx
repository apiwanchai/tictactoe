import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { auth, signOut } from "@/auth/authSetup";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "tic tac toe",
  
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto`}
      >
        <div className="bg-slate-800 mb-5 py-1 px-2 mt-2 rounded-md flex justify-between">
          <ul className="flex gap-5 ">
            <li className="hover:underline">
              <Link href="/game">Game</Link>
            </li>
          
          </ul>
          <div className="hover:underline">
            {session?.user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <div className="flex items-center gap-2">
                  <button>Logout</button>
                  <Image
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                    className="rounded-full w-4 h-4 object-cover"
                    width={12}
                    height={12}
                  />
                </div>
              </form>
            ) : (
              <Link href="/">Login</Link>
            )}
          </div>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
