'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getPayPalConfig } from '@/app/actions/paypal';

interface PayPalPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: string;
    description: string;
    isSubscription?: boolean; // New prop for recurring payments
    planId?: string;          // Required for subscriptions
}

export function PayPalPaymentModal({
    isOpen,
    onClose,
    amount,
    description,
    isSubscription = false,
    planId
}: PayPalPaymentModalProps) {
    const [success, setSuccess] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [fetchedClientId, setFetchedClientId] = useState("");
    const [fetchedPlanId, setFetchedPlanId] = useState("");
    const [env, setEnv] = useState("sandbox");
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setIsLoadingConfig(true);
            getPayPalConfig().then(config => {
                setFetchedClientId(config.clientId);
                setFetchedPlanId(config.planId);
                if (config.environment) setEnv(config.environment);
                console.log(`[PayPal] Configuration loaded. Environment: ${config.environment}, PlanID: ${config.planId}, ClientID prefix: ${config.clientId.substring(0, 5)}...`);
                setIsLoadingConfig(false);
            }).catch((err) => {
                console.error("[PayPal] Config load error:", err);
                setIsLoadingConfig(false);
            });
        }
    }, [isOpen]);

    const actualClientId = fetchedClientId || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";
    const actualPlanId = fetchedPlanId || planId;

    const initialOptions = {
        clientId: actualClientId,
        currency: "USD",
        intent: isSubscription ? "subscription" : "capture",
        vault: isSubscription,
    };

    const saveTransaction = async (id: string, details: any) => {
        try {
            // 1. Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                console.error("No authenticated user found for transaction storage.");
                alert("Payment successful but not logged: User not logged in.");
                setSuccess(true);
                return;
            }

            // 2. Insert Transaction
            const { error: txError } = await supabase
                .from('transactions')
                .insert({
                    user_id: user.id,
                    paypal_transaction_id: id,
                    amount: amount,
                    status: 'completed',
                    package_type: description.toLowerCase().includes('premium') ? 'premium_pack' : 'basic_pack',
                    metadata: details || { type: 'subscription', planId }
                });

            if (txError) {
                throw new Error(`Transaction storage failed: ${txError.message}`);
            }

            // 3. Update User Profile (Add credits or update plan)
            if (description.includes("Premium") || amount === "49") {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({
                        plan_type: 'pro',
                    })
                    .eq('id', user.id);

                if (profileError) console.error("Profile update error:", profileError);
            }

            console.log("Transaction stored and profile updated successfully in Supabase.");
            setSuccess(true);

        } catch (err: any) {
            console.error("Backend Sync Error:", err);
            alert(`Payment successful but backend sync failed: ${err.message}`);
            setSuccess(true);
        }
    };

    const handleApprove = async (data: any, actions: any) => {
        if (isSubscription) {
            // Handle Subscription
            const subscriptionId = data.subscriptionID;
            console.log("PayPal Subscription Created:", subscriptionId);
            setTransactionId(subscriptionId);
            await saveTransaction(subscriptionId, { type: 'subscription', subscriptionId, planId: actualPlanId });
        } else {
            // Handle One-Time Payment
            return actions.order.capture().then(async (details: any) => {
                console.log("PayPal Transaction Captured:", details);
                if (details.id) setTransactionId(details.id);
                await saveTransaction(details.id, details);
            }).catch((err: any) => {
                console.error("PayPal Capture Error:", err);
                alert("Payment capture failed. Check console for details.");
            });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-50 w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        {/* Header */}
                        <div className="relative p-6 border-b border-white/5 bg-zinc-900/50">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-white/5"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-semibold text-white font-heading pr-8">
                                {isSubscription ? "Subscribe" : "Complete Purchase"}
                            </h2>
                            <p className="text-xs text-zinc-400 mt-1">
                                Secure payment via PayPal
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {success ? (
                                <div className="flex flex-col items-center justify-center py-6 text-center">
                                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Successfully {isSubscription ? "Subscribed" : "Acquired"}!</h3>
                                    {transactionId && (
                                        <div className="mb-4 px-3 py-1 bg-white/5 rounded border border-white/10 inline-block">
                                            <p className="text-zinc-500 font-mono text-[10px]">{isSubscription ? "Sub" : "Tx"} ID: {transactionId}</p>
                                        </div>
                                    )}
                                    <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto mb-8">
                                        Your FastClaww setup will be ready within a few minutes and will be sent to you through the email.
                                    </p>
                                    <button
                                        onClick={() => {
                                            onClose();
                                            setSuccess(false);
                                        }}
                                        className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-zinc-200 transition-all font-heading"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : paymentError ? (
                                <div className="flex flex-col items-center justify-center py-6 text-center">
                                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                                        <X className="w-10 h-10 text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">Payment Setup Error</h3>
                                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-left text-sm mb-6">
                                        <p className="text-red-400 font-mono text-[11px] whitespace-pre-wrap">{paymentError}</p>
                                    </div>
                                    <button
                                        onClick={() => setPaymentError(null)}
                                        className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-zinc-200 transition-all font-heading"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Test Mode / Missing Plan Warning */}
                                    {((initialOptions.clientId === "test") || (isSubscription && !actualPlanId)) && (
                                        <div className="mb-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-start gap-3">
                                            <div className="p-1 rounded bg-orange-500/20 text-orange-500 mt-0.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-orange-400 font-bold text-xs uppercase tracking-wide mb-1">
                                                    {isSubscription && !actualPlanId ? "Configuration Required" : "Mock Mode Active"}
                                                </h4>
                                                <p className="text-orange-300/80 text-[11px] leading-relaxed">
                                                    {isSubscription && !actualPlanId
                                                        ? "Please set a valid NEXT_PUBLIC_PAYPAL_PLAN_ID in .env.local"
                                                        : <span>Using <code>test</code> Client ID. No real money deducted.</span>}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Order Summary */}
                                    <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-medium text-white">{description}</h3>
                                                <p className="text-xs text-zinc-500">{isSubscription ? "Monthly Subscription" : "Premium Access Pack"}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-bold text-white">${amount}</span>
                                                {isSubscription && <span className="text-xs text-zinc-400 block">/month</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-2 pt-2 border-t border-white/5">
                                            <Lock className="w-3 h-3" />
                                            <span>Start instantly after payment</span>
                                        </div>
                                    </div>

                                    {/* PayPal Button */}
                                    <div className="relative z-0 min-h-[50px] flex items-center justify-center">
                                        {isLoadingConfig ? (
                                            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <div className="w-full">
                                                <PayPalScriptProvider options={initialOptions}>
                                                    <PayPalButtons
                                                        style={{
                                                            layout: "vertical",
                                                            color: "gold",
                                                            shape: "rect",
                                                            label: isSubscription ? "subscribe" : "pay",
                                                            height: 48
                                                        }}
                                                        createOrder={isSubscription ? undefined : (data, actions) => {
                                                            return actions.order.create({
                                                                purchase_units: [{
                                                                    amount: {
                                                                        value: amount,
                                                                        currency_code: "USD"
                                                                    },
                                                                    description: description
                                                                }],
                                                                intent: "CAPTURE"
                                                            });
                                                        }}
                                                        createSubscription={isSubscription ? (data, actions) => {
                                                            return actions.subscription.create({
                                                                plan_id: actualPlanId ?? ""
                                                            });
                                                        } : undefined}
                                                        onApprove={handleApprove}
                                                        onError={(err: any) => {
                                                            console.error("PayPal Error:", err);
                                                            if (err?.message?.includes('RESOURCE_NOT_FOUND')) {
                                                                setPaymentError(`CRITICAL ERROR:\nThe Plan ID [${actualPlanId}] DOES NOT EXIST in the current PayPal environment (Client ID: ${actualClientId.substring(0, 6)}...).\n\nPlease go to /paypal-setup on your website to generate a valid LIVE Plan ID, and add it to your Environment Variables as NEXT_PUBLIC_PAYPAL_PLAN_ID_LIVE!`);
                                                            } else {
                                                                setPaymentError(err?.message || "An unknown PayPal error occurred.");
                                                            }
                                                        }}
                                                    />
                                                </PayPalScriptProvider>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-center text-[10px] text-zinc-600 mt-4">
                                        By continuing, you agree to our Terms of Service.
                                        <br />Transactions are secure and encrypted.
                                    </p>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
