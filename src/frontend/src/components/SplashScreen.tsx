import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const WELCOME_LETTERS = [
  { ch: "W", id: "wl-w" },
  { ch: "E", id: "wl-e1" },
  { ch: "L", id: "wl-l" },
  { ch: "C", id: "wl-c" },
  { ch: "O", id: "wl-o" },
  { ch: "M", id: "wl-m" },
  { ch: "E", id: "wl-e2" },
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"welcome" | "logo">("welcome");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 1700);
    const t2 = setTimeout(onComplete, 3900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.06 0.005 48)" }}
    >
      {/* Single, subtle gold orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.13 68 / 0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Phase 1: WELCOME */}
      <AnimatePresence>
        {phase === "welcome" && (
          <motion.div
            key="welcome"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
          >
            {/* Letter-by-letter WELCOME */}
            <div className="flex items-center gap-1 sm:gap-2">
              {WELCOME_LETTERS.map(({ ch, id }, i) => (
                <motion.span
                  key={id}
                  initial={{ opacity: 0, y: 36, rotateX: -80 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                    type: "spring",
                    damping: 15,
                  }}
                  className="font-display font-black inline-block"
                  style={{
                    fontSize: "clamp(2.5rem, 12vw, 5.5rem)",
                    color: "oklch(0.80 0.14 68)",
                    textShadow: "0 0 32px oklch(0.72 0.13 68 / 0.5)",
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.45 }}
              className="font-body text-sm sm:text-base tracking-[0.32em] uppercase text-center"
              style={{ color: "oklch(0.72 0.13 68 / 0.6)" }}
            >
              to BEATZFLARE
            </motion.p>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "160px", opacity: 1 }}
              transition={{ delay: 0.78, duration: 0.55 }}
              className="h-px rounded-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.72 0.13 68 / 0.6), transparent)",
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.45 }}
              className="font-body text-xs tracking-[0.18em] uppercase"
              style={{ color: "oklch(0.52 0.009 60)" }}
            >
              Your Premium Music Experience
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Logo */}
      <AnimatePresence>
        {phase === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, type: "spring", damping: 18 }}
            className="flex flex-col items-center gap-5"
          >
            <img
              src="/assets/generated/beatzflare-logo.dim_600x400.png"
              alt="BEATZFLARE"
              className="w-60 h-auto mx-auto"
            />

            {/* Thin gold progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="w-36 h-0.5 rounded-full overflow-hidden"
              style={{ background: "oklch(0.19 0.008 52)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 1.7, ease: "easeInOut" }}
                className="h-full rounded-full"
                style={{ background: "oklch(0.72 0.13 68)" }}
              />
            </motion.div>

            {/* Credits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col items-center gap-1"
            >
              <p
                className="font-display text-[10px] tracking-[0.32em] uppercase font-semibold"
                style={{ color: "oklch(0.80 0.14 68 / 0.75)" }}
              >
                Developed by{" "}
                <span style={{ color: "oklch(0.80 0.14 68)" }}>
                  ADARSH CHAUDHARY
                </span>
              </p>
              <p
                className="font-display text-[10px] tracking-[0.28em] uppercase"
                style={{ color: "oklch(0.42 0.006 55)" }}
              >
                Powered by MR. DINESH KUMAR CHAUDHARY
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
