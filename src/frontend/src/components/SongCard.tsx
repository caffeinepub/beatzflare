import type { Song } from "@/data/mockData";
import { Download, Heart, Play } from "lucide-react";

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
  index: number;
  isStarred?: boolean;
  onToggleStar?: (songId: string) => void;
  large?: boolean;
  onDownload?: (song: Song) => void;
}

export const CATEGORY_PHOTOS: Record<string, string> = {
  "Masoom Sharma": "/assets/generated/masoom-sharma.dim_400x400.jpg",
  "Sapna Chaudhary": "/assets/generated/sapna-chaudhary.dim_400x400.jpg",
  "Renuka Panwar": "/assets/generated/renuka-panwar.dim_400x400.jpg",
  "Haryanvi Hits": "/assets/generated/jaat-haryanvi.dim_400x400.jpg",
  "Punjabi Hits": "/assets/generated/jatt-punjabi.dim_400x400.jpg",
  "Bollywood Hits": "/assets/generated/bollywood-hits.dim_400x400.jpg",
  "90s Hits": "/assets/generated/90s-hits.dim_400x400.jpg",
  "Sad Songs": "/assets/generated/sad-songs.dim_400x400.jpg",
  "Top 100": "/assets/generated/top-100.dim_400x400.jpg",
  VVIP: "/assets/generated/vvip-section.dim_400x400.jpg",
};

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
  onDownload,
}: SongCardProps) {
  const sourceLabel =
    song.audiomackUrl && !song.soundcloudUrl ? "Audiomack" : "SoundCloud";

  const photo = SONG_PHOTOS[song.id] ?? CATEGORY_PHOTOS[song.category];

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownload) {
      onDownload(song);
    } else {
      const url = song.audiomackUrl || song.soundcloudUrl;
      if (url) window.open(url, "_blank", "noopener");
    }
  };

  return (
    <button
      type="button"
      onClick={() => onPlay(song)}
      data-ocid={`song.item.${index}`}
      className="group text-left w-full rounded-xl overflow-hidden card-warm transition-all duration-250 cursor-pointer relative song-card-hover"
    >
      {/* Rank badge */}
      <div
        className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full flex items-center justify-center font-black font-display"
        style={{
          fontSize: "9px",
          background:
            "linear-gradient(135deg, oklch(0.72 0.13 68), oklch(0.54 0.11 62))",
          color: "oklch(0.07 0.005 48)",
          boxShadow: "0 1px 4px oklch(0 0 0 / 0.5)",
        }}
      >
        {index}
      </div>

      {/* Artwork */}
      <div
        className={`relative w-full ${
          large ? "aspect-[4/3]" : "aspect-square"
        } bg-gradient-to-br ${song.gradient} flex items-center justify-center overflow-hidden`}
      >
        {photo ? (
          <img
            src={photo}
            alt={song.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className={`${large ? "text-6xl" : "text-4xl"} opacity-40`}>
            🎵
          </span>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
            style={{
              background: "oklch(0.72 0.13 68)",
              boxShadow: "0 0 16px oklch(0.72 0.13 68 / 0.45)",
            }}
          >
            <Play className="w-4 h-4 fill-black text-black ml-0.5" />
          </div>
        </div>

        {/* Like button — always visible on mobile, fade in on desktop hover */}
        {onToggleStar && (
          <button
            type="button"
            data-ocid={`song.toggle.${index}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(song.id);
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center opacity-100 md:opacity-50 md:group-hover:opacity-100 transition-opacity hover:bg-black/75 z-10 backdrop-blur-sm"
            aria-label={isStarred ? "Unlike" : "Like"}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isStarred ? "fill-rose-500 text-rose-500" : "text-white/80"
              }`}
            />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-body text-sm font-semibold text-foreground truncate leading-snug">
          {song.title}
        </p>
        <p
          className="font-body text-xs truncate mt-0.5 font-medium"
          style={{ color: "oklch(0.72 0.13 68 / 0.85)" }}
        >
          {song.artist}
        </p>
        <div className="flex items-center justify-between mt-2">
          <p className="font-body text-[10px] text-muted-foreground/50">
            {song.plays} plays
          </p>
          <div className="flex items-center gap-1.5">
            {/* Download */}
            <button
              type="button"
              data-ocid={`song.download.${index}`}
              onClick={handleDownload}
              className="w-5 h-5 rounded flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-primary/15 transition-all"
              aria-label="Download song"
            >
              <Download
                className="w-3 h-3"
                style={{ color: "oklch(0.72 0.13 68)" }}
              />
            </button>
            <span
              className="font-body text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
              style={{
                background: "oklch(0.72 0.13 68 / 0.08)",
                color: "oklch(0.72 0.13 68 / 0.7)",
                border: "1px solid oklch(0.72 0.13 68 / 0.15)",
              }}
            >
              {sourceLabel}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
