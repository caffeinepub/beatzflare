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

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/25 px-4 py-3"
      style={{
        background: "oklch(0.095 0.009 55 / 0.97)",
        backdropFilter: "blur(16px)",
        // Subtle warm gradient overlay
        backgroundImage:
          "linear-gradient(to right, oklch(0.72 0.14 72 / 0.025) 0%, transparent 30%, transparent 70%, oklch(0.72 0.14 72 / 0.025) 100%)",
      }}
      data-ocid="player.panel"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Song info — larger album art */}
        <div className="flex items-center gap-3 min-w-0 w-52 flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${song.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
          >
            <span className="text-xl">🎵</span>
          </div>
          <div className="min-w-0">
            <p
              className="text-sm font-semibold truncate"
              style={{ color: "oklch(0.93 0.008 72)" }}
            >
              {song.title}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {song.artist}
            </p>
          </div>
        </div>

        {/* Controls + progress */}
        <div className="flex-1 flex flex-col gap-2">
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
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:brightness-110 transition-all glow-gold-sm"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
              ) : (
                <Play className="w-4 h-4 text-primary-foreground fill-primary-foreground ml-0.5" />
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
        <div className="hidden sm:flex items-center gap-2.5 w-36 flex-shrink-0">
          <button
            type="button"
            onClick={() => onVolumeChange(volume === 0 ? 75 : 0)}
            data-ocid="player.secondary_button"
            className="text-muted-foreground hover:text-foreground transition-colors"
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
