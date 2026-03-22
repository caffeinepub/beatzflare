import type { genres } from "@/data/mockData";
import { motion } from "motion/react";

type Genre = (typeof genres)[number];

interface GenreCardProps {
  genre: Genre;
  onClick: () => void;
  index: number;
}

export default function GenreCard({ genre, onClick, index }: GenreCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      data-ocid={`genre.card.${index + 1}`}
      className="relative group overflow-hidden rounded-xl w-full text-left cursor-pointer card-warm transition-all duration-200 genre-accent"
    >
      <div className="p-5 flex items-center gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl group-hover:bg-primary/15 transition-colors">
          {genre.icon}
        </div>
        {/* Text */}
        <div className="min-w-0">
          <h3 className="text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
            {genre.label}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {genre.description}
          </p>
        </div>
        {/* Arrow */}
        <div className="ml-auto text-muted-foreground/40 group-hover:text-primary/60 transition-colors text-lg flex-shrink-0">
          ›
        </div>
      </div>
    </motion.button>
  );
}
