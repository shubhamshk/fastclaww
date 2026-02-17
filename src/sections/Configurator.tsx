
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const models = ['Minimax 2.5', 'Claude 3.5', 'GPT-4o', 'Gemini 1.5'];
const channels = ['Telegram', 'Discord', 'Web Widget', 'Slack'];

export function Configurator() {
    const [selectedModel, setSelectedModel] = useState('Claude 3.5');
    const [selectedChannel, setSelectedChannel] = useState('Telegram');

    return (
        <section className="py-24 relative bg-black overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black" />

            <div className="container px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    <div className="lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500 mb-6 font-heading leading-tight"
                        >
                            Configure in seconds
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed max-w-lg"
                        >
                            Select your preferred foundation model and deployment channel. We handle the API connections, context management, and rate limiting.
                        </motion.p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-zinc-500">
                                <div className="w-8 h-[1px] bg-zinc-800" />
                                <span className="text-sm font-medium uppercase tracking-wider">Supported Providers</span>
                            </div>
                            <div className="flex flex-wrap gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Placeholder logos - simple text for now or could be icons */}
                                <span className="text-lg font-bold text-white">OpenAI</span>
                                <span className="text-lg font-bold text-white">Anthropic</span>
                                <span className="text-lg font-bold text-white">Google</span>
                                <span className="text-lg font-bold text-white">Minimax</span>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 w-full"
                    >
                        <Card className="p-1 border-white/10 bg-zinc-900/30 backdrop-blur-3xl relative overflow-hidden rounded-3xl ring-1 ring-white/10">
                            <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px]" />
                            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />

                            <div className="relative z-10 bg-black/40 rounded-[1.4rem] p-8 space-y-8 h-full border border-white/5">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4 block">
                                        Foundation Model
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {models.map((model) => (
                                            <button
                                                key={model}
                                                onClick={() => setSelectedModel(model)}
                                                className={cn(
                                                    "px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 border text-left flex items-center justify-between group",
                                                    selectedModel === model
                                                        ? "bg-indigo-500/10 border-indigo-500/50 text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]"
                                                        : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                                )}
                                            >
                                                {model}
                                                {selectedModel === model && (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                        <Check className="w-4 h-4 text-indigo-400" />
                                                    </motion.div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4 block">
                                        Deployment Channel
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {channels.map((channel) => (
                                            <button
                                                key={channel}
                                                onClick={() => setSelectedChannel(channel)}
                                                className={cn(
                                                    "px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 border text-left flex items-center justify-between",
                                                    selectedChannel === channel
                                                        ? "bg-indigo-500/10 border-indigo-500/50 text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]"
                                                        : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                                )}
                                            >
                                                {channel}
                                                {selectedChannel === channel && (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                        <Check className="w-4 h-4 text-indigo-400" />
                                                    </motion.div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-4 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98]">
                                        <span className="font-heading text-lg">Deploy {selectedModel}</span>
                                    </button>
                                    <p className="text-center text-xs text-zinc-600 mt-4">Average deployment time: &lt; 30 seconds</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
