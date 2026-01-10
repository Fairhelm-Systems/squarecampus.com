"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Languages, X, Globe, Check } from "../icons";

gsap.registerPlugin(ScrollTrigger);

type LanguageMeta = {
  code: string;
  englishName: string;
  nativeName: string;
  locale: string;
  glow: string;
  glowColor: string;
  fontClass?: string;
  greetingNative?: string;
  greetingEnglish: string;
  notificationNative?: string;
  notificationEnglish: string;
};

// Floating particles component
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-particle ${8 + Math.random() * 12}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) translateX(15px) scale(1.5);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

// Animated globe visualization
function AnimatedGlobe() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-[0.06] pointer-events-none">
      <div className="relative h-[600px] w-[600px]">
        {/* Rotating rings */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-white/30"
            style={{
              transform: `rotateX(${60 + i * 10}deg) rotateY(${i * 15}deg)`,
              animation: `spin-globe ${20 + i * 5}s linear infinite ${
                i % 2 === 0 ? "" : "reverse"
              }`,
            }}
          />
        ))}
        {/* Center glow */}
        <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
      </div>
      <style jsx>{`
        @keyframes spin-globe {
          from {
            transform: rotateX(60deg) rotateY(0deg);
          }
          to {
            transform: rotateX(60deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export const LanguageSupport = () => {
  const languages: LanguageMeta[] = [
    {
      code: "EN",
      englishName: "English",
      nativeName: "English",
      locale: "en-IN",
      glow: "from-blue-400 to-blue-600",
      glowColor: "rgba(59, 130, 246, 0.5)",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "Welcome to SquareCampus.",
      notificationEnglish:
        "Good morning! Here's to a great school day ahead.",
      notificationNative:
        "Good morning! Here's to a great school day ahead.",
    },
    {
      code: "HI",
      englishName: "Hindi",
      nativeName: "हिन्दी",
      locale: "hi-IN",
      glow: "from-amber-400 to-orange-500",
      glowColor: "rgba(251, 191, 36, 0.5)",
      fontClass: "font-devanagari",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus में आपका स्वागत है।",
      notificationEnglish:
        "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 सुप्रभात! आपके दिन की शानदार शुरुआत हो।",
    },
    {
      code: "KN",
      englishName: "Kannada",
      nativeName: "ಕನ್ನಡ",
      locale: "kn-IN",
      glow: "from-sky-400 to-sky-600",
      glowColor: "rgba(56, 189, 248, 0.5)",
      fontClass: "font-kannada",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus ಗೆ ನಿಮಗೆ ಸ್ವಾಗತ.",
      notificationEnglish:
        "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 ಶುಭೋದಯ! ನಿಮ್ಮ ದಿನ ಅದ್ಭುತವಾಗಲಿ.",
    },
    {
      code: "TA",
      englishName: "Tamil",
      nativeName: "தமிழ்",
      locale: "ta-IN",
      glow: "from-purple-400 to-purple-600",
      glowColor: "rgba(167, 139, 250, 0.5)",
      fontClass: "font-tamil",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus-க்கு வரவேற்கிறோம்.",
      notificationEnglish:
        "Notification: Good morning! May your day begin beautifully.",
      notificationNative:
        "🔔 காலை வணக்கம்! உங்கள் நாள் அருமையாக அமையட்டும்.",
    },
    {
      code: "TE",
      englishName: "Telugu",
      nativeName: "తెలుగు",
      locale: "te-IN",
      glow: "from-emerald-400 to-emerald-600",
      glowColor: "rgba(52, 211, 153, 0.5)",
      fontClass: "font-telugu",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus కు స్వాగతం.",
      notificationEnglish:
        "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 శుభోదయం! మీ రోజు అద్భుతంగా సాగాలి.",
    },
    {
      code: "MR",
      englishName: "Marathi",
      nativeName: "मराठी",
      locale: "mr-IN",
      glow: "from-rose-400 to-rose-600",
      glowColor: "rgba(251, 113, 133, 0.5)",
      fontClass: "font-devanagari",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus मध्ये आपले स्वागत आहे.",
      notificationEnglish:
        "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 शुभ प्रभात! तुमचा दिवस छान जावो.",
    },
    {
      code: "GU",
      englishName: "Gujarati",
      nativeName: "ગુજરાતી",
      locale: "gu-IN",
      glow: "from-cyan-400 to-cyan-600",
      glowColor: "rgba(34, 211, 238, 0.5)",
      fontClass: "font-gujarati",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus માં આપનું સ્વાગત છે.",
      notificationEnglish:
        "Notification: Good morning! May your day begin beautifully.",
      notificationNative:
        "🔔 સુપ્રભાત! તમારો દિવસ સારો રીતે પસાર થાય.",
    },
    {
      code: "ML",
      englishName: "Malayalam",
      nativeName: "മലയാളം",
      locale: "ml-IN",
      glow: "from-green-400 to-green-600",
      glowColor: "rgba(74, 222, 128, 0.5)",
      fontClass: "font-malayalam",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus-ലേക്ക് സ്വാഗതം.",
      notificationEnglish:
        "Notification: Good morning! May your day begin beautifully.",
      notificationNative:
        "🔔 സുപ്രഭാതം! നിങ്ങളുടെ ദിവസം മനോഹരമാവട്ടെ.",
    },
    {
      code: "BN",
      englishName: "Bengali",
      nativeName: "বাংলা",
      locale: "bn-IN",
      glow: "from-pink-400 to-pink-600",
      glowColor: "rgba(244, 114, 182, 0.5)",
      fontClass: "font-bengali",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus-এ আপনাকে স্বাগতম।",
      notificationEnglish:
        "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 সুপ্রভাত! আপনার দিনটি ভালো কাটুক।",
    },
    {
      code: "PA",
      englishName: "Punjabi",
      nativeName: "ਪੰਜਾਬੀ",
      locale: "pa-IN",
      glow: "from-fuchsia-400 to-fuchsia-600",
      glowColor: "rgba(232, 121, 249, 0.5)",
      fontClass: "font-gurmukhi",
      greetingEnglish: "Welcome to SquareCampus.",
      greetingNative: "SquareCampus ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।",
      notificationEnglish:
        "Notification: Good morning! May your day begin beautifully.",
      notificationNative: "🔔 ਸ਼ੁਭ ਸਵੇਰ! ਤੁਹਾਡਾ ਦਿਨ ਚੰਗਾ ਲੰਘੇ।",
    },
  ];

  const [active, setActive] = useState<LanguageMeta | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const infoCardRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Grid cards animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".js-language-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Info card animation
      if (infoCardRef.current) {
        gsap.fromTo(
          infoCardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: infoCardRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Modal close handlers
  useEffect(() => {
    if (!active) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };

    const handleClick = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
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

  // Modal open animation
  useEffect(() => {
    if (!active) return;

    if (modalRef.current)
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.92, y: 20, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.35,
          ease: "back.out(1.5)",
        }
      );
    }
  }, [active]);

  const features = [
    "Parent apps in native languages",
    "Notifications & reminders",
    "Fee receipts & reports",
    "Attendance updates",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto mt-28 max-w-6xl overflow-hidden px-6 py-16 text-neutral-200"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial gradient backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <FloatingParticles />
      <AnimatedGlobe />

      {/* Heading section */}
      <div
        ref={headingRef}
        className="relative z-10 mx-auto max-w-4xl space-y-4 text-center"
      >
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
          <Globe className="h-4 w-4 text-blue-400" />
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
            Made for India
          </p>
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
          Built for the languages{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            India speaks
          </span>
        </h2>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
          SquareCampus ships with support for India&apos;s major languages so
          administrators, teachers, parents, and students can use the platform
          comfortably in the language they prefer.
        </p>
      </div>

      {/* Language grid */}
      <div
        ref={gridRef}
        className="relative z-10 mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {languages.map((lang, index) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setActive(lang)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "js-language-card group relative overflow-hidden rounded-2xl",
              "border border-white/[0.08] bg-neutral-900/50 p-4 text-left backdrop-blur-sm",
              "outline-none ring-offset-0 transition-all duration-300",
              "hover:border-white/20 hover:bg-neutral-900/80",
              "focus-visible:ring-2 focus-visible:ring-neutral-200"
            )}
            style={{
              transform:
                hoveredIndex === index ? "translateY(-4px)" : "translateY(0)",
            }}
          >
            {/* Hover glow effect */}
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-15",
                lang.glow
              )}
            />

            {/* Card glow on hover */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${lang.glowColor}, transparent 60%)`,
              }}
            />

            {/* Corner accent */}
            <div
              className={cn(
                "absolute right-0 top-0 h-12 w-12 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30",
                lang.glow
              )}
            />

            <div className="relative z-10">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400">
                {lang.code}
              </p>
              <div className="mt-2.5 space-y-1">
                <span
                  lang={lang.locale}
                  className={cn(
                    "block text-sm font-semibold text-white transition-colors duration-300 group-hover:text-white",
                    lang.fontClass
                  )}
                >
                  {lang.nativeName}
                </span>
                <span className="block text-[0.65rem] font-medium uppercase tracking-[0.25em] text-neutral-500">
                  {lang.englishName}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Info card */}
      <div
        ref={infoCardRef}
        className="relative z-10 mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900/50 p-8 backdrop-blur-sm"
      >
        {/* Card background effects */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center space-y-5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-500/20 to-purple-500/20">
            <Languages className="h-7 w-7 text-blue-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">
              Parent-friendly. Teacher-friendly. Admin-friendly.
            </h3>
            <p className="text-sm leading-relaxed text-neutral-400">
              Interfaces adapt to the chosen language, while reports and exports
              can still be generated in English for auditors and regulators.
            </p>
          </div>

          {/* Feature list */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2"
              >
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-neutral-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Glow effect behind modal */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${active.glowColor}15, transparent 50%)`,
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
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.1] bg-neutral-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            {/* Modal header gradient */}
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-32 bg-gradient-to-b opacity-20",
                active.glow
              )}
            />

            {/* Shimmer effect */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -inset-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>

            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-neutral-500">
                    Language preview
                  </p>
                  <h3
                    id="language-greeting-title"
                    className="mt-1 flex items-center gap-2 text-base font-semibold text-white"
                  >
                    <span
                      lang={active.locale}
                      className={active.fontClass}
                    >
                      {active.nativeName}
                    </span>
                    <span className="text-sm text-neutral-500">
                      ({active.englishName})
                    </span>
                    <span
                      className={cn(
                        "ml-1 inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wider",
                        "border-white/[0.08] bg-white/[0.03] text-neutral-400"
                      )}
                    >
                      {active.code}
                    </span>
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-neutral-400 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white hover:rotate-90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Greeting card */}
              <div className="mt-5 space-y-3">
                <div
                  className={cn(
                    "rounded-xl border border-white/[0.08] bg-white/[0.03] p-4",
                    "shadow-inner shadow-black/20"
                  )}
                >
                  <p
                    lang={active.locale}
                    className={cn(
                      "text-sm font-medium text-white",
                      active.fontClass
                    )}
                  >
                    {active.greetingNative ?? active.greetingEnglish}
                  </p>
                  {active.greetingNative &&
                    active.greetingNative !== active.greetingEnglish && (
                      <p className="mt-1.5 text-xs text-neutral-500">
                        {active.greetingEnglish}
                      </p>
                    )}
                </div>

                {/* Notification preview */}
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-wider text-neutral-500">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Sample Notification
                  </div>
                  <p
                    lang={active.locale}
                    className={cn(
                      "mt-2 text-sm leading-relaxed text-neutral-300",
                      active.fontClass
                    )}
                  >
                    {active.notificationNative ?? active.notificationEnglish}
                  </p>
                  {active.notificationNative &&
                    active.notificationNative !== active.notificationEnglish && (
                      <p className="mt-1.5 text-[0.7rem] text-neutral-500">
                        {active.notificationEnglish}
                      </p>
                    )}
                </div>
              </div>

              {/* Footer text */}
              <p className="mt-5 text-[0.75rem] leading-relaxed text-neutral-500">
                SquareCampus adapts key experiences into{" "}
                <span className="font-medium text-neutral-300">
                  {active.englishName}
                </span>
                : parent apps, notifications, attendance updates, fee
                reminders—while admins can continue working in English if they
                prefer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
