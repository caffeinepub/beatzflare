import type { Song } from "@/data/mockData";
import { Play, Star } from "lucide-react";

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
  index: number;
  isStarred?: boolean;
  onToggleStar?: (songId: string) => void;
}

export default function SongCard({
  song,
  onPlay,
  index,
  isStarred = false,
  onToggleStar,
}: SongCardProps) {
  return (
    <button
      type="button"
      onClick={() => onPlay(song)}
      data-ocid={`song.item.${index}`}
      className="group text-left w-full rounded-xl overflow-hidden card-warm transition-all duration-200 cursor-pointer"
    >
      {/* Artwork */}
      <div
        className={`relative w-full aspect-square bg-gradient-to-br ${song.gradient} flex items-center justify-center`}
      >
        <span className="text-4xl opacity-50">🎵</span>
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center glow-gold-sm transition-transform group-hover:scale-105">
            <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground ml-0.5" />
          </div>
        </div>
        {/* Star button */}
        {onToggleStar && (
          <button
            type="button"
            data-ocid={`song.toggle.${index}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(song.id);
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
            aria-label={
              isStarred ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Star
              className={`w-3.5 h-3.5 transition-colors ${
                isStarred ? "fill-yellow-400 text-yellow-400" : "text-white/80"
              }`}
            />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3 pb-3.5">
        <p className="text-sm font-semibold text-foreground truncate leading-snug">
          {song.title}
        </p>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {song.artist}
        </p>
        <p className="text-[11px] text-muted-foreground/60 mt-1">
          {song.plays} plays
        </p>
      </div>
    </button>
  );
}
