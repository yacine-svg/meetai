"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { authClient } from "@/lib/auth-client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { PricingCard } from "../components/pricing-card";

export const UpgradeView = () => {
    const trpc = useTRPC();
    const { data: products } = useSuspenseQuery(trpc.premium.getProducts.queryOptions());
    const { data: currentSubscription } = useSuspenseQuery(trpc.premium.getCurrentSubscription.queryOptions());
    
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 flex-1 py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            Current Plan Status
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            You are on the{" "}
                            <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                                {currentSubscription?.name ?? "Free"}
                            </span>{" "}
                            plan
                        </h1>
                        
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Choose the perfect plan for your needs and unlock powerful features to accelerate your growth.
                        </p>
                    </div>

                    {/* Pricing Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
                        {products.map((product, index) => {
                            const isCurrentProduct = currentSubscription?.id === product.id;
                            const isPremium = !!currentSubscription;

                            let buttonText = "Get Started";
                            let onClick = () => authClient.checkout({ products: [product.id] })
                            
                            if(isCurrentProduct) {
                                buttonText = "Manage Subscription";
                                onClick = () => authClient.customer.portal();
                            } else if (isPremium) {
                                buttonText = "Switch Plan";
                                onClick = () => authClient.customer.portal();
                            }

                            return (
                                <div
                                    key={product.id}
                                    className="transform transition-all duration-300 hover:-translate-y-2"
                                    style={{
                                        animationDelay: `${index * 150}ms`,
                                        animation: "fadeInUp 0.8s ease-out forwards"
                                    }}
                                >
                                    <PricingCard 
                                        buttonText={buttonText}
                                        onClick={onClick}
                                        variant={
                                            product.metadata.variant === "highlighted" ? "highlighted" : "default"
                                        }
                                        title={product.name}
                                        price={
                                            product.prices[0].amountType === "fixed"
                                            ? product.prices[0].priceAmount / 100
                                            : 0
                                        }
                                        description={product.description}
                                        priceSuffix={`/${product.prices[0].recurringInterval}`}
                                        features={product.benefits.map(
                                            (benefit) => benefit.description
                                        )}
                                        badge={product.metadata.badge as string | null}
                                        className={isCurrentProduct ? "ring-2 ring-primary ring-offset-2" : ""}
                                    />
                                </div>
                            )
                        })}
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="text-center mt-16 py-12 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200/50">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Need a custom solution?
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Contact our sales team for enterprise pricing and custom features tailored to your organization.
                        </p>
                        <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 border border-gray-200">
                            Contact Sales
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}


export const UpgradeViewLoading = () => {
    return (
        <LoadingState title="Loading" description="This may take a few seconds" />
    )
}

export const UpgradeViewError = () => {
    return <ErrorState title="Error" description="Please try again later"/>
}
