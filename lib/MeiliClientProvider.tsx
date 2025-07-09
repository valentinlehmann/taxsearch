"use client";

import MeiliProvider from "@/lib/MeiliProvider";

export default function MeiliClientProvider({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MeiliProvider>
            {children}
        </MeiliProvider>
    );
}