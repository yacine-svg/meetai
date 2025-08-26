import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { AgentsView, AgentsViewError } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
    const session = await auth.api.getSession({
            headers: await headers(),
        });
    
        if(!session) {
            redirect("/sign-in");
        }
    
    
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <>
        <AgentsListHeader />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState title="Loading Agents" description="Please wait while we fetch the agents."/>}> 
                <ErrorBoundary fallback= {<AgentsViewError />}>
                    <AgentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>        
        </>
    )
};
 
export default Page;