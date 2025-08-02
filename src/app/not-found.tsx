"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

// Operation: Aesthetic Misfire – where lost links land.
export default function NotFound() {
    const router = useRouter()

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground px-6">
            {/* The Fade-In Curtain */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-xl"
            >
                <h1 className="text-7xl font-extrabold tracking-tight sm:text-8xl">
                    404
                </h1>

                <p className="mt-6 text-xl sm:text-2xl text-muted-foreground">
                    You've found a page that doesn't exist — or maybe one we’ve erased from memory.
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                    Either way, there's nothing here but shadows and echoes.
                </p>

                <div className="flex justify-center mt-8">
                    <Button
                        variant='default'
                        className="group flex items-center gap-2 text-sm border border-input"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Lets go back
                    </Button>
                </div>
            </motion.div>

            {/* A dark visual to echo the silence */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.08 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="absolute bottom-0 pointer-events-none select-none"
            >
                <svg
                    width="600"
                    height="600"
                    viewBox="0 0 600 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-20"
                >
                    <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="300" cy="300" r="230" stroke="currentColor" strokeWidth="0.3" />
                    <circle cx="300" cy="300" r="180" stroke="currentColor" strokeWidth="0.2" />
                </svg>
            </motion.div>
        </div>
    )
}
