import { reels } from "@/data/mockData";
import type { Reel } from "@/data/mockData";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Pause,
  Play,
  Share2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface ReelViewerProps {
  initialReel: Reel;
  onClose: () => void;
}

export default function ReelViewer({ initialReel, onClose }: ReelViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(
    reels.findIndex((r) => r.id === initialReel.id),
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);

  const currentReel = reels[currentIndex];

  const goNext = () =>
    setCurrentIndex((i) => Math.min(i + 1, reels.length - 1));
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      data-ocid="reel.modal"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        data-ocid="reel.close_button"
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Navigation arrows */}
      <button
        type="button"
        onClick={goPrev}
        disabled={currentIndex === 0}
        data-ocid="reel.secondary_button"
        className="absolute top-1/2 left-4 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={goNext}
        disabled={currentIndex === reels.length - 1}
        data-ocid="reel.secondary_button"
        className="absolute top-1/2 right-4 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
      >
        <ChevronDown className="w-5 h-5" />
      </button>

      {/* Reel content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentReel.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="relative w-full max-w-sm h-[85vh] rounded-2xl overflow-hidden"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-b ${currentReel.gradient}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Play/pause center */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            data-ocid="reel.toggle"
            className="absolute inset-0 flex items-center justify-center"
          >
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Side actions */}
          <div className="absolute right-4 bottom-24 flex flex-col gap-5 items-center">
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              data-ocid="reel.toggle"
              className="flex flex-col items-center gap-1"
            >
              <Heart
                className={`w-7 h-7 ${liked ? "text-red-500 fill-red-500" : "text-white"} transition-colors`}
              />
              <span className="text-xs text-white/80">{currentReel.likes}</span>
            </button>
            <button
              type="button"
              data-ocid="reel.secondary_button"
              className="flex flex-col items-center gap-1"
            >
              <Share2 className="w-7 h-7 text-white" />
              <span className="text-xs text-white/80">Share</span>
            </button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-6 left-4 right-16">
            <p className="text-white font-bold text-lg leading-tight">
              {currentReel.title}
            </p>
            <p className="text-white/70 text-sm mt-1">{currentReel.artist}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-primary/20 border border-primary/40 text-primary text-xs px-2 py-0.5 rounded-full">
                {currentReel.category}
              </span>
            </div>
          </div>

          {/* Reel counter */}
          <div className="absolute top-4 left-4 text-white/60 text-xs">
            {currentIndex + 1} / {reels.length}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
