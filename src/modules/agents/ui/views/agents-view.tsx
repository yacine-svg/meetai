"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return(
        <div>
            {JSON.stringify(data, null, 2)}
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