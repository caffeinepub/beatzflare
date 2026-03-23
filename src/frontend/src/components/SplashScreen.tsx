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
    // Phase 1: show WELCOME for 1.6s, then transition to logo
    const t1 = setTimeout(() => setPhase("logo"), 1600);
    // Phase 2: logo shows for 2s then done
    const t2 = setTimeout(onComplete, 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.06 0.006 48)" }}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px]"
          style={{ background: "oklch(0.74 0.135 70 / 0.12)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[120px]"
          style={{ background: "oklch(0.74 0.135 70 / 0.06)" }}
        />
      </div>

      {/* Phase 1: WELCOME entrance */}
      <AnimatePresence>
        {phase === "welcome" && (
          <motion.div
            key="welcome"
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          >
            {/* Animated welcome letters */}
            <div className="flex items-center gap-1 sm:gap-2">
              {WELCOME_LETTERS.map(({ ch, id }, i) => (
                <motion.span
                  key={id}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.07,
                    type: "spring",
                    damping: 14,
                  }}
                  className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight"
                  style={{
                    color: "oklch(0.82 0.15 70)",
                    textShadow:
                      "0 0 40px oklch(0.74 0.135 70 / 0.6), 0 0 80px oklch(0.74 0.135 70 / 0.3)",
                    display: "inline-block",
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="font-body text-sm sm:text-base tracking-[0.3em] uppercase text-center"
              style={{ color: "oklch(0.74 0.135 70 / 0.7)" }}
            >
              to BEATZFLARE
            </motion.p>

            {/* Divider line with glow */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "200px", opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-px rounded-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, oklch(0.74 0.135 70), transparent)",
              }}
            />

            {/* Users welcome text */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="font-body text-xs sm:text-sm tracking-[0.15em] uppercase"
              style={{ color: "oklch(0.6 0.08 70 / 0.8)" }}
            >
              Your Premium Music Experience Awaits
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Logo + credits */}
      <AnimatePresence>
        {phase === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", damping: 16 }}
            className="flex flex-col items-center gap-5"
          >
            <img
              src="/assets/generated/beatzflare-logo.dim_600x400.png"
              alt="BEATZFLARE"
              className="w-64 h-auto mx-auto"
            />

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-40 h-px rounded-full overflow-hidden"
              style={{ background: "oklch(0.74 0.135 70 / 0.12)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 1.8, ease: "easeInOut" }}
                className="h-full rounded-full"
                style={{ background: "oklch(0.74 0.135 70)" }}
              />
            </motion.div>

            {/* Developer credit ABOVE powered by */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-1"
            >
              <p
                className="font-display text-[10px] tracking-[0.35em] uppercase font-semibold"
                style={{ color: "oklch(0.82 0.15 70 / 0.8)" }}
              >
                Developed by{" "}
                <span style={{ color: "oklch(0.82 0.15 70)" }}>
                  ADARSH CHAUDHARY
                </span>
              </p>
              <p
                className="font-display text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "oklch(0.74 0.135 70 / 0.45)" }}
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
