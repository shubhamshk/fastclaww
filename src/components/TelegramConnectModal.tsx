'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TelegramConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect?: (token: string) => void;
}

export function TelegramConnectModal({ isOpen, onClose, onConnect }: TelegramConnectModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [botToken, setBotToken] = useState("");

    // Force autoplay when modal opens
    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play().catch((e) => {
                console.log("Autoplay blocked, waiting for interaction", e);
                setIsPlaying(false);
            });
        }
    }, [isOpen]);

    // Toggle Play/Pause
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Update Progress Bar
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            setProgress((current / duration) * 100);
        }
    };

    // Skip Forward/Backward
    const skip = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-6xl h-[85vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-zinc-800 text-white/50 hover:text-white transition-colors border border-white/5"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Column: Instructions */}
                        <div className="w-full md:w-5/12 p-8 md:p-10 overflow-y-auto border-r border-white/5 bg-zinc-950 flex flex-col">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-[#2AABEE]/10 flex items-center justify-center border border-[#2AABEE]/20">
                                    <SendIcon className="w-6 h-6 text-[#2AABEE]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white font-heading">Connect Telegram</h2>
                                    <p className="text-zinc-500 text-sm">Follow instructions to get your token.</p>
                                </div>
                            </div>

                            <div className="space-y-8 flex-1">
                                <div>
                                    <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">Instructions</h3>
                                    <ol className="space-y-4 relative">
                                        <div className="absolute left-2.5 top-2 bottom-2 w-px bg-white/10" />
                                        {[
                                            { text: <span>Open Telegram and search for <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-[#2AABEE] hover:underline font-medium">@BotFather</a></span> },
                                            { text: <span>Send the command <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#2AABEE] font-mono text-xs">/newbot</code> to create a new bot</span> },
                                            { text: "Give your bot a display name and a unique username" },
                                            { text: "Copy the HTTP API Token sent by BotFather" },
                                            { text: "Paste the token below to connect" }
                                        ].map((step, i) => (
                                            <li key={i} className="flex gap-4 relative pl-0">
                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center text-[10px] font-bold text-zinc-400 z-10 mt-0.5 shadow-sm">
                                                    {i + 1}
                                                </span>
                                                <span className="text-sm text-zinc-400 leading-snug">{step.text}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-white/5">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Bot Token</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={botToken}
                                            onChange={(e) => setBotToken(e.target.value)}
                                            placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwnxyz"
                                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 pl-4 pr-24 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#2AABEE]/50 focus:ring-1 focus:ring-[#2AABEE]/50 transition-all font-mono text-sm"
                                        />
                                        <div className="absolute right-2 top-1.5 bottom-1.5">
                                            <Button
                                                onClick={() => {
                                                    if (onConnect && botToken) onConnect(botToken);
                                                    onClose();
                                                }}
                                                className="h-full bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-semibold px-4 rounded-lg shadow-lg shadow-[#2AABEE]/20 transition-all"
                                            >
                                                Connect
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="flex items-center gap-1.5 text-[10px] text-zinc-500 justify-center mt-2">
                                        <ShieldCheckIcon className="w-3 h-3 text-emerald-500" />
                                        Your token is encrypted and stored securely.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Autoplay Video in Phone Frame */}
                        <div className="w-full md:w-7/12 bg-zinc-900 relative overflow-hidden flex items-center justify-center p-8 bg-grid-white/[0.02]">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2AABEE]/5 to-purple-500/5" />

                            {/* Phone Mockup */}
                            <div className="relative z-10 w-[300px] h-[600px] bg-zinc-950 rounded-[3rem] shadow-2xl p-3 border-4 border-zinc-800 ring-1 ring-white/10">
                                {/* Buttons */}
                                <div className="absolute top-24 -left-[6px] w-[6px] h-10 bg-zinc-800 rounded-l-md" />
                                <div className="absolute top-40 -left-[6px] w-[6px] h-16 bg-zinc-800 rounded-l-md" />
                                <div className="absolute top-28 -right-[6px] w-[6px] h-20 bg-zinc-800 rounded-r-md" />

                                {/* Screen Container */}
                                <div className="w-full h-full bg-zinc-900 rounded-[2.2rem] overflow-hidden relative border border-zinc-800/50">

                                    {/* Video Player */}
                                    <div className="w-full h-full relative bg-zinc-900">
                                        <video
                                            ref={videoRef}
                                            className="w-full h-full object-cover"
                                            loop
                                            muted={isMuted}
                                            playsInline
                                            onTimeUpdate={handleTimeUpdate}
                                            onClick={togglePlay}
                                        >
                                            <source src="https://res.cloudinary.com/drdd0gfrc/video/upload/v1771225061/SimpleClaw_Deploy_OpenClaw_under_1_Minute_ixqmjo.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>

                                        {/* Telegram Header Overlay */}
                                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent p-4 z-10 pointer-events-none">
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="w-8 h-8 rounded-full bg-[#2AABEE] flex items-center justify-center text-white font-bold text-xs shadow-lg">BF</div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-white font-semibold text-sm truncate">BotFather</span>
                                                        <Check className="w-3 h-3 text-[#2AABEE] fill-current" />
                                                    </div>
                                                    <div className="text-white/60 text-xs truncate">bot</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Controls Overlay */}
                                        <div className="absolute bottom-6 left-4 right-4 bg-black/40 backdrop-blur-xl rounded-2xl p-3 border border-white/10 transition-opacity duration-300">
                                            {/* Progress Bar */}
                                            <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer overflow-hidden hover:h-1.5 transition-all" onClick={(e) => {
                                                if (!videoRef.current) return;
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const pos = (e.clientX - rect.left) / rect.width;
                                                videoRef.current.currentTime = pos * videoRef.current.duration;
                                            }}>
                                                <div
                                                    className="h-full bg-[#2AABEE] rounded-full relative"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between text-white">
                                                <button onClick={() => skip(-10)} className="p-1 hover:text-[#2AABEE] transition-colors"><SkipBack className="w-4 h-4" /></button>
                                                <button onClick={togglePlay} className="p-1 hover:text-[#2AABEE] transition-colors">
                                                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                                                </button>
                                                <button onClick={() => skip(10)} className="p-1 hover:text-[#2AABEE] transition-colors"><SkipForward className="w-4 h-4" /></button>
                                                <button onClick={() => setIsMuted(!isMuted)} className="p-1 hover:text-[#2AABEE] transition-colors">
                                                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Play/Pause Center Overlay */}
                                        {!isPlaying && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                                                <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                                    <Play className="w-5 h-5 text-white ml-0.5" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Notch */}
                                    <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20 pointer-events-none">
                                        <div className="w-32 h-full bg-zinc-950 rounded-b-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function SendIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ShieldCheckIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.172-2.662-.485-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
    );
}
