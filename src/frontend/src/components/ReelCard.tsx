import type { Reel } from "@/data/mockData";
import { Eye, Heart, Play } from "lucide-react";

interface ReelCardProps {
  reel: Reel;
  onClick: () => void;
  index: number;
}

export default function ReelCard({ reel, onClick, index }: ReelCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`reel.item.${index + 1}`}
      className="group relative rounded-2xl overflow-hidden neon-border hover:shadow-2xl transition-all duration-300 cursor-pointer w-full text-left"
      style={{ aspectRatio: "9/16" }}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${reel.gradient}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-bold text-sm leading-tight">
          {reel.title}
        </p>
        <p className="text-white/70 text-xs mt-1">{reel.artist}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-xs text-white/60">
            <Eye className="w-3 h-3" /> {reel.views}
          </span>
          <span className="flex items-center gap-1 text-xs text-white/60">
            <Heart className="w-3 h-3" /> {reel.likes}
          </span>
        </div>
      </div>

      {/* Reel tag */}
      <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs text-primary font-semibold border border-primary/30">
        REEL
      </div>
    </button>
  );
}
