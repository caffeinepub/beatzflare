import { Slider } from "@/components/ui/slider";
import type { Song } from "@/data/mockData";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { CATEGORY_PHOTOS } from "./SongCard";

interface PlayerBarProps {
  song: Song | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onVolumeChange: (vol: number) => void;
  onProgressChange: (prog: number) => void;
}

export default function PlayerBar({
  song,
  isPlaying,
  progress,
  volume,
  onTogglePlay,
  onNext,
  onPrev,
  onVolumeChange,
  onProgressChange,
}: PlayerBarProps) {
  if (!song) return null;

  const thumbnail = CATEGORY_PHOTOS[song.category];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-4 py-2.5"
      style={{
        background: "oklch(0.085 0.008 52 / 0.96)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid oklch(0.19 0.008 52 / 0.8)",
      }}
      data-ocid="player.panel"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-4">
        {/* Song info with thumbnail */}
        <div className="flex items-center gap-3 min-w-0 w-48 sm:w-56 flex-shrink-0">
          <div
            className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 shadow-md"
            style={{ border: "1px solid oklch(0.19 0.008 52)" }}
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={song.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${song.gradient} flex items-center justify-center`}
              >
                <span className="text-lg">🎵</span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p
              className="font-body text-sm font-semibold truncate leading-snug"
              style={{ color: "oklch(0.93 0.006 70)" }}
            >
              {song.title}
            </p>
            <p
              className="font-body text-xs truncate mt-0.5"
              style={{ color: "oklch(0.72 0.13 68 / 0.75)" }}
            >
              {song.artist}
            </p>
          </div>
        </div>

        {/* Controls + progress */}
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={onPrev}
              data-ocid="player.secondary_button"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onTogglePlay}
              data-ocid="player.primary_button"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:brightness-110 transition-all glow-gold-sm"
              style={{ background: "oklch(0.72 0.13 68)" }}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-black text-black" />
              ) : (
                <Play className="w-4 h-4 fill-black text-black ml-0.5" />
              )}
            </button>
            <button
              type="button"
              onClick={onNext}
              data-ocid="player.secondary_button"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          <Slider
            value={[progress]}
            max={100}
            onValueChange={([v]) => onProgressChange(v)}
            className="w-full"
            data-ocid="player.toggle"
          />
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 w-32 flex-shrink-0">
          <button
            type="button"
            onClick={() => onVolumeChange(volume === 0 ? 75 : 0)}
            data-ocid="player.secondary_button"
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            {volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <Slider
            value={[volume]}
            max={100}
            onValueChange={([v]) => onVolumeChange(v)}
            className="flex-1"
            data-ocid="player.toggle"
          />
        </div>
      </div>
    </div>
  );
}
