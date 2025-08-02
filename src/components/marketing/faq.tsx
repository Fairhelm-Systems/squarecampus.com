"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const FAQs = [
    {
        question: "What is SquareCampus?",
        answer:
            "SquareCampus is an enterprise SaaS platform designed to streamline school and college operations, from admissions and academics to finance and communication — all in one centralized system.",
    },
    {
        question: "Who is SquareCampus for?",
        answer:
            "SquareCampus is built for schools, colleges, universities, and multi-branch educational organizations looking for a secure, scalable, and standardized digital platform.",
    },
    {
        question: "Can we customize the platform for our institution?",
        answer:
            "SquareCampus offers configuration options within each module, allowing you to align workflows with institutional policies. However, feature customizations beyond the core product aren't provided, ensuring a stable and consistent SaaS experience for all clients.",
    },
    {
        question: "How secure is our data on SquareCampus?",
        answer:
            "We prioritize enterprise-grade security with end-to-end encryption, role-based access controls, regular audits, and compliance with global data protection standards to safeguard your institution's data.",
    },
    {
        question: "Does SquareCampus support integrations with our existing systems?",
        answer:
            "Yes, we provide robust APIs to integrate SquareCampus with your existing ERP, LMS, or HR systems, enabling seamless interoperability without compromising security.",
    },
    {
        question: "Do you offer mobile apps for students and staff?",
        answer:
            "Mobile apps are currently under development and part of our roadmap. Meanwhile, the platform is fully responsive and accessible via mobile browsers for all users.",
    },
    {
        question: "How does product support and onboarding work?",
        answer:
            "We provide guided onboarding, comprehensive documentation, and ongoing support via our customer success team. Training sessions can be arranged for admins and staff to ensure smooth adoption.",
    },
    {
        question: "What are the pricing options for SquareCampus?",
        answer:
            "Our pricing is flexible based on the number of students, selected modules, and the institution's scale. To get a tailored pricing quote, contact our sales team directly.",
    },
    {
        question: "How often is SquareCampus updated?",
        answer:
            "We continuously improve the platform with regular updates, performance enhancements, and security patches. All updates are deployed seamlessly without disrupting your operations.",
    },
    {
        question: "How can I get started with SquareCampus?",
        answer:
            "You can schedule a personalized demo and consultation by contacting us through our website or the 'Get Started Now' button on our homepage.",
    },
];

export function FAQ() {
    const [open, setOpen] = useState<string | null>(null);
    return (
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-20 md:px-8 md:py-40" id={'faq'}>
            <h2 className="text-center text-4xl font-medium tracking-tight text-neutral-50 md:text-5xl">
                Frequently asked questions
            </h2>
            <p className="mx-auto max-w-lg text-center text-base text-neutral-50">
                We are here to help you with any questions you may have. If you
                don&apos;t find what you need, please contact us at{" "}
                <a
                    href="mailto:support@squarecampus.com"
                    className="text-blue-500 underline"
                >
                    support@squarecampus.com
                </a>
            </p>
            <div className="mx-auto mt-10 w-full max-w-3xl">
                {FAQs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        open={open}
                        setOpen={setOpen}
                    />
                ))}
            </div>
        </div>
    );
}

const FAQItem = ({
                     question,
                     answer,
                     setOpen,
                     open,
                 }: {
    question: string;
    answer: string;
    open: string | null;
    setOpen: (open: string | null) => void;
}) => {
    const isOpen = open === question;

    return (
        <div
            className="shadow-input mb-8 w-full cursor-pointer rounded-lg bg-neutral-900 p-4"
            onClick={() => {
                if (isOpen) {
                    setOpen(null);
                } else {
                    setOpen(question);
                }
            }}
        >
            <div className="flex items-start">
                <div className="relative mr-4 mt-1 h-6 w-6 flex-shrink-0">
                    <IconChevronUp
                        className={cn(
                            "absolute inset-0 h-6 w-6 transform text-white transition-all duration-200",
                            isOpen && "rotate-90 scale-0",
                        )}
                    />
                    <IconChevronDown
                        className={cn(
                            "absolute inset-0 h-6 w-6 rotate-90 scale-0 transform text-white transition-all duration-200",
                            isOpen && "rotate-0 scale-100",
                        )}
                    />
                </div>
                <div>
                    <h3 className="text-lg font-medium text-neutral-200">
                        {question}
                    </h3>
                    <AnimatePresence mode="wait">
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="overflow-hidden text-neutral-400"
                            >
                                {answer.split("").map((line, index) => (
                                    <motion.span
                                        initial={{ opacity: 0, filter: "blur(5px)" }}
                                        animate={{ opacity: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, filter: "blur(0px)" }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeOut",
                                            delay: index * 0.005,
                                        }}
                                        key={index}
                                    >
                                        {line}
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
