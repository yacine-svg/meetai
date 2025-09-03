"use client";

import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter, 
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";
import { DashboardTrial } from "./dashboard.trial";

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
        color: "text-emerald-600 dark:text-emerald-400"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
        color: "text-emerald-600 dark:text-emerald-400"
    },
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
        color: "text-amber-600 dark:text-amber-400"
    }
]

export const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar className="bg-gradient-to-b from-emerald-50/80 to-teal-50/80 dark:from-slate-900 dark:to-slate-800 border-r border-slate-200/50 dark:border-slate-700/50">
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-4 pt-4">
                    <div className="p-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg">
                        <Image src="/logo.svg" height={32} width={32} alt="MeetAi" className="filter brightness-0 invert"/>
                    </div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Meet.AI</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="bg-slate-200/50 dark:bg-slate-700/50" />
            </div>
            <SidebarContent className="px-3">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                    className={cn(
                                        "h-12 px-4 rounded-lg transition-all duration-200 border border-transparent",
                                        "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-slate-700 dark:hover:to-slate-600",
                                        "hover:border-emerald-200/50 dark:hover:border-emerald-700/30",
                                        pathname === item.href && 
                                        "bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 border-emerald-200/50 dark:border-emerald-700/30 shadow-sm"
                                    )}
                                    isActive={pathname === item.href}>
                                        <Link href={item.href} className="flex items-center gap-3">
                                            <item.icon className={cn("size-5", item.color)} />
                                            <span className={cn("text-sm font-medium tracking-tight", item.color)}>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                    <Separator className="bg-slate-200/50 dark:bg-slate-700/50" />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                    className={cn(
                                        "h-12 px-4 rounded-lg transition-all duration-200 border border-transparent",
                                        "hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20",
                                        "hover:border-amber-200/50 dark:hover:border-amber-700/30",
                                        pathname === item.href && 
                                        "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200/50 dark:border-amber-700/30 shadow-sm"
                                    )}
                                    isActive={pathname === item.href}>
                                        <Link href={item.href} className="flex items-center gap-3">
                                            <item.icon className={cn("size-5", item.color)} />
                                            <span className={cn("text-sm font-medium tracking-tight", item.color)}>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 space-y-4">
                <DashboardTrial />
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    );
}