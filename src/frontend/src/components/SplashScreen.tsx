import { motion } from "motion/react";
import { useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "oklch(0.08 0.007 55)" }}
    >
      {/* Warm ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[130px]"
          style={{ background: "oklch(0.72 0.14 72 / 0.07)" }}
        />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", damping: 16 }}
        className="relative flex flex-col items-center gap-5"
      >
        {/* Logo image */}
        <img
          src="/assets/generated/beatzflare-logo.dim_600x400.png"
          alt="BEATZFLARE"
          className="w-64 h-auto mx-auto"
        />

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-2 w-40 h-px rounded-full overflow-hidden"
          style={{ background: "oklch(0.72 0.14 72 / 0.12)" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.9, duration: 1.6, ease: "easeInOut" }}
            className="h-full rounded-full"
            style={{ background: "oklch(0.72 0.14 72)" }}
          />
        </motion.div>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-1"
        >
          <p className="text-xs text-muted-foreground/60">
            Developed by{" "}
            <span className="text-primary font-medium">Adarsh Chaudhary</span>
          </p>
          <p className="text-xs text-muted-foreground/60 mt-0.5">
            Powered by{" "}
            <span className="text-primary font-medium">
              MR. DINESH KUMAR CHAUDHARY
            </span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
