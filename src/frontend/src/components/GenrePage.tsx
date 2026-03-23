import { genres, songs } from "@/data/mockData";
import type { Song } from "@/data/mockData";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import SongCard, { CATEGORY_PHOTOS } from "./SongCard";

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

  const heroPhoto = genre ? CATEGORY_PHOTOS[genre.category] : null;

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
          className={`relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br ${genre.gradient}`}
          style={{ minHeight: "180px" }}
        >
          {/* Background image if available */}
          {heroPhoto && (
            <img
              src={heroPhoto}
              alt={genre.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative flex items-center gap-6 p-8">
            {/* Section image thumbnail */}
            {heroPhoto && (
              <div
                className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 shadow-xl hidden sm:block"
                style={{
                  borderColor: "oklch(0.74 0.135 70 / 0.5)",
                  boxShadow: "0 0 30px oklch(0.74 0.135 70 / 0.3)",
                }}
              >
                <img
                  src={heroPhoto}
                  alt={genre.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <div className="text-4xl mb-2">{genre.emoji}</div>
              <h1 className="font-display text-4xl font-black text-white tracking-tight">
                {genre.name}
              </h1>
              <p className="font-body text-white/60 text-sm mt-1">
                {genreSongs.length} songs
              </p>
            </div>
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
