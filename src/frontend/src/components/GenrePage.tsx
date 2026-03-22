import { genres, songs } from "@/data/mockData";
import type { Song } from "@/data/mockData";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import SongCard from "./SongCard";

interface GenrePageProps {
  genreId: string;
  onBack: () => void;
  onPlay: (song: Song) => void;
}

export default function GenrePage({ genreId, onBack, onPlay }: GenrePageProps) {
  const genre = genres.find((g) => g.id === genreId);
  const genreSongs = songs.filter((s) => s.category === genreId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        data-ocid="genre.secondary_button"
        className="flex items-center gap-2 text-muted-foreground hover:text-white mb-6 transition-colors"
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
            <div className="text-5xl mb-3">{genre.icon}</div>
            <h1 className="text-4xl font-black text-white">{genre.label}</h1>
            <p className="text-white/70 mt-2">{genre.description}</p>
            <p className="text-white/50 text-sm mt-1">
              {genreSongs.length} songs
            </p>
          </div>
        </motion.div>
      )}

      <h2 className="text-lg font-bold uppercase tracking-widest text-white mb-4">
        Songs
      </h2>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        data-ocid="genre.list"
      >
        {genreSongs.map((song, i) => (
          <SongCard key={song.id} song={song} onPlay={onPlay} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
