import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { GamesProvider } from "@/context/GamesContext";
import { TeamsProvider } from "@/context/TeamsContext";


const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Jogaê",
  description: "Sistema de gestão esportiva",
};




export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {


  return (

    <html lang="pt-BR">


      <body

        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}

      >


        <GamesProvider>


          <TeamsProvider>

            {children}

          </TeamsProvider>


        </GamesProvider>


      </body>


    </html>

  );

}