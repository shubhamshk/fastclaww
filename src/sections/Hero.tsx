'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Send, Phone, MessageCircle, Gamepad2, LogOut } from 'lucide-react';
import { TelegramConnectModal } from '@/components/TelegramConnectModal';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { PayPalPaymentModal } from '@/components/PayPalPaymentModal';

const models = [
    { id: 'opus-4-6', name: 'Claude Opus 4.6', provider: 'Anthropic', icon: '☀', color: 'text-orange-500', popular: true },
    { id: 'opus-4-5', name: 'Claude Opus 4.5', provider: 'Anthropic', icon: '☀', color: 'text-orange-400' },
    { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', icon: '⌘', color: 'text-green-500' },
    { id: 'gemini', name: 'Gemini 2.0', provider: 'Google', icon: '✦', color: 'text-blue-500' },
];

const integrations = [
    { id: 'telegram', name: 'Telegram', icon: Send, color: 'text-blue-400', available: true },
    { id: 'discord', name: 'Discord', icon: Gamepad2, color: 'text-indigo-400', available: false },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'text-green-400', available: false },
];

export function Hero() {
    const [selectedModel, setSelectedModel] = useState('opus-4-6');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState('telegram');
    const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);

    // Auth State
    const [user, setUser] = useState<User | null>(null);
    const [isTelegramConnected, setIsTelegramConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleChannelSelect = (channelId: string) => {
        if (channelId === 'telegram') {
            setSelectedChannel(channelId);
            setIsTelegramModalOpen(true);
        }
    };

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/`,
            },
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsTelegramConnected(false);
    };

    const handleTelegramConnect = async (token?: string) => {
        setIsTelegramConnected(true);
        setIsTelegramModalOpen(false);

        if (token && user) {
            // Save Telegram Bot Token to Supabase
            try {
                const { error } = await supabase
                    .from('instances')
                    .insert({
                        user_id: user.id,
                        telegram_bot_token: token,
                        status: 'active', // Mark as active immediately for now
                        model_provider: 'gpt-4o'
                    });

                if (error) {
                    console.error("Failed to save bot token:", error);
                } else {
                    console.log("Bot token saved successfully.");
                }
            } catch (err) {
                console.error("Error saving bot token:", err);
            }
        }
    };

    return (
        <section className="relative min-h-[100dvh] lg:min-h-screen flex items-center justify-center pt-20 pb-12 lg:pt-24 lg:pb-16 overflow-hidden bg-black text-white">
            <TelegramConnectModal
                isOpen={isTelegramModalOpen}
                onClose={() => setIsTelegramModalOpen(false)}
                onConnect={() => setIsTelegramConnected(true)}
            />

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] lg:bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-primary/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />

            <div className="container px-6 relative z-10 w-full h-full flex flex-col justify-center">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Side: Content */}
                    <motion.div
                        className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left lg:-mt-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 mb-8 backdrop-blur-md shadow-lg shadow-emerald-500/10 hover:bg-white/10 transition-colors cursor-default"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="tracking-wide">Powered by <span className="text-white font-semibold">FastClaww</span></span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.05] font-heading">
                            The Easiest & <br className="hidden lg:block" /> Cheapest way to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-text-gradient">
                                run FastClaww
                            </span>
                        </h1>

                        <p className="text-base text-zinc-400 max-w-xl mb-8 leading-relaxed">
                            Deploy your own fully managed FastClaww instance in seconds.
                            Automate tasks, manage emails, and more directly from WhatsApp or Telegram.
                        </p>

                        <div className="mb-8 p-0.5 rounded-xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30">
                            <div className="px-5 py-3 rounded-[10px] bg-black/80 backdrop-blur-xl flex items-center gap-3">
                                <span className="text-xl">⚡</span>
                                <p className="text-sm font-medium text-indigo-100">
                                    <span className="text-indigo-300 font-bold">50% cheaper setup</span> & full pricing than any other OpenClaw setups.
                                </p>
                            </div>
                        </div>


                        {/* Premium Pack button removed */}

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-white/5 pt-8 w-full max-w-2xl">
                            {[
                                { val: "1 min", label: "to setup" },
                                { val: "24/7", label: "available" },
                                { val: "$49", label: "/month" },
                                { val: "48h", label: "free trial", color: "text-emerald-400" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className={cn("text-xl lg:text-2xl font-semibold text-white font-heading", stat.color)}>{stat.val}</div>
                                    <div className="text-sm text-zinc-500 mt-1 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Configurator Card */}
                    <motion.div
                        className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-8 lg:mt-0"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="relative w-full max-w-[440px] mx-auto">
                            {/* Floating Offer Popup - Adjusted positioning */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="absolute -top-[4.5rem] lg:top-0 left-1/2 -translate-x-1/2 lg:left-auto lg:right-[105%] lg:translate-x-0 lg:translate-y-0 z-30 w-[90%] lg:w-full max-w-[320px]"
                            >
                                <div className="relative group perspective-1000">
                                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3 lg:p-4 shadow-xl flex items-center gap-3 lg:gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-sm lg:text-lg shadow-lg shadow-emerald-500/30 animate-pulse flex-shrink-0">
                                            🎁
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-emerald-400 text-[10px] lg:text-xs font-bold tracking-wider mb-0.5 uppercase whitespace-nowrap">Launch Offer • <span className="text-white animate-pulse">10 Left</span></p>
                                            <p className="text-white text-[10px] lg:text-xs font-medium leading-snug truncate">
                                                Get <span className="text-orange-300 font-bold">$20 AI credit free</span> with each purchase
                                            </p>
                                        </div>

                                        {/* Pointing Arrow */}
                                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-8 lg:left-auto lg:-right-1.5 w-3 h-3 bg-zinc-900 border-r border-b lg:border-b-0 lg:border-t border-emerald-500/30 transform rotate-45"></div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="w-full bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-5 lg:p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
                                {/* Decorative gradients */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[60px]" />
                                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px]" />

                                {/* Step 1: Model */}
                                <div className="mb-6 relative z-10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">1</div>
                                        <h3 className="text-sm font-semibold text-zinc-200">Choose your AI model</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        {models.map((model: any) => (
                                            <button
                                                key={model.id}
                                                onClick={() => setSelectedModel(model.id)}
                                                className={cn(
                                                    "relative flex flex-col items-start p-3 rounded-xl border transition-all duration-200",
                                                    selectedModel === model.id
                                                        ? "bg-white/10 border-primary/50 text-white shadow-[0_0_15px_-5px_var(--color-primary)]"
                                                        : "bg-black/20 text-zinc-400 border-white/5 hover:bg-white/5 hover:border-white/10"
                                                )}
                                            >
                                                <div className="flex items-center justify-between w-full mb-2">
                                                    <span className={cn("text-lg", model.color)}>{model.icon}</span>
                                                    {selectedModel === model.id && (
                                                        <Check className="w-3.5 h-3.5 text-primary" />
                                                    )}
                                                </div>
                                                <span className="text-xs font-bold font-heading">{model.name}</span>
                                                <span className="text-[10px] opacity-60">{model.provider}</span>
                                                {model.popular && (
                                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-lg animate-bounce">
                                                        POPULAR
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Step 2: Integrations */}
                                <div className="mb-6 relative z-10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">2</div>
                                        <h3 className="text-sm font-semibold text-zinc-200">Which channel do you want to use?</h3>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        {integrations.map(app => (
                                            <button
                                                key={app.id}
                                                disabled={!app.available}
                                                onClick={() => handleChannelSelect(app.id)}
                                                className={cn(
                                                    "relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 min-h-[90px]",
                                                    selectedChannel === app.id
                                                        ? "bg-white/10 border-primary/50 text-white shadow-[0_0_15px_-5px_var(--color-primary)]"
                                                        : app.available
                                                            ? "bg-black/20 border-white/5 text-zinc-400 hover:bg-white/5 hover:border-white/10"
                                                            : "bg-black/10 border-white/5 text-zinc-600 opacity-60 cursor-not-allowed"
                                                )}
                                            >
                                                <app.icon className={cn("w-6 h-6 mb-2", app.available ? app.color : "text-zinc-600")} />
                                                <span className="text-[10px] font-bold font-heading">{app.name}</span>
                                                {!app.available && (
                                                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-zinc-700 rounded-full" title="Coming Soon" />
                                                )}
                                                {selectedChannel === app.id && (
                                                    <div className="absolute top-2 right-2">
                                                        <Check className="w-3 h-3 text-primary" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Step 3: Login */}
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold border border-primary/20">3</div>
                                        <h3 className="text-sm font-semibold text-zinc-200">Create your account</h3>
                                    </div>

                                    {!user ? (
                                        <>
                                            <button
                                                onClick={handleLogin}
                                                className="w-full bg-white hover:bg-zinc-100 text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                                                <span className="font-heading">Sign in with Google</span>
                                            </button>
                                            <p className="text-center text-[10px] text-zinc-500 mt-4">
                                                Sign in to deploy your AI assistant and connect your channels.
                                            </p>
                                        </>
                                    ) : (
                                        <div className="space-y-6">
                                            {/* User Profile */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    {user.user_metadata?.avatar_url || user.user_metadata?.picture ? (
                                                        <img
                                                            src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                                                            alt="Profile"
                                                            className="w-10 h-10 rounded-full border border-emerald-500/20 object-cover"
                                                            referrerPolicy="no-referrer"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold border border-emerald-500/20 uppercase">
                                                            {user.email?.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-white font-medium text-sm flex items-center gap-2">
                                                            {user.user_metadata?.full_name || 'User'} <span className="text-zinc-600 text-xs px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800">Free Plan</span>
                                                        </div>
                                                        <div className="text-zinc-500 text-xs truncate max-w-[150px]">{user.email}</div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                    title="Sign out"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Deploy Button */}
                                            <div>
                                                <button
                                                    disabled={!isTelegramConnected}
                                                    onClick={() => setIsPaymentModalOpen(true)}
                                                    className={cn(
                                                        "w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all",
                                                        isTelegramConnected
                                                            ? "bg-emerald-700 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-700/25 hover:scale-[1.02] active:scale-[0.98]"
                                                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                                    )}
                                                >
                                                    <span className="text-lg">⚡</span>
                                                    <span className="font-heading">Deploy FastClaww</span>
                                                </button>

                                                {!isTelegramConnected && (
                                                    <p className="text-center text-xs text-white mt-3 font-medium">
                                                        Connect Telegram to continue. <span className="text-indigo-400">Limited cloud servers — only 11 left</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Use of Empty Fragment to effectively remove the element while keeping syntax valid if surrounding elements need it, or just empty if it stands alone. In this case, simply removing content. */}
                                </div>
                            </div>

                            {/* Payment Modal inserted here to be part of the flow */}
                            <PayPalPaymentModal
                                isOpen={isPaymentModalOpen}
                                onClose={() => setIsPaymentModalOpen(false)}
                                amount="49.00"
                                description="Premium API Access Subscription"
                                isSubscription={true}
                                planId={process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID}
                            />
                        </div>
                    </motion.div>

                </div>
            </div >
        </section >
    );
}
