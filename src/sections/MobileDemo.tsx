'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Shield, Play } from 'lucide-react';
import { useRef, useEffect } from 'react';

export function MobileDemo() {
    return (
        <section className="py-24 relative overflow-hidden bg-black">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[128px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[128px] translate-y-1/2 -translate-x-1/2" />

            <div className="container px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Column: Detailed Info */}
                    <div className="lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium backdrop-blur-sm"
                        >
                            <Zap className="w-4 h-4" />
                            <span>Next-Gen Automations</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl lg:text-5xl font-bold font-heading leading-tight text-white mb-4"
                        >
                            Experience the power of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Autonomous AI</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-zinc-400 leading-relaxed max-w-lg"
                        >
                            Watch how our agents handle complex workflows in real-time.
                            From customer support to data entry, OpenClaw agents operate
                            24/7 with human-like reasoning and machine-like precision.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            {[
                                "Full autonomy over Telegram & WhatsApp",
                                "Seamless integration with 50+ tools",
                                "Enterprise-grade security encryption",
                                "Real-time voice and text capabilities"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <span className="text-zinc-300 font-medium text-sm">{item}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="pt-4"
                        >
                            <Button size="lg" className="rounded-full shadow-lg shadow-indigo-500/20 bg-white text-black hover:bg-zinc-200 font-bold px-8 py-6">
                                Start Building Now
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column: Mobile UI Video */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:w-1/2 relative"
                    >
                        {/* Phone Frame */}
                        <div className="relative mx-auto bg-zinc-950 rounded-[3rem] shadow-2xl p-3 border-4 border-zinc-800 ring-1 ring-white/10 w-[300px] h-[600px]">
                            {/* Buttons */}
                            <div className="absolute top-24 -left-[6px] w-[6px] h-10 bg-zinc-800 rounded-l-md" />
                            <div className="absolute top-40 -left-[6px] w-[6px] h-16 bg-zinc-800 rounded-l-md" />
                            <div className="absolute top-28 -right-[6px] w-[6px] h-20 bg-zinc-800 rounded-r-md" />

                            {/* Screen Container */}
                            <div className="w-full h-full bg-zinc-900 rounded-[2.2rem] overflow-hidden relative border border-zinc-800/50">

                                {/* Video */}
                                <VideoPlayer />
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />

                                {/* Notch */}
                                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20 pointer-events-none">
                                    <div className="w-32 h-full bg-zinc-950 rounded-b-xl" />
                                </div>
                            </div>
                        </div>

                        {/* Decor Elements around phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[650px] bg-indigo-500/20 blur-[60px] -z-10 rounded-full" />

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-12 -right-4 glass px-4 py-3 rounded-xl flex items-center gap-3 shadow-xl backdrop-blur-md bg-white/5 border border-white/10"
                        >
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white">Secure</div>
                                <div className="text-[10px] text-zinc-400">End-to-end Encrypted</div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-24 -left-8 glass px-4 py-3 rounded-xl flex items-center gap-3 shadow-xl backdrop-blur-md bg-white/5 border border-white/10"
                        >
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <Star className="w-4 h-4 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white">Rated 5.0</div>
                                <div className="text-[10px] text-zinc-400">By 500+ Startups</div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
        }
    }, []);

    return (
        <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
        >
            <source src="https://res.cloudinary.com/drdd0gfrc/video/upload/v1771225061/SimpleClaw_Deploy_OpenClaw_under_1_Minute_ixqmjo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}
