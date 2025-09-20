import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Wrapper from "./Components/Wrapper";
import Dialog from "./Components/Dialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI-Tutor",
  description: "Learn Smartly Save Time Learn Fast",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-[100dvh] bg-black text-gray-100">
          <Wrapper>
            {children}
          </Wrapper>
          <ToastContainer position="top-center" />
          <Dialog/>
        </div>
      </body>
    </html>
  );
}
