
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Zap, MessageSquare, FileText, PieChart, Receipt, UserCheck } from 'lucide-react';

const cases = [
    { icon: MessageSquare, title: 'Organize your inbox', desc: 'AI filters spam and prioritizes important emails automatically.' },
    { icon: UserCheck, title: 'Answer support tickets', desc: 'Draft responses to customers in seconds with context.' },
    { icon: FileText, title: 'Summarize documents', desc: 'Turn long reports into concise executive summaries.' },
    { icon: PieChart, title: 'Track expenses', desc: 'Scan receipts and categorize spending in real-time.' },
    { icon: Receipt, title: 'Generate invoices', desc: 'Create professional invoices from simple text prompts.' },
    { icon: Zap, title: 'Draft job descriptions', desc: 'Hire faster with AI-generated role requirements.' },
];

export function UseCases() {
    return (
        <section className="py-24 relative overflow-hidden bg-black" id="features">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black opacity-80" />

            <div className="container px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500 mb-6 font-heading">
                        Powerful capabilities <br className="hidden md:block" /> out of the box
                    </h2>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Everything you need to automate your workflow, pre-configured and ready to deploy.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cases.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full p-6 hover:scale-[1.02] transition-all duration-300 group border-white/5 hover:border-indigo-500/30 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)] bg-zinc-900/20 backdrop-blur-sm">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors border border-white/5 group-hover:border-indigo-500/30">
                                    <item.icon className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 font-heading">{item.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                                    {item.desc}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
