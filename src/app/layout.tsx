"use client"

import "@/style/dark.css";
import { useContext } from "react";
import { DarkModeContext } from "@/context/darkModeContext";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Copywrite from "@/components/copywrite/Copywrite";
import {GlobalProvider} from "@/app/GlobalProvider";
import {useState} from "react"
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode } = useContext(DarkModeContext);
  const [name,setname]=useState("");
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
      <GlobalProvider>
        <Navbar />
        {children}
        <Copywrite/>
        </GlobalProvider>
      </body>
    </html>
  );
}
