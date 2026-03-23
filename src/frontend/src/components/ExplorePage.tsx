import { genres, songs } from "@/data/mockData";
import type { Song } from "@/data/mockData";
import { motion } from "motion/react";
import GenreCard from "./GenreCard";
import SongCard from "./SongCard";

interface ExplorePageProps {
  onPlay: (song: Song) => void;
  onGenre: (genreId: string) => void;
  starredSongs: Set<string>;
  onToggleStar: (songId: string) => void;
}

export default function ExplorePage({
  onPlay,
  onGenre,
  starredSongs,
  onToggleStar,
}: ExplorePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-widest text-white mb-6">
          EXPLORE
        </h1>
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
      </div>

      {genres.map((genre) => {
        const genreSongs = songs.filter((s) => s.category === genre.category);
        return (
          <motion.div
            key={genre.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold uppercase tracking-widest text-white">
                {genre.icon} {genre.label}
              </h2>
              <button
                type="button"
                onClick={() => onGenre(genre.id)}
                data-ocid="explore.link"
                className="text-xs text-primary hover:text-primary/80 transition-colors font-semibold uppercase tracking-widest"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {genreSongs.map((song, i) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onPlay={onPlay}
                  index={i + 1}
                  isStarred={starredSongs.has(song.id)}
                  onToggleStar={onToggleStar}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
