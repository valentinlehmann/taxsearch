"use client";

import {createContext, useContext} from "react";
import {Meilisearch} from "meilisearch";

const MeiliContext = createContext(new Meilisearch({
    host: "http://localhost:7700",
}));

export default function MeiliProvider({children}: Readonly<{
    children: React.ReactNode;
}>) {
    const client = new Meilisearch({
        host: process.env.NEXT_PUBLIC_MEILI_HOST || "",
        apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY || ""
    });

    return (
        <MeiliContext.Provider value={client}>
            {children}
        </MeiliContext.Provider>
    );
}

export function useMeili() {
    return useContext(MeiliContext);
}