'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 bg-black text-zinc-500 text-sm">
            <div className="container px-6 grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/logo.svg"
                                alt="FastClaww Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-white font-bold text-lg font-heading tracking-tight">FastClaww</span>
                    </div>
                    <p className="mb-4 leading-relaxed max-w-xs">
                        Next-gen AI deployment platform for modern startups.
                    </p>
                    <div className="flex gap-4">
                        {/* Social icons would go here */}
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 font-heading">Product</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 font-heading">Resources</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 font-heading">Legal</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container px-6 mt-12 pt-8 border-t border-white/5 text-center">
                <p>&copy; {new Date().getFullYear()} FastClaww. All rights reserved.</p>
            </div>
        </footer>
    );
}
