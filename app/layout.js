import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Logout from "@/components/Logout";

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Soundboard",
  description: "Taskflow management for podcast creators",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-3 sm:p-6 flex items-center justify-between gap-4">
      <Link href={"/"}>
        <h1
          className={"text-base sm:text-lg textGradient " + poppins.className}
        >
          Soundboard
        </h1>
      </Link>
      <Logout />
    </header>
  );

  const footer = (
    <footer className="p-3 sm:p-6 grid place-items-center ">
      <p className={"text-orange-500 " + poppins.className}>Created with 🧡</p>
    </footer>
  );

  return (
    <html lang="en">
      {/* Wrap entire application in Authentication context */}
      <AuthProvider>
        <body
          className={
            "w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 " +
            openSans.className
          }
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
