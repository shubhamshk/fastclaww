'use client';

import { motion } from 'framer-motion';

export function Comparison() {
    return (
        <section className="py-24 bg-black relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container px-6 relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading"
                    >
                        Traditional Method vs <span className="text-zinc-400">FastClaww</span>
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Traditional Way */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h3 className="text-xl font-bold font-heading text-zinc-400 italic">Traditional</h3>

                        <div className="space-y-4 text-zinc-500">
                            {[
                                { task: "Purchasing local virtual machine", time: "15 min" },
                                { task: "Creating SSH keys and storing securely", time: "10 min" },
                                { task: "Connecting to the server via SSH", time: "5 min" },
                                { task: "Installing Node.js and NPM", time: "5 min" },
                                { task: "Installing OpenClaw", time: "7 min" },
                                { task: "Setting up OpenClaw", time: "10 min" },
                                { task: "Connecting to AI provider", time: "4 min" },
                                { task: "Pairing with Telegram", time: "4 min" }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-sm md:text-base border-b border-zinc-900 pb-2 last:border-0">
                                    <span>{item.task}</span>
                                    <span className="font-mono text-zinc-600">{item.time}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-zinc-800 pt-6 flex justify-between items-center">
                            <span className="text-white font-bold text-lg">Total</span>
                            <span className="text-white font-bold text-lg font-mono">60 min</span>
                        </div>

                        <p className="text-zinc-500 text-sm italic mt-4">
                            If you're <span className="text-red-500">non-technical</span>, multiply these <span className="text-red-500">times by 10</span> — you have to learn each step before doing.
                        </p>
                    </motion.div>

                    {/* FastClaww Way */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Vertical Divider for Desktop */}
                        <div className="hidden md:block absolute -left-12 top-0 bottom-0 w-px bg-zinc-800" />

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold font-heading text-white italic">FastClaww</h3>

                            <div className="text-7xl font-bold text-white tracking-tighter">
                                &lt; 1 min
                            </div>

                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Pick a model, connect Telegram, deploy — done under 1 minute.
                            </p>

                            <p className="text-zinc-500 leading-relaxed">
                                Servers, SSH and OpenClaw Environment are already set up, waiting to get assigned. Simple, secure and fast connection to your bot.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
