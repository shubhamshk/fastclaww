'use server';

export async function getPayPalConfig() {
    const environment = process.env['NEXT_PUBLIC_PAYPAL_ENVIRONMENT'] || (process.env['NODE_ENV'] === 'production' ? 'live' : 'sandbox');

    // In Live, fall back to default env variables if specific live ones aren't set
    const liveClientId = process.env['NEXT_PUBLIC_PAYPAL_CLIENT_ID_LIVE'] || process.env['NEXT_PUBLIC_PAYPAL_CLIENT_ID'] || "";
    const livePlanId = process.env['NEXT_PUBLIC_PAYPAL_PLAN_ID_LIVE'] || process.env['NEXT_PUBLIC_PAYPAL_PLAN_ID'] || "";

    // In Sandbox, use these defaults if no env vars are available
    const sandboxClientId = process.env['NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX'] || process.env['NEXT_PUBLIC_PAYPAL_CLIENT_ID'] || "AcvNC9_9Yq5O2Kppm2dGcj3f_DOX7Ik4u-UX-Mtwp_s0dj9VocWSFufN_O8zn3nd1ubB-Y8C_kIbvB_T";
    const sandboxPlanId = process.env['NEXT_PUBLIC_PAYPAL_PLAN_ID_SANDBOX'] || process.env['NEXT_PUBLIC_PAYPAL_PLAN_ID'] || "P-28Y09981HW2839943NGKDGIA";

    const isLive = environment === 'live';
    const clientId = isLive ? liveClientId : sandboxClientId;
    const planId = isLive ? livePlanId : sandboxPlanId;

    return {
        clientId: clientId.trim(),
        planId: planId.trim(),
        environment: environment
    };
}
