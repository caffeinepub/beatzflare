import type { genres } from "@/data/mockData";
import { motion } from "motion/react";

type Genre = (typeof genres)[number];

interface GenreCardProps {
  genre: Genre;
  onClick: () => void;
  index: number;
}

const genreGradients: Record<string, string> = {
  haryanvi: "linear-gradient(145deg, #1a0e02 0%, #2d1a04 50%, #0a0800 100%)",
  punjabi: "linear-gradient(145deg, #001a10 0%, #003320 50%, #000d08 100%)",
  bollywood: "linear-gradient(145deg, #1a0008 0%, #330015 50%, #0a0005 100%)",
  "90s": "linear-gradient(145deg, #0a001a 0%, #1a0033 50%, #050008 100%)",
  sad: "linear-gradient(145deg, #00101a 0%, #001f33 50%, #000810 100%)",
  top100: "linear-gradient(145deg, #1a1000 0%, #332000 50%, #0d0800 100%)",
  masoom: "linear-gradient(145deg, #120014 0%, #240029 50%, #080010 100%)",
  sapna: "linear-gradient(145deg, #0d0014 0%, #1c0029 50%, #060009 100%)",
  renuka: "linear-gradient(145deg, #140800 0%, #280f00 50%, #0a0300 100%)",
};

function getGradient(id: string): string {
  return genreGradients[id] ?? "linear-gradient(145deg, #1a1000, #0a0800)";
}

export default function GenreCard({ genre, onClick, index }: GenreCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      data-ocid={`genre.card.${index + 1}`}
      className="relative group overflow-hidden rounded-2xl w-full text-left cursor-pointer transition-all duration-300"
      style={{
        background: getGradient(genre.id),
        border: "1px solid rgba(212,160,23,0.15)",
        minHeight: "160px",
      }}
    >
      {/* Hover gold border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow:
            "0 0 0 1.5px rgba(212,160,23,0.6), 0 0 24px rgba(212,160,23,0.2)",
        }}
      />

      {/* Top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "linear-gradient(to right, transparent, #d4a017, transparent)",
        }}
      />

      {/* Content — centered vertically */}
      <div
        className="flex flex-col items-center justify-center gap-3 p-5 h-full"
        style={{ minHeight: "160px" }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: "rgba(212,160,23,0.1)",
            border: "1px solid rgba(212,160,23,0.2)",
          }}
        >
          {genre.icon}
        </div>
        {/* Text */}
        <div className="text-center min-w-0 w-full">
          <h3
            className="text-sm font-black uppercase tracking-widest leading-tight group-hover:text-primary transition-colors"
            style={{ color: "#e8c560" }}
          >
            {genre.label}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-snug">
            {genre.description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
