'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from 'react';

interface PayPalPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: string;
    description: string;
}

export function PayPalPaymentModal({ isOpen, onClose, amount, description }: PayPalPaymentModalProps) {
    const [success, setSuccess] = useState(false);

    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
        intent: "capture",
    };

    const handleApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            setSuccess(true);
            // Here you would typically call your backend to verify and fulfill the order
            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 3000);
        });
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
                                Complete Purchase
                            </h2>
                            <p className="text-xs text-zinc-400 mt-1">
                                Secure payment via PayPal
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {success ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">Payment Successful!</h3>
                                    <p className="text-zinc-400 text-sm">
                                        Thank you for your purchase. Your pack is simpler activated.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {/* Order Summary */}
                                    <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-medium text-white">{description}</h3>
                                                <p className="text-xs text-zinc-500">Premium Access Pack</p>
                                            </div>
                                            <span className="text-lg font-bold text-white">${amount}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-2 pt-2 border-t border-white/5">
                                            <Lock className="w-3 h-3" />
                                            <span>Start instantly after payment</span>
                                        </div>
                                    </div>

                                    {/* PayPal Button */}
                                    <div className="relative z-0">
                                        <PayPalScriptProvider options={initialOptions}>
                                            <PayPalButtons
                                                style={{
                                                    layout: "vertical",
                                                    color: "gold",
                                                    shape: "rect",
                                                    label: "pay",
                                                    height: 48
                                                }}
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: amount,
                                                                    currency_code: "USD"
                                                                },
                                                                description: description
                                                            },
                                                        ],
                                                        intent: "CAPTURE"
                                                    });
                                                }}
                                                onApprove={handleApprove}
                                            />
                                        </PayPalScriptProvider>
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
