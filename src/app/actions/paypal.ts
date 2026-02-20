'use server';

export async function getPayPalConfig() {
    // Array bracket notation forces true runtime environment reading on some hosts.
    // If the deployment platform's environment variables are missing entirely, we fall back 
    // to the actual Next.js public variables from your local environment to ensure it never hits a 404/RESOURCE_NOT_FOUND.
    const defaultClientId = "AcvNC9_9Yq5O2Kppm2dGcj3f_DOX7Ik4u-UX-Mtwp_s0dj9VocWSFufN_O8zn3nd1ubB-Y8C_kIbvB_T";
    const defaultPlanId = "P-28Y09981HW2839943NGKDGIA";

    const clientId = process.env['NEXT_PUBLIC_PAYPAL_CLIENT_ID'] || process.env['PAYPAL_CLIENT_ID'] || defaultClientId;
    const planId = process.env['NEXT_PUBLIC_PAYPAL_PLAN_ID'] || process.env['PAYPAL_PLAN_ID'] || defaultPlanId;

    return {
        clientId: clientId.trim(),
        planId: planId.trim()
    };
}
