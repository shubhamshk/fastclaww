'use server';

export async function getPayPalConfig() {
    return {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID || '',
        planId: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID || process.env.PAYPAL_PLAN_ID || ''
    };
}
