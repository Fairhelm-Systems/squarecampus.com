"use client";
import React, { useId } from "react";
import { cn } from "@/lib/utils";

export const SkeletonTwo = () => {
    return (
        <div className="p-8 overflow-hidden h-full relative flex flex-col group">
            <div className="absolute inset-0 h-full w-full flex flex-row gap-4 justify-center shrink-0 ">
                <CircleWithLine />
                <CircleWithLine />
                <CircleWithLine />
                <CircleWithLine />
                <CircleWithLine />
                <CircleWithLine />
                <CircleWithLine />
                <CircleWithLine />
                <CircleWithLine />
            </div>
            <Container className="mt-10 ml-4 group-hover:border-emerald-500">Attendance Updated</Container>
            <Container className="mt-4 ml-25 group-hover:border-blue-500 transition duration-200 group-hover:scale-[1.02]">
                Grades Published
            </Container>
            <Container className="mt-4 ml-30">Analytics Available</Container>
            <Cursor
                className="top-20 left-50 group-hover:left-39 group-hover:top-26"
                textClassName="group-hover:text-secondary"
                fillColor="hsl(175.9 60.8% 19%)"
                strokeColor="hsl(173.4 80.4% 40%)"
            />
            <Cursor
                className="top-52 left-12 group-hover:left-35 group-hover:top-42"
                textClassName="group-hover:text-white"
                text="Dhanraj"
            />
        </div>
    );
};

const Cursor = ({
                    className,
                    textClassName,
                    text,
                    fillColor = "hsl(224.4 64.3% 32.9%)",
                    strokeColor="hsl(217.2 91.2% 59.8%)",
                }: {
    className?: string;
    textClassName?: string;
    text?: string;
    fillColor?: string;
    strokeColor?: string;
}) => {
    return (
        <div
            className={cn("absolute h-4 w-4  transition-all duration-200", className)}
        >
            <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn("h-4 w-4  transition duration-200", className)}
            >
                <path
                    d="M3.08365 1.18326C2.89589 1.11581 2.70538 1.04739 2.54453 1.00558C2.39192 0.965918 2.09732 0.900171 1.78145 1.00956C1.41932 1.13497 1.13472 1.41956 1.00932 1.78169C0.899927 2.09756 0.965674 2.39216 1.00533 2.54477C1.04714 2.70562 1.11557 2.89613 1.18301 3.0839L5.9571 16.3833C6.04091 16.6168 6.12128 16.8408 6.2006 17.0133C6.26761 17.1591 6.42 17.4781 6.75133 17.6584C7.11364 17.8555 7.54987 17.8612 7.91722 17.6737C8.25317 17.5021 8.41388 17.1873 8.48469 17.0433C8.56852 16.8729 8.65474 16.6511 8.74464 16.4198L10.8936 10.8939L16.4196 8.74489C16.6509 8.655 16.8726 8.56879 17.043 8.48498C17.187 8.41416 17.5018 8.25346 17.6734 7.91751C17.8609 7.55016 17.8552 7.11392 17.6581 6.75162C17.4778 6.42029 17.1589 6.2679 17.0131 6.20089C16.8405 6.12157 16.6165 6.0412 16.383 5.9574L3.08365 1.18326Z"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <div
                className={cn(
                    "absolute top-3 left-3 p-1 rounded-md  text-[10px] whitespace-pre text-neutral-500  transition duration-200",
                    textClassName
                )}
            >
                {text ?? "Mohit"}
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
                "p-0.5 rounded-lg border border-neutral-600 w-fit",
                className
            )}
        >
            <div
                className={cn(
                    "h-10  text-xs px-2 text-neutral-400  rounded-[5px] flex items-center justify-center bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]"
                )}
            >
                {children}
            </div>
        </div>
    );
};

const CircleWithLine = ({ className }: { className?: string }) => {
    const id = useId();
    return (
        <div className={cn("flex flex-col items-center justify-center", className)}>
            <div
                className={cn(`rounded-full h-3 w-3 border border-[rgba(255,255,255,0.2)] bg-[rgba(248,248,248,0.02)]
      shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]`)}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2"
                height="265"
                viewBox="0 0 2 265"
                fill="none"
            >
                <path
                    d="M1 265V1"
                    stroke={`url(#${id})`}
                    strokeOpacity="0.1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <defs>
                    <linearGradient
                        id={id}
                        x1="1.5"
                        y1="1"
                        x2="1.5"
                        y2="265"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F8F8F8" stopOpacity="0.05" />
                        <stop offset="0.530519" stopColor="#F8F8F8" stopOpacity="0.5" />
                        <stop offset="1" stopColor="#F8F8F8" stopOpacity="0.05" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
