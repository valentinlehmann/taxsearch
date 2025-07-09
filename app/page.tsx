"use client";

import SearchBar from "@/components/SearchBar";

export default function Home() {
    return (
        <div className={"w-full h-full flex flex-col justify-center items-center"}>
            <h1 className={"text-4xl font-black"}>Willkommen bei TaxSearch!</h1>
            <p>Dein Tool für Volltextsuche über die Entscheidungen des Bundesfinanzhofs.</p>

            <div className={"mt-8 w-full max-w-96 flex flex-col gap-1"}>
                <SearchBar displayResults={true} />
            </div>
        </div>
    );
}
