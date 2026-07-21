import type { Metadata } from "next";

import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";



export const metadata: Metadata = {

  title: "Jogaê",

  description: "Organize. Marque. Jogue.",

};





export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {


  return (

    <html lang="pt-BR">


      <body>


        <TooltipProvider>

          {children}

        </TooltipProvider>


      </body>


    </html>

  );

}