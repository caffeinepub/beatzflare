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
      className="group text-left w-full rounded-xl overflow-hidden card-warm transition-all duration-300 cursor-pointer relative song-card-hover"
    >
      {/* Rank badge */}
      <div
        className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black font-display"
        style={{
          background: "linear-gradient(135deg, #d4a017, #92600a)",
          color: "#0a0a00",
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

        {/* Like (Heart) button */}
        {onToggleStar && (
          <button
            type="button"
            data-ocid={`song.toggle.${index}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(song.id);
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/80 z-10"
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
      <div className="p-3 pb-3.5 border-t border-transparent group-hover:border-primary/30 transition-colors">
        <p className="font-body text-sm font-semibold text-foreground truncate leading-snug">
          {song.title}
        </p>
        <p
          className="font-body text-xs truncate mt-0.5 font-medium"
          style={{ color: "#b8870f" }}
        >
          {song.artist}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <p className="font-body text-[10px] text-muted-foreground/60">
            {song.plays} plays
          </p>
          <div className="flex items-center gap-1.5">
            {/* Download button */}
            <button
              type="button"
              data-ocid={`song.download.${index}`}
              onClick={handleDownload}
              className="w-5 h-5 rounded flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Download song"
              title="Download / Open source"
            >
              <Download
                className="w-3 h-3"
                style={{ color: "oklch(0.74 0.135 70 / 0.7)" }}
              />
            </button>
            <span
              className="font-body text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
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
      </div>
    </button>
  );
}
