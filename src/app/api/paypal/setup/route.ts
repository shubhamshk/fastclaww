import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));

        // Use provided environment or default to checking the NEXT_PUBLIC_PAYPAL_ENVIRONMENT
        const environment = body.environment || process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT || 'sandbox';

        // Check for specific environment credentials first, then fallback to default ones
        const clientId = environment === 'live'
            ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_LIVE || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID
            : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID_SANDBOX || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID;

        const clientSecret = environment === 'live'
            ? process.env.PAYPAL_CLIENT_SECRET_LIVE || process.env.PAYPAL_CLIENT_SECRET
            : process.env.PAYPAL_CLIENT_SECRET_SANDBOX || process.env.PAYPAL_CLIENT_SECRET;

        // The price for the plan setup
        const price = body.price || "49.00";

        if (!clientId || !clientSecret) {
            return NextResponse.json({
                error: `Missing PayPal credentials for environment: ${environment}`,
                resolution: "Please add PAYPAL_CLIENT_SECRET and NEXT_PUBLIC_PAYPAL_CLIENT_ID to your environment variables."
            }, { status: 500 });
        }

        const baseUrl = environment === 'live'
            ? 'https://api-m.paypal.com'
            : 'https://api-m.sandbox.paypal.com';

        // 1. Get Access Token
        console.log(`[PayPal Setup] Generating access token for ${environment} environment...`);
        const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials'
        });

        if (!tokenResponse.ok) {
            const err = await tokenResponse.text();
            console.error("[PayPal Setup] Token error:", err);
            return NextResponse.json({ error: "Failed to get access token", details: err }, { status: 500 });
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        console.log(`[PayPal Setup] Access token generated successfully.`);

        // 2. Create Product (If product creation fails or exists, we might need a way to reuse, but for setup script we just create a new one every time to guarantee it exists)
        console.log(`[PayPal Setup] Creating Product...`);
        const productPayload = {
            name: "Premium Subscription",
            description: "Monthly premium access to FastClaww",
            type: "SERVICE",
            category: "SOFTWARE",
        };

        const productResponse = await fetch(`${baseUrl}/v1/catalogs/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'PayPal-Request-Id': `prod_${Date.now()}` // Idempotency key
            },
            body: JSON.stringify(productPayload)
        });

        if (!productResponse.ok) {
            const err = await productResponse.text();
            console.error("[PayPal Setup] Product creation error:", err);
            return NextResponse.json({ error: "Failed to create product", details: err }, { status: 500 });
        }

        const productData = await productResponse.json();
        const productId = productData.id;
        console.log(`[PayPal Setup] Product created with ID: ${productId}`);

        // 3. Create Billing Plan
        console.log(`[PayPal Setup] Creating Billing Plan...`);
        const planPayload = {
            product_id: productId,
            name: `Premium Monthly Plan ($${price})`,
            description: "Monthly billing for FastClaww premium pack.",
            status: "ACTIVE",
            billing_cycles: [
                {
                    frequency: {
                        interval_unit: "MONTH",
                        interval_count: 1
                    },
                    tenure_type: "REGULAR",
                    sequence: 1,
                    total_cycles: 0,
                    pricing_scheme: {
                        fixed_price: {
                            value: price,
                            currency_code: "USD"
                        }
                    }
                }
            ],
            payment_preferences: {
                auto_bill_outstanding: true,
                setup_fee: {
                    value: "0.00",
                    currency_code: "USD"
                },
                setup_fee_failure_action: "CONTINUE",
                payment_failure_threshold: 3
            }
        };

        const planResponse = await fetch(`${baseUrl}/v1/billing/plans`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'PayPal-Request-Id': `plan_${Date.now()}`
            },
            body: JSON.stringify(planPayload)
        });

        if (!planResponse.ok) {
            const err = await planResponse.text();
            console.error("[PayPal Setup] Plan creation error:", err);
            return NextResponse.json({ error: "Failed to create plan", details: err }, { status: 500 });
        }

        const planData = await planResponse.json();
        console.log(`[PayPal Setup] Plan created with ID: ${planData.id}`);

        return NextResponse.json({
            success: true,
            environment,
            productId,
            planId: planData.id,
            message: `Successfully created PayPal product and plan for ${environment} environment. Please update your environment variables.`,
            envVariableInstruction: `Add or update this in your .env / Vercel:
NEXT_PUBLIC_PAYPAL_PLAN_ID_${environment.toUpperCase()}=${planData.id}`
        });

    } catch (error: any) {
        console.error("[PayPal Setup] Unexpected error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
