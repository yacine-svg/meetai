"use client";

import { authClient } from "@/lib/auth-client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    } from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: "/",
        },
        {
            onSuccess: () => {
                setPending(false);
                router.push("/");
            },
            onError: ({ error }) => {
                setPending(false);
                setError(error.message)
            },
        }
    )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
            <div className="w-full max-w-4xl">
                <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 lg:p-12">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center space-y-2">
                                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                            Welcome back
                                        </h1>
                                        <p className="text-muted-foreground text-balance text-lg">
                                            Login to your account
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-5">
                                        <FormField 
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                    type="email"
                                                    placeholder="example@mail.com"
                                                    className="h-12 px-4 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:border-emerald-500 focus:ring-0 transition-colors duration-200 bg-white/50 dark:bg-slate-700/50"
                                                    {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />

                                        <FormField 
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input 
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        className="h-12 px-4 pr-12 border-2 border-slate-200 dark:border-slate-600 rounded-lg focus:border-emerald-500 focus:ring-0 transition-colors duration-200 bg-white/50 dark:bg-slate-700/50"
                                                        {...field}
                                                        />
                                                        <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                                                        >
                                                            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    </div>

                                    { !!error && (
                                        <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 animate-in slide-in-from-top-2 duration-300">
                                            <OctagonAlertIcon className="h-4 w-4 !text-red-600 dark:!text-red-400" />
                                            <AlertTitle className="text-red-800 dark:text-red-200">{error}</AlertTitle>
                                        </Alert>
                                    )}

                                    <Button 
                                    disabled={pending}
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {pending ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Signing in...
                                            </div>
                                        ) : (
                                            "Sign in"
                                        )}
                                    </Button>

                                    <div className="relative flex items-center justify-center">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-slate-200 dark:border-slate-600"></div>
                                        </div>
                                        <div className="relative bg-white dark:bg-slate-800 px-4">
                                            <span className="text-sm text-slate-500 dark:text-slate-400">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                        disabled={pending}
                                        onClick={() => authClient.signIn.social({
                                            provider: "google",
                                            callbackURL: "/"
                                        })}
                                        variant="outline"
                                        type="button"
                                        className="h-12 border-2 border-slate-200 dark:border-slate-600 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-105"
                                        >
                                            <FaGoogle className="text-red-500" />
                                            <span className="ml-2">Google</span>
                                        </Button>
                                        <Button
                                        disabled={pending}
                                        onClick={() => authClient.signIn.social({
                                            provider: "github",
                                            callbackURL: "/"
                                        })}
                                        variant="outline"
                                        type="button"
                                        className="h-12 border-2 border-slate-200 dark:border-slate-600 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-all duration-200 hover:scale-105"
                                        >
                                            <FaGithub className="text-gray-700 dark:text-gray-300" />
                                            <span className="ml-2">GitHub</span>
                                        </Button>
                                    </div>

                                    <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                                        Don&apos;t have an account?{" "} 
                                        <Link href="/sign-up" className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 underline underline-offset-4 font-medium transition-colors">
                                            Sign up
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </Form>
                        
                        <div className="relative hidden md:flex flex-col gap-y-6 items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 text-white overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
                            
                            <div className="relative z-10 flex flex-col items-center gap-6">
                                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                                    <Image
                                    src="/logo.svg"
                                    alt="Meet.AI Logo"
                                    width={92}
                                    height={92}
                                    className="drop-shadow-lg"
                                    />
                                </div>
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold mb-2">Meet.AI</h2>
                                    <p className="text-lg text-white/80 max-w-xs">
                                        Welcome back to your productivity hub
                                    </p>
                                </div>
                            </div>
                            
                            {/* Floating elements */}
                            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                            <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
                        </div>
                    </CardContent>
                </Card>
                
                <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 underline underline-offset-4 transition-colors">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 underline underline-offset-4 transition-colors">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </div>
    )
}