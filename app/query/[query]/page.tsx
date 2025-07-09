"use client";

import {useParams, useSearchParams} from "next/navigation";
import {useMeili} from "@/lib/MeiliProvider";
import {useEffect, useState} from "react";
import {Hits} from "meilisearch";
import {CaseDocument} from "@/lib/types";
import SearchBar from "@/components/SearchBar";
import dayjs from "dayjs";
import {Button} from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function QueryPage() {
    const params = useParams<{ query: string; }>();
    const query = decodeURIComponent(params.query);
    const searchParams = useSearchParams();
    const meili = useMeili();
    const page = parseInt(searchParams.get("page") || "0");

    const [results, setResults] = useState<Hits<CaseDocument>>();
    const [count, setCount] = useState(-1);

    useEffect(() => {
        meili.index("bfh").search(query, {
            offset: page * 20,
        }).then((response) => {
            setResults(response.hits as Hits<CaseDocument>);
            setCount(response.estimatedTotalHits);
        })
    }, [page]);

    if (!results) {
        return <p>Ergebnisse werden geladen.</p>;
    }

    const startId = (page * 20) + 1;
    const isLastPage = count <= (page + 1) * 20;

    const generatePageLink = (pageNumber: number) => "/query/" + encodeURIComponent(query) + "/?page=" + pageNumber;

    return (
        <div className={"w-full h-full flex justify-center"}>
            <div className={"w-full max-w-3/4"}>
                <SearchBar defaultValue={query} displayResults={false} />

                <div className={"mt-8 flex flex-col gap-2"}>
                    <p className={"text-center text-xs text-muted-foreground"}>Ergebnisse {startId} bis {startId - 1 + results.length} von insgesamt {count}</p>
                    {
                        results.map((result) => {
                            const date = dayjs(result.date);

                            return (
                                <div className={"w-full flex items-center flex-row rounded border p-4 gap-2"} key={result.docNumber}>
                                    <div className={"w-full"}>
                                        <h2 className={"text-xs"}><b>{result.body}. {result.courtType}</b> | {result.caseNumber} | {date.format("DD.MM.YYYY")}</h2>
                                        <h1 className={""}>{result.docType} | <b>{result.title}</b></h1>
                                    </div>
                                    <Button className={"cursor-pointer"} onClick={() => {
                                        window.open(`https://www.rechtsprechung-im-internet.de/jportal/portal/t/1aw1/page/bsjrsprod.psml?doc.id=jb-${result.docNumber}&showdoccase=1&doc.part=L`, "_blank");
                                    }}>
                                        Öffnen
                                    </Button>
                                </div>
                            )
                        })
                    }

                    <Pagination>
                        <PaginationContent>
                            {
                                page != 0 && (
                                    <>
                                        <PaginationItem>
                                            <PaginationPrevious href={generatePageLink(page - 1)} />
                                        </PaginationItem>
                                    </>
                                )
                            }
                            <PaginationItem>
                                <PaginationLink isActive>{page + 1}</PaginationLink>
                            </PaginationItem>
                            {
                                !isLastPage && (
                                    <>
                                        <PaginationItem>
                                            <PaginationNext href={generatePageLink(page + 1)} />
                                        </PaginationItem>
                                    </>
                                )
                            }
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}