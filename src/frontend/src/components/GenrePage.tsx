import { genres, songs } from "@/data/mockData";
import type { Song } from "@/data/mockData";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import SongCard from "./SongCard";

interface GenrePageProps {
  genreId: string;
  onBack: () => void;
  onPlay: (song: Song) => void;
  starredSongs: Set<string>;
  onToggleStar: (songId: string) => void;
}

export default function GenrePage({
  genreId,
  onBack,
  onPlay,
  starredSongs,
  onToggleStar,
}: GenrePageProps) {
  const genre = genres.find((g) => g.id === genreId);
  const genreSongs = genre
    ? songs.filter((s) => s.category === genre.category)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        data-ocid="genre.secondary_button"
        className="flex items-center gap-2 text-muted-foreground hover:text-white mb-6 transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Genre hero */}
      {genre && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative rounded-2xl overflow-hidden mb-8 p-8 bg-gradient-to-br ${genre.gradient}`}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative">
            <div className="text-5xl mb-3">{genre.emoji}</div>
            <h1 className="font-display text-4xl font-black text-white tracking-tight">
              {genre.name}
            </h1>
            <p className="font-body text-white/50 text-sm mt-1">
              {genreSongs.length} songs
            </p>
          </div>
        </motion.div>
      )}

      <h2 className="font-display text-lg font-bold uppercase tracking-widest text-white mb-4">
        Songs
      </h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        data-ocid="genre.list"
      >
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
        {genreSongs.length === 0 && (
          <div
            className="col-span-full text-center py-16 text-muted-foreground font-body"
            data-ocid="genre.empty_state"
          >
            No songs found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
