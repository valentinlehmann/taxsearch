import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import MeiliClientProvider from "@/lib/MeiliClientProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TaxSearch",
    description: "Einfache Volltextsuche für Entscheidungen des Bundesfinanzhofs",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen p-4`}
        >
            <MeiliClientProvider>
                {children}
            </MeiliClientProvider>
        </body>
        </html>
    );
}
