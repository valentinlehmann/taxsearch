"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {IconSend} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {useMeili} from "@/lib/MeiliProvider";
import {useRouter} from "next/navigation";

export default function SearchBar({displayResults, defaultValue}: {displayResults: boolean, defaultValue?: string}) {
    const [searchQuery, setSearchQuery] = useState(defaultValue || "");
    const [found, setFound] = useState(-1);
    const meili = useMeili();
    const router = useRouter();

    useEffect(() => {
        meili.index("bfh").search(searchQuery).then((response) => {
            setFound(response.estimatedTotalHits);
        });
    }, [searchQuery]);

    return (
        <div className={"w-full"}>
            <div className={"w-full flex flex-row gap-2"}>
                <Input value={searchQuery} onChange={(input) => {
                    setSearchQuery(input.currentTarget.value || "");
                }} onKeyUp={(event) => {
                    if (event.key !== "Enter") {
                        return;
                    }

                    router.push("/query/" + encodeURIComponent(searchQuery));
                }} className={"flex-1"} placeholder={"§ 11 Abs 1 S 4 EStG"}/>
                <Button onClick={() => {
                    router.push("/query/" + encodeURIComponent(searchQuery));
                }}><IconSend/></Button>
            </div>
            {
                displayResults && (
                    <p className={"text-xs text-muted-foreground"}>{found === 1000 && "Mindestens "}{found} Ergebnis{found != 1 && "se"} gefunden.</p>
                )
            }
        </div>
    );
}