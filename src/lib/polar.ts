// polar.ts
import { Polar } from "@polar-sh/sdk";

export const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: "sandbox",
});

// Add proper types for the helper function
interface PolarCustomerParams {
    externalId: string;
    email: string;
    name?: string;
}

// Helper function to handle customer creation/retrieval
export const getOrCreatePolarCustomer = async ({ externalId, email, name }: PolarCustomerParams) => {
    try {
        // First try to get existing customer by external ID
        const existingCustomer = await polarClient.customers.getStateExternal({
            externalId,
        });
        
        return existingCustomer;
    } catch (error: any) {
        // If customer doesn't exist (404), create a new one
        if (error.status === 404) {
            return await polarClient.customers.create({
                externalId,
                email,
                name: name || email.split('@')[0],
            });
        }
        throw error;
    }
};