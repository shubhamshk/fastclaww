
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
    {
        name: 'Starter',
        price: 'Free',
        desc: 'Perfect for side projects and prototypes.',
        features: ['1000 messages/mo', '1 custom bot', 'Community support', 'API access'],
        highlight: false,
        cta: 'Start for Free'
    },
    {
        name: 'Pro',
        price: '$29',
        desc: 'For scaling startups and serious builders.',
        features: ['50,000 messages/mo', '10 custom bots', 'Custom domain', 'Priority support', 'Advanced analytics'],
        highlight: true,
        cta: 'Get Started'
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        desc: 'For large organizations needing control.',
        features: ['Unlimited messages', 'Unlimited bots', 'SLA', 'Dedicated success manager', 'On-premise deployment'],
        highlight: false,
        cta: 'Contact Sales'
    }
];

export function Pricing() {
    return (
        <section className="py-24 relative overflow-hidden bg-black" id="pricing">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 mb-6 font-heading"
                    >
                        Simple, transparent pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg md:text-xl"
                    >
                        Start for free, scale as you grow.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={cn("flex", plan.highlight ? "md:-mt-8 md:mb-8" : "")}
                        >
                            <Card className={cn(
                                "flex flex-col w-full p-8 relative border-white/5 backdrop-blur-sm transition-all duration-300",
                                plan.highlight
                                    ? "bg-zinc-900/40 border-indigo-500/50 shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)] z-10 scale-100 ring-1 ring-indigo-500/20"
                                    : "bg-zinc-900/10 hover:bg-zinc-900/20 hover:border-white/10 scale-95"
                            )}>
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wider uppercase">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className={cn("text-lg font-bold mb-4 font-heading", plan.highlight ? "text-indigo-400" : "text-white")}>{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">{plan.price}</span>
                                        {plan.price !== 'Custom' && plan.price !== 'Free' && <span className="text-zinc-500 font-medium">/month</span>}
                                    </div>
                                    <p className="text-zinc-400 text-sm mt-4 leading-relaxed">{plan.desc}</p>
                                </div>

                                <div className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                            <div className={cn("mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0", plan.highlight ? "bg-indigo-500/20" : "bg-white/10")}>
                                                <Check className={cn("w-2.5 h-2.5", plan.highlight ? "text-indigo-400" : "text-zinc-400")} />
                                            </div>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className={cn(
                                        "w-full py-6 rounded-xl font-bold transition-all",
                                        plan.highlight
                                            ? "bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10"
                                            : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
                                    )}
                                >
                                    {plan.cta}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
