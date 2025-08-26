"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state copy";

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return(
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data} columns={columns}/>
            {data.length === 0 && (
            <EmptyState 
            title="Create your first Agent"
            description="Get started by creating your first AI Agent to host meetings."
            />
            )}
        </div>
    )
};

export const AgentsViewError = () => {
    return (
        <ErrorState
                title="Error Load Agents"
                description="There was an error fetching the agents. Please try again later."
        />
    )
}