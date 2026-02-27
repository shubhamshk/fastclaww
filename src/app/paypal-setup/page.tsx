'use client';
import { useState } from 'react';

export default function PayPalSetupPage() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [env, setEnv] = useState<'live' | 'sandbox'>('live');

    const runSetup = async () => {
        setLoading(true);
        setStatus(null);
        try {
            const res = await fetch('/api/paypal/setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ environment: env, price: "49.00" })
            });
            const data = await res.json();
            setStatus({ status: res.status, data });
        } catch (e: any) {
            setStatus({ status: 'error', data: { error: e.message } });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center pt-32">
            <div className="max-w-2xl w-full bg-zinc-900 border border-white/10 p-8 rounded-2xl">
                <h1 className="text-3xl font-bold mb-4 font-heading text-emerald-400">PayPal Setup Wizard</h1>
                <p className="text-zinc-400 mb-8">
                    Since PayPal requires a unique Product and Billing Plan for each environment, you need to generate a Live Plan ID for production. This tool will securely call the API we created and generate your ID.
                </p>

                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2 text-zinc-300">Target Environment</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="env"
                                value="live"
                                checked={env === 'live'}
                                onChange={(e) => setEnv(e.target.value as any)}
                            /> Live (Production)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="env"
                                value="sandbox"
                                checked={env === 'sandbox'}
                                onChange={(e) => setEnv(e.target.value as any)}
                            /> Sandbox (Testing)
                        </label>
                    </div>
                </div>

                <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-sm text-orange-200">
                    <p><strong>Note:</strong> Make sure your Environment Variables match!</p>
                    <ul className="list-disc pl-5 mt-2 opacity-80">
                        <li><strong>Live:</strong> <code>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> and <code>PAYPAL_CLIENT_SECRET</code> must be your LIVE keys in Vercel.</li>
                        <li><strong>Sandbox:</strong> They must be your Sandbox keys if testing locally.</li>
                    </ul>
                </div>

                <button
                    onClick={runSetup}
                    disabled={loading}
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                    {loading ? "Generating..." : `Generate ${env.toUpperCase()} Plan ID`}
                </button>

                {status && (
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-2">Result:</h3>
                        <div className={`p-4 rounded-xl border ${status.status === 200 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(status.data, null, 2)}</pre>
                        </div>

                        {status.data?.planId && (
                            <div className="mt-6 p-6 space-y-4 bg-zinc-800 rounded-xl border border-dashed border-zinc-600">
                                <h4 className="text-white font-bold text-lg">✅ Action Required:</h4>
                                <p className="text-zinc-300">Copy the ID below and add it to your environment variables (Vercel / .env.local).</p>
                                <div className="bg-black p-3 rounded font-mono text-emerald-400 border border-emerald-500/20 select-all">
                                    NEXT_PUBLIC_PAYPAL_PLAN_ID_LIVE={status.data.planId}
                                </div>
                                <p className="text-xs text-zinc-500">Also set NEXT_PUBLIC_PAYPAL_ENVIRONMENT=live on Vercel so the frontend knows to use Live.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
