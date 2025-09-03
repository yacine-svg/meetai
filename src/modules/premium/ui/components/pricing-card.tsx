import { CircleCheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const pricingCardVariants = cva(
    "relative rounded-xl p-6 py-8 w-full transition-all duration-300 hover:shadow-xl group overflow-hidden backdrop-blur-sm",
    {
        variants: {
            variant: {
                default: "bg-white/90 text-black border border-gray-200/50 hover:border-primary/30 hover:shadow-lg",
                highlighted: "bg-gradient-to-br from-[#093C23] via-[#0A4428] to-[#051B16] text-white border border-emerald-500/30 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:shadow-2xl",
            }
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const pricingCardIconVariants = cva("size-5 transition-transform duration-200 group-hover:scale-110", {
    variants: {
        variant: {
            default: "fill-primary text-white",
            highlighted: "fill-white text-emerald-900",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

const pricingCardSecondaryTextVariants = cva("transition-colors duration-200", {
    variants: {
        variant: {
            default: "text-neutral-600 group-hover:text-neutral-700",
            highlighted: "text-emerald-100 group-hover:text-white",
        },
    },
})

const pricingCardBadgeVariants = cva("text-xs font-medium px-3 py-1 rounded-full animate-pulse", {
    variants: {
        variant: {
            default: "bg-primary/15 text-primary border border-primary/20",
            highlighted: "bg-gradient-to-r from-orange-400 to-amber-400 text-black shadow-md",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

const pricingCardTitleVariants = cva("font-semibold text-xl transition-colors duration-200", {
    variants: {
        variant: {
            default: "text-gray-900 group-hover:text-primary",
            highlighted: "text-white",
        },
    },
})

const pricingCardPriceVariants = cva("text-4xl font-bold transition-transform duration-200 group-hover:scale-105", {
    variants: {
        variant: {
            default: "text-gray-900",
            highlighted: "text-white",
        },
    },
})

interface Props extends VariantProps<typeof pricingCardVariants> {
    badge?: string | null;
    price: number;
    features: string[];
    title: string;
    description?: string | null;
    priceSuffix: string;
    className?: string;
    buttonText: string;
    onClick: () => void;
}

export const PricingCard = ({
    badge,
    price,
    features,
    title,
    description,
    priceSuffix,
    className,
    buttonText,
    onClick,
    variant
}: Props) => {
    return(
        <div className={cn(pricingCardVariants({ variant }), className)}>
            {/* Decorative background elements */}
            {variant === "highlighted" && (
                <>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl transform -translate-x-12 translate-y-12" />
                </>
            )}
            
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col gap-y-3">
                        <div className="flex items-center gap-x-3">
                            <h6 className={cn(pricingCardTitleVariants({ variant }))}>
                                {title}
                            </h6>
                            {badge && (
                                <Badge className={cn(pricingCardBadgeVariants({ variant }))}>
                                    {badge}
                                </Badge>
                            )}
                        </div>
                        {description && (
                            <p className={cn(
                                "text-sm leading-relaxed",
                                pricingCardSecondaryTextVariants({ variant })
                            )}>
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-end justify-center mb-8">
                    <div className="text-center">
                        <div className="flex items-baseline justify-center gap-x-1">
                            <span className={cn(pricingCardPriceVariants({ variant }))}>
                                {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                }).format(price)}
                            </span>
                            <span className={cn(
                                "text-lg font-medium",
                                pricingCardSecondaryTextVariants({ variant })
                            )}>
                                {priceSuffix}
                            </span>
                        </div>
                    </div>
                </div>

                <Button
                    className={cn(
                        "w-full mb-8 font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]",
                        variant === "highlighted" 
                            ? "bg-white text-emerald-900 hover:bg-emerald-50 shadow-lg hover:shadow-xl" 
                            : "hover:shadow-md"
                    )}
                    size="lg"
                    variant={variant === "highlighted" ? "default" : "outline"}
                    onClick={onClick}
                >
                    {buttonText}
                </Button>

                <div className="space-y-4">
                    <div className="flex items-center gap-x-2">
                        <Separator className={cn(
                            "flex-1 transition-opacity duration-200",
                            variant === "highlighted" ? "opacity-20" : "opacity-30"
                        )} />
                        <p className={cn(
                            "font-semibold text-xs uppercase tracking-wider px-2",
                            pricingCardSecondaryTextVariants({ variant })
                        )}>
                            Features
                        </p>
                        <Separator className={cn(
                            "flex-1 transition-opacity duration-200",
                            variant === "highlighted" ? "opacity-20" : "opacity-30"
                        )} />
                    </div>
                    
                    <ul className="space-y-3">
                        {features.map((feature, index) => (
                            <li 
                                key={index} 
                                className={cn(
                                    "flex items-start gap-x-3 text-sm transition-all duration-200 hover:translate-x-1",
                                    pricingCardSecondaryTextVariants({ variant })
                                )}
                                style={{ 
                                    animationDelay: `${index * 100}ms`,
                                    animation: "fadeInUp 0.6s ease-out forwards"
                                }}
                            >
                                <CircleCheckIcon 
                                    className={cn(
                                        pricingCardIconVariants({ variant }),
                                        "mt-0.5 flex-shrink-0"
                                    )}
                                />
                                <span className="leading-relaxed">{feature}</span>
                            </li>    
                        ))}
                    </ul>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
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