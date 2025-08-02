"use client";
import { motion, stagger, animate, useAnimate } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/ui/sparkles";
import {CalendarDays, MessageSquareText, SchoolIcon, ScrollText, Wallet} from "lucide-react";

export const SkeletonFour = () => {
    const [animating, setAnimating] = useState(false);

    const scale = [1, 1.1, 1];
    const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
    const sequence = [
        [
            ".circle-1",
            {
                scale,
                transform,
            },
            { duration: 0.8 },
        ],
        [
            ".circle-2",
            {
                scale,
                transform,
            },
            { duration: 0.8 },
        ],
        [
            ".circle-3",
            {
                scale,
                transform,
            },
            { duration: 0.8 },
        ],
        [
            ".circle-4",
            {
                scale,
                transform,
            },
            { duration: 0.8 },
        ],
        [
            ".circle-5",
            {
                scale,
                transform,
            },
            { duration: 0.8 },
        ],
    ];

    useEffect(() => {
        animate(sequence, {
            // @ts-ignore
            repeat: Infinity,
            repeatDelay: 1,
        });
    }, []);
    return (
        <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
            <div className="flex flex-row shrink-0 justify-center items-center gap-2">
                <Container className="h-8 w-8 circle-1">
                    <SchoolIcon className="h-4 w-4 text-blue-300" />
                </Container>
                <Container className="h-12 w-12 circle-2">
                    <CalendarDays className="h-6 w-6 text-green-300" />
                </Container>
                <Container className="circle-3">
                    <Wallet className="h-8 w-8 text-yellow-300" />
                </Container>
                <Container className="h-12 w-12 circle-4">
                    <ScrollText className="h-6 w-6 text-purple-300" />
                </Container>
                <Container className="h-8 w-8 circle-5">
                    <MessageSquareText className="h-4 w-4 text-pink-300" />
                </Container>
            </div>

            <div className="h-30 w-px absolute top-20 m-auto z-40 bg-linear-to-b from-transparent via-blue-500 to-transparent animate-move">
                <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>
            </div>
        </div>
    );
};

const Container = ({
                       className,
                       children,
                   }: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
                className
            )}
        >
            {children}
        </div>
    );
};
