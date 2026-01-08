"use client"

import gsap from "gsap";
import { useGsapReveal } from "@/lib/gsap-utils";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Languages, X } from "../icons";


type LanguageMeta = {
    code: string;
    englishName: string;
    nativeName: string;
    locale: string;
    glow: string;
    fontClass?: string;
    greetingNative?: string;
    greetingEnglish: string;
    notificationNative?: string;
    notificationEnglish: string;
};

export const LanguageSupport = () => {
    const languages: LanguageMeta[] = [
        {
            code: "EN",
            englishName: "English",
            nativeName: "English",
            locale: "en-IN",
            glow: "from-blue-400 to-blue-600",
            greetingEnglish: "Welcome to SquareCampus.",
            greetingNative: "Welcome to SquareCampus.",
            notificationEnglish: "Good morning! Here's to a great school day ahead.",
            notificationNative: "Good morning! Here's to a great school day ahead.",
        },
        {
            code: "HI",
            englishName: "Hindi",
            nativeName: "हिन्दी",
            locale: "hi-IN",
            glow: "from-amber-400 to-orange-500",
            fontClass: "font-devanagari",
            greetingEnglish: "Welcome to SquareCampus.",
            greetingNative: "SquareCampus में आपका स्वागत है।",
            notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
            notificationNative: "🔔 सुप्रभात! आपके दिन की शानदार शुरुआत हो।",
        },
        {
            code: "KN",
            englishName: "Kannada",
            nativeName: "ಕನ್ನಡ",
            locale: "kn-IN",
            glow: "from-sky-400 to-sky-600",
            fontClass: "font-kannada",
            greetingEnglish: "Welcome to SquareCampus.",
            greetingNative: "SquareCampus ಗೆ ನಿಮಗೆ ಸ್ವಾಗತ.",
            notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
            notificationNative: "🔔 ಶುಭೋದಯ! ನಿಮ್ಮ ದಿನ ಅದ್ಭುತವಾಗಲಿ.",
        },
        {
            code: "TA",
            englishName: "Tamil",
            nativeName: "தமிழ்",
            locale: "ta-IN",
            glow: "from-purple-400 to-purple-600",
            fontClass: "font-tamil",
            greetingEnglish: "Welcome to SquareCampus.",
            greetingNative: "SquareCampus-க்கு வரவேற்கிறோம்.",
            notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
            notificationNative: "🔔 காலை வணக்கம்! உங்கள் நாள் அருமையாக அமையட்டும்.",
        },
        {
            code: "TE",
            englishName: "Telugu",
            nativeName: "తెలుగు",
            locale: "te-IN",
            glow: "from-emerald-400 to-emerald-600",
            fontClass: "font-telugu",
            greetingEnglish: "Welcome to SquareCampus.",
            greetingNative: "SquareCampus కు స్వాగతం.",
            notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
            notificationNative: "🔔 శుభోదయం! మీ రోజు అద్భుతంగా సాగాలి.",
        },
        {
            code: "MR",
            englishName: "Marathi",
            nativeName: "मराठी",
            locale: "mr-IN",
            glow: "from-rose-400 to-rose-600",
            fontClass: "font-devanagari",
            greetingEnglish: "Welcome to SquareCampus.",
            greetingNative: "SquareCampus मध्ये आपले स्वागत आहे.",
            notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
            notificationNative: "🔔 शुभ प्रभात! तुमचा दिवस छान जावो.",
        },
        {
            code: "GU",
            englishName: "Gujarati",
            nativeName: "ગુજરાતી",
            locale: "gu-IN",
            glow: "from-cyan-400 to-cyan-600",
            fontClass: "font-gujarati",
            greetingEnglish: "Welcome to SquareCampus.",
            greetingNative: "SquareCampus માં આપનું સ્વાગત છે.",
            notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
            notificationNative: "🔔 સુપ્રભાત! તમારો દિવસ સારો રીતે પસાર થાય.",
        },
        {
            code: "ML",
            englishName: "Malayalam",
            nativeName: "മലയാളം",
            locale: "ml-IN",
            glow: "from-green-400 to-green-600",
            fontClass: "font-malayalam",
            greetingEnglish: "Welcome to SquareCampus.",
            greetingNative: "SquareCampus-ലേക്ക് സ്വാഗതം.",
            notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
            notificationNative: "🔔 സുപ്രഭാതം! നിങ്ങളുടെ ദിവസം മനോഹരമാവട്ടെ.",
        },
        {
            code: "BN",
            englishName: "Bengali",
            nativeName: "বাংলা",
            locale: "bn-IN",
            glow: "from-pink-400 to-pink-600",
            fontClass: "font-bengali",
            greetingEnglish: "Welcome to SquareCampus.",
            greetingNative: "SquareCampus-এ আপনাকে স্বাগতম।",
            notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
            notificationNative: "🔔 সুপ্রভাত! আপনার দিনটি ভালো কাটুক।",
        },
        {
            code: "PA",
            englishName: "Punjabi",
            nativeName: "ਪੰਜਾਬੀ",
            locale: "pa-IN",
            glow: "from-fuchsia-400 to-fuchsia-600",
            fontClass: "font-gurmukhi",
            greetingEnglish: "Welcome to SquareCampus.",
            greetingNative: "SquareCampus ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।",
            notificationEnglish: "Notification: Good morning! May your day begin beautifully.",
            notificationNative: "🔔 ਸ਼ੁਭ ਸਵੇਰ! ਤੁਹਾਡਾ ਦਿਨ ਚੰਗਾ ਲੰਘੇ।",
        },
    ];

    const [active, setActive] = useState<LanguageMeta | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

    useGsapReveal(sectionRef, { y: 24 });
    useGsapReveal(gridRef, { selector: ".js-language-card", stagger: 0.04, threshold: 0.1 });

    useEffect(() => {
        if (!active) return;

        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setActive(null);
        };

        const handleClick = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setActive(null);
            }
        };

        document.addEventListener("keydown", handleKey);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [active]);

    useEffect(() => {
        if (!active) return;

        if (modalRef.current) gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
        if (panelRef.current) {
            gsap.fromTo(
                panelRef.current,
                { opacity: 0, scale: 0.96, y: 8, filter: "blur(4px)" },
                { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.25, ease: "power2.out" }
            );
        }
    }, [active]);

    return (
        <section ref={sectionRef} className="relative mx-auto mt-28 max-w-6xl px-6 py-16 text-neutral-200">
            <div className="mx-auto max-w-4xl space-y-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
                    Made for India
                </p>
                <h2 className="text-3xl font-semibold text-white md:text-4xl">
                    Built for the languages India speaks
                </h2>
                <p className="text-sm leading-relaxed text-neutral-400 md:text-base">
                    SquareCampus ships with support for India&apos;s major languages so administrators,
                    teachers, parents, and students can use the platform comfortably in the language they
                    prefer. Adoption improves, support tickets drop, and communication becomes seamless.
                </p>
            </div>

            <div
                ref={gridRef}
                className="relative mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        type="button"
                        onClick={() => setActive(lang)}
                        className="js-language-card group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-4 text-left shadow-[0_0_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur outline-none ring-offset-0 transition hover:border-white/40 focus-visible:ring-2 focus-visible:ring-neutral-200"
                    >
                        <div
                            className={cn(
                                "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10",
                                lang.glow
                            )}
                        />
                        <p className="text-[0.7rem] uppercase tracking-[0.35em] text-neutral-400">
                            {lang.code}
                        </p>
                        <div className="mt-2 space-y-1">
                            <span lang={lang.locale} className={cn("block text-sm font-semibold text-white", lang.fontClass)}>
                                {lang.nativeName}
                            </span>
                            <span className="block text-[0.7rem] uppercase tracking-[0.3em] text-neutral-500">
                                {lang.englishName}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-xl backdrop-blur">
                <div className="flex flex-col items-center space-y-3 text-center">
                    <Languages className="h-8 w-8 text-neutral-400" />
                    <p className="text-sm text-neutral-300">
                        <span className="font-semibold text-white">
                            Parent-friendly. Teacher-friendly. Admin-friendly.
                        </span>{" "}
                        Interfaces adapt to the chosen language, while reports and exports can still be
                        generated in English for auditors and regulators.
                    </p>
                </div>
            </div>

            {active && (
                <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            background: "radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 70%)",
                        }}
                    />
                    <div
                        ref={(node) => {
                            popoverRef.current = node;
                            panelRef.current = node;
                        }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="language-greeting-title"
                        className={cn(
                            "relative z-10 w-full max-w-sm rounded-2xl border border-white/15 bg-neutral-950/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl",
                            "before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.05),transparent)] before:opacity-20",
                            "after:absolute after:inset-0 after:bg-[linear-gradient(-115deg,transparent,rgba(255,255,255,0.04),transparent)] after:opacity-20"
                        )}
                    >
                        <div className="flex items-start justify-between gap-3 relative z-10">
                            <div>
                                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-neutral-400">
                                    Language selected
                                </p>
                                <h3
                                    id="language-greeting-title"
                                    className="mt-1 text-sm font-semibold text-white flex items-center gap-2"
                                >
                                    <span>{active.nativeName}</span>
                                    <span className="text-neutral-400 text-xs">({active.englishName})</span>
                                    <span className="inline-flex items-center justify-center rounded-md border border-white/10 bg-neutral-900/80 px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-neutral-500">
                                        {active.code}
                                    </span>
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActive(null)}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700/70 bg-neutral-900 text-neutral-300 hover:border-neutral-300 hover:text-white hover:rotate-90 transition-transform duration-200"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        <div className="mt-4 space-y-3 text-sm text-neutral-200">
                            <p
                                lang={active.locale}
                                className={cn(
                                    "rounded-xl bg-neutral-900/60 border border-white/10 px-4 py-2 shadow-inner shadow-black/20",
                                    active.fontClass
                                )}
                            >
                                {active.greetingNative ?? active.greetingEnglish}
                            </p>

                            {active.greetingNative && (
                                <p className="text-[0.8rem] text-neutral-400">{active.greetingEnglish}</p>
                            )}
                        </div>

                        <div className="mt-4 rounded-xl border border-white/10 bg-neutral-900/60 p-3 text-xs text-neutral-300 font-medium">
                            <p lang={active.locale} className={cn("leading-relaxed", active.fontClass)}>
                                {active.notificationNative ?? active.notificationEnglish}
                            </p>
                            {active.notificationNative && (
                                <p className="mt-1 text-[0.7rem] text-neutral-500">
                                    {active.notificationEnglish}
                                </p>
                            )}
                        </div>

                        <p className="mt-4 text-[0.78rem] text-neutral-400 leading-relaxed">
                            SquareCampus adapts key experiences into{" "}
                            <span className="font-semibold text-neutral-100">{active.englishName}</span>: parent
                            apps, notifications, attendance updates, fee reminders, while admins can continue
                            working in English if they prefer.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}