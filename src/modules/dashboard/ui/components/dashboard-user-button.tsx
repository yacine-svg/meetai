import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
}from "@/components/ui/dropdown-menu";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter
} from "@/components/ui/drawer"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
    const router = useRouter();
    const isMobile = useIsMobile();
    const { data, isPending } = authClient.useSession();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                }
            }
        })
    }

    if(isPending || !data?.user) {
        return null;
    }

    if(isMobile) {
        return (
            <Drawer>
                <DrawerTrigger className="rounded-xl p-3 w-full flex items-center justify-between bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-slate-700 dark:to-slate-600 border border-emerald-200/50 dark:border-emerald-700/30 hover:bg-emerald-50/70 dark:hover:bg-slate-600/80 transition-all duration-200 overflow-hidden gap-x-3">
                    {data.user.image ? (
                    <Avatar className="border-2 border-emerald-200/50 dark:border-emerald-700/30">
                        <AvatarImage src={data.user.image} />
                    </Avatar>
                ) : <GeneratedAvatar 
                    seed={data.user.name}
                    variant="botttsNeutral"
                    className="size-10 border-2 border-emerald-200/50 dark:border-emerald-700/30"
                    />}
                    <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                        <p className="text-sm font-medium truncate w-full text-slate-800 dark:text-slate-200">{data.user.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate w-full">{data.user.email}</p>
                    </div>
                    <ChevronDownIcon className="size-4 shrink-0 text-slate-500" />
                </DrawerTrigger>
                <DrawerContent className="p-4">
                    <DrawerHeader className="text-center pb-4">
                        <div className="mx-auto mb-3">
                            {data.user.image ? (
                                <Avatar className="size-16 border-2 border-emerald-200/50 dark:border-emerald-700/30 mx-auto">
                                    <AvatarImage src={data.user.image} />
                                </Avatar>
                            ) : <GeneratedAvatar 
                                seed={data.user.name}
                                variant="botttsNeutral"
                                className="size-16 border-2 border-emerald-200/50 dark:border-emerald-700/30 mx-auto"
                                />}
                        </div>
                        <DrawerTitle className="text-slate-800 dark:text-slate-200">{data.user.name}</DrawerTitle>
                        <DrawerTitle className="text-sm font-normal text-slate-600 dark:text-slate-400">{data.user.email}</DrawerTitle>
                    </DrawerHeader>
                    <DrawerFooter className="gap-3">
                        <Button
                        variant="outline"
                        onClick={() => authClient.customer.portal()}
                        className="gap-2 border-emerald-200/50 dark:border-emerald-700/30 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20"
                        >
                            <CreditCardIcon className="size-4 text-emerald-600 dark:text-emerald-400"/>
                            Billing
                        </Button>
                        <Button
                        variant="outline"
                        onClick={onLogout}
                        className="gap-2 border-rose-200/50 dark:border-rose-700/30 hover:bg-rose-50/50 dark:hover:bg-rose-900/20 text-rose-600 dark:text-rose-400"
                        >
                            <LogOutIcon className="size-4"/>
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-xl p-3 w-full flex items-center justify-between bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-slate-700 dark:to-slate-600 border border-emerald-200/50 dark:border-emerald-700/30 hover:bg-emerald-50/70 dark:hover:bg-slate-600/80 transition-all duration-200 overflow-hidden gap-x-3 group">
                {data.user.image ? (
                    <Avatar className="border-2 border-emerald-200/50 dark:border-emerald-700/30 group-hover:border-emerald-300/50 dark:group-hover:border-emerald-600/50 transition-colors">
                        <AvatarImage src={data.user.image} />
                    </Avatar>
                ) : <GeneratedAvatar 
                    seed={data.user.name}
                    variant="botttsNeutral"
                    className="size-10 border-2 border-emerald-200/50 dark:border-emerald-700/30 group-hover:border-emerald-300/50 dark:group-hover:border-emerald-600/50 transition-colors"
                    />}
                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm font-medium truncate w-full text-slate-800 dark:text-slate-200">{data.user.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate w-full">{data.user.email}</p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0 text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72 p-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <DropdownMenuLabel className="p-3">
                    <div className="flex items-center gap-3">
                        {data.user.image ? (
                            <Avatar className="border-2 border-emerald-200/50 dark:border-emerald-700/30">
                                <AvatarImage src={data.user.image} />
                            </Avatar>
                        ) : <GeneratedAvatar 
                            seed={data.user.name}
                            variant="botttsNeutral"
                            className="size-10 border-2 border-emerald-200/50 dark:border-emerald-700/30"
                            />}
                        <div className="flex flex-col gap-0.5 overflow-hidden flex-1 min-w-0">
                            <span className="font-medium text-slate-800 dark:text-slate-200 truncate">{data.user.name}</span>
                            <span className="text-sm text-slate-600 dark:text-slate-400 truncate">{data.user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-200/50 dark:bg-slate-700/50" />
                <DropdownMenuItem
                onClick={() => authClient.customer.portal()}
                className="cursor-pointer flex items-center justify-between p-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                    <span>Billing</span>
                    <CreditCardIcon className="size-4"/>
                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={onLogout}
                className="cursor-pointer flex items-center justify-between p-3 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition-colors"
                >
                    <span>Logout</span>
                    <LogOutIcon className="size-4"/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}