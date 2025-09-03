import Link from "next/link";
import { RocketIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from "@/modules/premium/constants";
import { cn } from "@/lib/utils";

export const DashboardTrial = () => {
    const trpc = useTRPC();
    const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());

    if (!data) return null;

    const agentPercentage = (data.agentCount / MAX_FREE_AGENTS) * 100;
    const meetingPercentage = (data.meetingCount / MAX_FREE_MEETINGS) * 100;

    return (
        <div className="border border-emerald-200/50 dark:border-emerald-700/30 rounded-xl w-full bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 backdrop-blur-sm p-4 flex flex-col gap-y-4 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg">
                    <RocketIcon className="size-4 text-white" />
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Free Trial</p>
            </div>
            
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Agents</p>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {data.agentCount}/{MAX_FREE_AGENTS}
                        </span>
                    </div>
                    <Progress
                    value={agentPercentage}
                    className={cn(
                        "h-2 bg-slate-200/50 dark:bg-slate-700/50",
                        "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-teal-500",
                        agentPercentage >= 80 && "[&>div]:from-amber-500 [&>div]:to-orange-500",
                        agentPercentage >= 95 && "[&>div]:from-red-500 [&>div]:to-rose-500"
                    )}
                    />
                </div>               
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Meetings</p>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {data.meetingCount}/{MAX_FREE_MEETINGS}
                        </span>
                    </div>
                    <Progress
                    value={meetingPercentage}
                    className={cn(
                        "h-2 bg-slate-200/50 dark:bg-slate-700/50",
                        "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-teal-500",
                        meetingPercentage >= 80 && "[&>div]:from-amber-500 [&>div]:to-orange-500",
                        meetingPercentage >= 95 && "[&>div]:from-red-500 [&>div]:to-rose-500"
                    )}
                    />

                </div>
            </div>
            
            <Button 
                asChild 
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 mt-2"
            >
                <Link href="/upgrade">
                    Upgrade Now
                </Link>
            </Button>
        </div>
    )
}