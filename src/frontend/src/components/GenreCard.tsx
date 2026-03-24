import type { genres } from "@/data/mockData";
import { motion } from "motion/react";

type Genre = (typeof genres)[number];

interface GenreCardProps {
  genre: Genre;
  onClick: () => void;
  index: number;
}

const genreGradients: Record<string, string> = {
  haryanvi: "linear-gradient(155deg, #1c1000 0%, #2e1b04 60%, #0b0900 100%)",
  punjabi: "linear-gradient(155deg, #001c12 0%, #003425 60%, #000e09 100%)",
  bollywood: "linear-gradient(155deg, #1c0008 0%, #360016 60%, #0b0004 100%)",
  "90s": "linear-gradient(155deg, #0b001c 0%, #1c0036 60%, #060008 100%)",
  sad: "linear-gradient(155deg, #001018 0%, #00213a 60%, #00090f 100%)",
  top100: "linear-gradient(155deg, #1c1100 0%, #362200 60%, #0e0900 100%)",
  masoom: "linear-gradient(155deg, #130016 0%, #26002c 60%, #090010 100%)",
  sapna: "linear-gradient(155deg, #0e0016 0%, #1e002e 60%, #07000a 100%)",
  renuka: "linear-gradient(155deg, #160900 0%, #2c1000 60%, #0b0400 100%)",
};

function getGradient(id: string): string {
  return genreGradients[id] ?? "linear-gradient(155deg, #1c1100, #0b0900)";
}

export default function GenreCard({ genre, onClick, index }: GenreCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      data-ocid={`genre.card.${index + 1}`}
      className="relative group overflow-hidden rounded-xl w-full text-left cursor-pointer transition-all duration-300"
      style={{
        background: getGradient(genre.id),
        border: "1px solid oklch(0.19 0.008 52)",
        minHeight: "148px",
      }}
    >
      {/* Hover gold border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 0 1px oklch(0.72 0.13 68 / 0.5), 0 0 20px oklch(0.72 0.13 68 / 0.12)",
        }}
      />

      {/* Content */}
      <div
        className="flex flex-col items-center justify-center gap-3 p-5 h-full"
        style={{ minHeight: "148px" }}
      >
        {/* Icon — clean, no border-box */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{ background: "oklch(0.72 0.13 68 / 0.09)" }}
        >
          {genre.icon}
        </div>

        <div className="text-center min-w-0 w-full">
          <h3
            className="font-display text-[13px] font-black uppercase tracking-widest leading-tight"
            style={{ color: "oklch(0.82 0.13 68)" }}
          >
            {genre.label}
          </h3>
          <p className="font-body text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-snug opacity-70">
            {genre.description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
