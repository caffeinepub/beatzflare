import type { Song } from "@/data/mockData";
import { Play, Star } from "lucide-react";

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
  index: number;
  isStarred?: boolean;
  onToggleStar?: (songId: string) => void;
  large?: boolean;
}

const CATEGORY_PHOTOS: Record<string, string> = {
  "Masoom Sharma": "/assets/generated/masoom-sharma.dim_400x400.jpg",
  "Sapna Chaudhary": "/assets/generated/sapna-chaudhary.dim_400x400.jpg",
  "Renuka Panwar": "/assets/generated/renuka-panwar.dim_400x400.jpg",
  "Haryanvi Hits": "/assets/generated/jaat-haryanvi.dim_400x400.jpg",
  "Punjabi Hits": "/assets/generated/jatt-punjabi.dim_400x400.jpg",
};

// Special photo overrides for specific songs (by song id)
const SONG_PHOTOS: Record<string, string> = {
  ms_am1: "/assets/generated/masoom-sharma-real.dim_400x400.jpg",
};

export default function SongCard({
  song,
  onPlay,
  index,
  isStarred = false,
  onToggleStar,
  large = false,
}: SongCardProps) {
  const sourceLabel =
    song.audiomackUrl && !song.soundcloudUrl
      ? "Songs by Audiomack"
      : "Songs by SoundCloud";

  const photo = SONG_PHOTOS[song.id] ?? CATEGORY_PHOTOS[song.category];

  return (
    <button
      type="button"
      onClick={() => onPlay(song)}
      data-ocid={`song.item.${index}`}
      className="group text-left w-full rounded-xl overflow-hidden card-warm transition-all duration-300 cursor-pointer relative song-card-hover"
    >
      {/* Rank badge */}
      <div
        className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
        style={{
          background: "linear-gradient(135deg, #d4a017, #92600a)",
          color: "#0a0a00",
        }}
      >
        {index}
      </div>

      {/* Artwork */}
      <div
        className={`relative w-full ${large ? "aspect-[4/3]" : "aspect-square"} bg-gradient-to-br ${song.gradient} flex items-center justify-center overflow-hidden`}
      >
        {photo ? (
          <img
            src={photo}
            alt={song.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <span className={`${large ? "text-6xl" : "text-4xl"} opacity-50`}>
            🎵
          </span>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #d4a017, #92600a)",
              boxShadow: "0 0 20px rgba(212,160,23,0.5)",
            }}
          >
            <Play className="w-5 h-5 fill-black text-black ml-0.5" />
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
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/80 z-10"
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
      <div className="p-3 pb-3.5 border-t border-transparent group-hover:border-primary/30 transition-colors">
        <p className="text-sm font-semibold text-foreground truncate leading-snug">
          {song.title}
        </p>
        <p
          className="text-xs truncate mt-0.5 font-medium"
          style={{ color: "#b8870f" }}
        >
          {song.artist}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-[10px] text-muted-foreground/60">
            {song.plays} plays
          </p>
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
            style={{
              background: "rgba(212,160,23,0.12)",
              color: "#d4a017",
              border: "1px solid rgba(212,160,23,0.25)",
            }}
          >
            {sourceLabel}
          </span>
        </div>
      </div>
    </button>
  );
}
