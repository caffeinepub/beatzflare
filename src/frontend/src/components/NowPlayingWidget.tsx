import { Slider } from "@/components/ui/slider";
import type { Song } from "@/data/mockData";
import { Heart, Pause, Play, SkipBack, SkipForward } from "lucide-react";

interface NowPlayingWidgetProps {
  song: Song | null;
  isPlaying: boolean;
  progress: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function NowPlayingWidget({
  song,
  isPlaying,
  progress,
  onTogglePlay,
  onNext,
  onPrev,
}: NowPlayingWidgetProps) {
  if (!song) {
    return (
      <div className="rounded-2xl bg-card border border-border/30 p-6 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-3">
          <span className="text-3xl">🎵</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Select a song to start playing
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl bg-card border border-primary/20 p-6 flex flex-col gap-4 h-full"
      data-ocid="player.panel"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-primary">
        NOW PLAYING
      </p>

      {/* Album art */}
      <div
        className={`relative rounded-xl overflow-hidden aspect-square w-full bg-gradient-to-br ${song.gradient} flex items-center justify-center`}
      >
        <span className="text-6xl">{isPlaying ? "🎵" : "🎶"}</span>
        {isPlaying && (
          <div className="absolute inset-0 bg-black/10 animate-pulse" />
        )}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-bold text-foreground truncate">{song.title}</p>
          <p className="text-sm text-muted-foreground truncate">
            {song.artist}
          </p>
        </div>
        <button
          type="button"
          className="flex-shrink-0 text-muted-foreground hover:text-red-400 transition-colors"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Progress */}
      <div className="space-y-1">
        <Slider
          value={[progress]}
          max={100}
          className="w-full"
          data-ocid="player.toggle"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0:00</span>
          <span>{song.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          data-ocid="player.secondary_button"
          className="text-muted-foreground hover:text-white transition-colors"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={onTogglePlay}
          data-ocid="player.primary_button"
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center glow-gold-sm hover:brightness-110 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
          ) : (
            <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
          )}
        </button>
        <button
          type="button"
          onClick={onNext}
          data-ocid="player.secondary_button"
          className="text-muted-foreground hover:text-white transition-colors"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
