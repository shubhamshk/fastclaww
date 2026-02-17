
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-3xl border border-white/5 bg-neutral-900/50 text-neutral-100 shadow-sm backdrop-blur-md",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

export { Card }
