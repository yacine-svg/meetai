import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal } from "@polar-sh/better-auth";;

import { db } from "../db"; // your drizzle instance
import * as schema from "../db/schema"; // your schema file

import { polarClient } from "./polar";

export const auth = betterAuth({
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            hooks: {
                beforeCreateCustomer: async (ctx: any) => {
                    try {
                        // First try to get existing customer by external ID
                        const existingCustomer = await polarClient.customers.getStateExternal({
                            externalId: ctx.externalId,
                        });
                        
                        // If customer exists, skip creation to avoid external_id conflict
                        return {
                            ...ctx,
                            skipCreation: true,
                            customer: existingCustomer,
                        };
                    } catch (error: any) {
                        // If customer doesn't exist (404), allow creation to proceed
                        if (error.status === 404) {
                            return ctx;
                        }
                        
                        console.error("Polar customer check error:", error);
                        // Continue with creation attempt for other errors
                        return ctx;
                    }
                }
            },
            use: [
                checkout({
                    authenticatedUsersOnly: true,
                    successUrl: "/upgrade",
                }),
                portal(),
            ]
        }),
    ],
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
    },
    emailAndPassword: {
    enabled: true, 
    },
     database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
        ...schema,
    },
    }),
});

