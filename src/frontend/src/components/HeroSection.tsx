import { motion } from "motion/react";

interface HeroSectionProps {
  onExplore: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-14 pb-16">
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[360px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.72 0.13 68 / 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Now Streaming badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
          style={{
            background: "oklch(0.72 0.13 68 / 0.08)",
            border: "1px solid oklch(0.72 0.13 68 / 0.22)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "oklch(0.72 0.13 68)" }}
          />
          <span
            className="text-xs font-semibold tracking-widest uppercase font-body"
            style={{ color: "oklch(0.72 0.13 68)" }}
          >
            Now Streaming
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-display font-black tracking-tight leading-none mb-1"
          style={{
            fontSize: "clamp(2.6rem, 8vw, 5rem)",
            color: "oklch(0.93 0.006 70)",
          }}
        >
          Your Vibe.
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.16 }}
          className="font-display font-black tracking-tight leading-none mb-5 text-glow-gold"
          style={{
            fontSize: "clamp(2.6rem, 8vw, 5rem)",
            color: "oklch(0.72 0.13 68)",
          }}
        >
          BEATZFLARE.
        </motion.h1>

        {/* Developer credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="font-body text-xs tracking-widest uppercase mb-8"
          style={{ color: "oklch(0.72 0.13 68 / 0.65)" }}
        >
          Developed by{" "}
          <span className="font-bold" style={{ color: "oklch(0.80 0.14 68)" }}>
            ADARSH CHAUDHARY
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.34 }}
          className="font-body text-base text-muted-foreground max-w-sm mb-10 leading-relaxed"
        >
          Haryanvi · Punjabi · 90s · Bollywood
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.46 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onExplore}
          data-ocid="hero.primary_button"
          className="font-body font-semibold tracking-wide text-sm px-10 py-3 rounded-full transition-all glow-gold-sm"
          style={{
            background: "oklch(0.72 0.13 68)",
            color: "oklch(0.07 0.005 48)",
          }}
        >
          Explore Music
        </motion.button>

        {/* Decorative equalizer bars — subtle, minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-end gap-[3px] mt-14 h-10"
          aria-hidden="true"
        >
          {[14, 22, 32, 20, 38, 26, 44, 30, 36, 24, 40, 18, 34, 28, 42].map(
            (h, i) => (
              <motion.div
                // biome-ignore lint/suspicious/noArrayIndexKey: decorative
                key={i}
                className="w-[3px] rounded-full"
                style={{ background: "oklch(0.72 0.13 68 / 0.22)" }}
                animate={{
                  height: [`${h * 0.5}px`, `${h}px`, `${h * 0.5}px`],
                }}
                transition={{
                  duration: 1.6 + i * 0.08,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.06,
                }}
              />
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}
