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
                                className="object-contain inverted-logo"
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
            <div className="container px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-xs text-zinc-500 font-medium">
                    <p>&copy; {new Date().getFullYear()} FastClaww.</p>
                    <div className="hidden md:block w-px h-3 bg-zinc-800" />
                    <div className="flex items-center gap-2">
                        <span>For queries:</span>
                        <a href="mailto:designbyshk@gmail.com" className="text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-zinc-500">
                            designbyshk@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>Created by</span>
                    <Link
                        href="https://x.com/ClaudeXNancy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-white group"
                    >
                        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                        <span className="font-semibold tracking-wide group-hover:text-indigo-300 transition-colors">Nancy</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
