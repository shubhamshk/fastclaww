
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-white text-black hover:bg-white/90 shadow-[0_0_15px_-3px_rgba(255,255,255,0.4)]",
                primary:
                    "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] border border-indigo-500/50",
                destructive:
                    "bg-red-900/50 text-red-200 hover:bg-red-900/70 border border-red-900",
                outline:
                    "border border-white/10 bg-transparent hover:bg-white/5 text-white hover:border-white/20",
                secondary:
                    "bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm border border-white/5",
                ghost: "hover:bg-white/5 hover:text-white",
                link: "text-indigo-400 underline-offset-4 hover:underline",
                premium: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.7)] hover:scale-[1.02] active:scale-[0.98]"
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-12 rounded-xl px-8 text-base",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean // Placeholder for Slot compatibility if added later
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
