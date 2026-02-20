'use server';

export async function getPayPalConfig() {
    // Array bracket notation prevents Next.js SWC from statically replacing these variables at build time,
    // thereby forcing it to read the true runtime environment variables on the deployed server.
    const clientId = process.env['NEXT_PUBLIC_PAYPAL_CLIENT_ID'] || process.env['PAYPAL_CLIENT_ID'] || '';
    const planId = process.env['NEXT_PUBLIC_PAYPAL_PLAN_ID'] || process.env['PAYPAL_PLAN_ID'] || '';

    return {
        clientId: clientId.trim(),
        planId: planId.trim()
    };
}
