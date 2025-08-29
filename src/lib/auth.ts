import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db"; // your drizzle instance
import * as schema from "../db/schema"; // your schema file

export const auth = betterAuth({
    trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    ...(process.env.NODE_ENV !== "production" && process.env.NGROK_URL ? [process.env.NGROK_URL] : []),
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

