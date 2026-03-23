import { genres, songs } from "@/data/mockData";
import type { Song } from "@/data/mockData";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import GenreCard from "./GenreCard";
import HeroSection from "./HeroSection";
import NowPlayingWidget from "./NowPlayingWidget";
import SongCard from "./SongCard";

interface HomePageProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  onPlay: (song: Song) => void;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onGenre: (genreId: string) => void;
  onExplore: () => void;
}

export default function HomePage({
  currentSong,
  isPlaying,
  progress,
  onPlay,
  onTogglePlay,
  onNext,
  onPrev,
  onGenre,
  onExplore,
}: HomePageProps) {
  const justForYou = songs.slice(0, 10);

  return (
    <div className="pb-24">
      <HeroSection onExplore={onExplore} />

      {/* Featured Genres */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-xl font-black uppercase tracking-widest text-white mb-6"
        >
          FEATURED GENRES
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {genres.map((g, i) => (
            <GenreCard
              key={g.id}
              genre={g}
              onClick={() => onGenre(g.id)}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Just For You + Now Playing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xl font-black uppercase tracking-widest text-white"
              >
                JUST FOR YOU
              </motion.h2>
              <button
                type="button"
                onClick={onExplore}
                data-ocid="home.link"
                className="text-xs text-primary font-semibold uppercase tracking-widest hover:text-primary/80 transition-colors"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {justForYou.map((song, i) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onPlay={onPlay}
                  index={i + 1}
                />
              ))}
            </div>
          </div>
          {/* Now Playing */}
          <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <NowPlayingWidget
              song={currentSong}
              isPlaying={isPlaying}
              progress={progress}
              onTogglePlay={onTogglePlay}
              onNext={onNext}
              onPrev={onPrev}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
