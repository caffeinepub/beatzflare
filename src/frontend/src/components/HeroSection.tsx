import { motion } from "motion/react";

interface HeroSectionProps {
  onExplore: () => void;
}

const WAVE_BARS = [
  { id: "w1", h: 18, delay: 0 },
  { id: "w2", h: 34, delay: 0.1 },
  { id: "w3", h: 48, delay: 0.2 },
  { id: "w4", h: 28, delay: 0.15 },
  { id: "w5", h: 52, delay: 0.3 },
  { id: "w6", h: 38, delay: 0.25 },
  { id: "w7", h: 60, delay: 0.4 },
  { id: "w8", h: 44, delay: 0.35 },
  { id: "w9", h: 36, delay: 0.2 },
  { id: "w10", h: 56, delay: 0.45 },
  { id: "w11", h: 24, delay: 0.1 },
  { id: "w12", h: 40, delay: 0.3 },
  { id: "w13", h: 50, delay: 0.5 },
  { id: "w14", h: 30, delay: 0.15 },
  { id: "w15", h: 42, delay: 0.4 },
  { id: "w16", h: 22, delay: 0.05 },
  { id: "w17", h: 46, delay: 0.35 },
  { id: "w18", h: 32, delay: 0.2 },
];

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card pt-16 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-primary/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-primary/8 border border-primary/25 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-primary text-xs font-medium tracking-widest font-body">
            Now Streaming
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-1"
          style={{ color: "oklch(0.93 0.008 72)" }}
        >
          Your Vibe.
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-primary text-glow-gold leading-none mb-8"
        >
          BEATZFLARE.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-body text-base sm:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
        >
          Haryanvi. Punjabi. 90s. Bollywood. <br />
          <span className="text-foreground/70 text-sm">
            All the music that moves you — streaming right here.
          </span>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onExplore}
          data-ocid="hero.primary_button"
          className="font-body bg-primary text-primary-foreground font-semibold tracking-wide text-sm px-10 py-3.5 rounded-full glow-gold-sm hover:brightness-105 transition-all"
        >
          Explore Music
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex items-end gap-1 mt-16 h-16"
          aria-hidden="true"
        >
          {WAVE_BARS.map((bar) => (
            <motion.div
              key={bar.id}
              className="w-1 rounded-full"
              style={{ backgroundColor: "oklch(0.74 0.135 70 / 0.3)" }}
              animate={{
                height: [`${bar.h * 0.5}px`, `${bar.h}px`, `${bar.h * 0.5}px`],
                opacity: [0.3, 0.65, 0.3],
              }}
              transition={{
                duration: 1.8 + bar.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: bar.delay,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
