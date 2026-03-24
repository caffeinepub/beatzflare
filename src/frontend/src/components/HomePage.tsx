import { genres, songs } from "@/data/mockData";
import type { Song } from "@/data/mockData";
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
  starredSongs: Set<string>;
  onToggleStar: (songId: string) => void;
}

const TRENDING_NAMES = [
  "HARYANVI HITS",
  "PUNJABI HITS",
  "MASOOM SHARMA",
  "SAPNA CHAUDHARY",
  "RENUKA PANWAR",
  "90S HITS",
  "BOLLYWOOD HITS",
  "SAD SONGS",
  "TOP 100",
];

function SectionHeader({
  title,
  count,
  action,
}: { title: string; count?: number; action?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="section-header">{title}</h2>
      {count !== undefined && (
        <span
          className="font-body text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.72 0.13 68 / 0.1)",
            color: "oklch(0.72 0.13 68 / 0.7)",
            border: "1px solid oklch(0.72 0.13 68 / 0.15)",
          }}
        >
          {count}
        </span>
      )}
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, oklch(0.72 0.13 68 / 0.18), transparent)",
        }}
      />
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-0.5">
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.19 0.008 52), transparent)",
        }}
      />
    </div>
  );
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
  starredSongs,
  onToggleStar,
}: HomePageProps) {
  const justForYou = songs.slice(0, 10);
  const favoriteSongs = songs.filter((s) => starredSongs.has(s.id));
  const masoomSongs = songs
    .filter((s) => s.category === "Masoom Sharma")
    .slice(0, 10);
  const sapnaSongs = songs
    .filter((s) => s.category === "Sapna Chaudhary")
    .slice(0, 10);

  return (
    <div className="pb-24">
      <HeroSection onExplore={onExplore} />

      {/* NOW TRENDING marquee — refined, subtle */}
      <div
        className="overflow-hidden py-2 my-0"
        style={{
          background: "oklch(0.72 0.13 68 / 0.04)",
          borderTop: "1px solid oklch(0.72 0.13 68 / 0.12)",
          borderBottom: "1px solid oklch(0.72 0.13 68 / 0.12)",
        }}
      >
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[
            ...TRENDING_NAMES.map((n) => ({ n, k: `a-${n}` })),
            ...TRENDING_NAMES.map((n) => ({ n, k: `b-${n}` })),
          ].map(({ n, k }) => (
            <span
              key={k}
              className="font-body text-[11px] font-bold tracking-[0.18em] uppercase inline-flex items-center gap-2"
              style={{ color: "oklch(0.72 0.13 68 / 0.65)" }}
            >
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: "oklch(0.72 0.13 68 / 0.5)" }}
              />
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Favorites */}
      {favoriteSongs.length > 0 && (
        <>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                title="My Favorites"
                count={favoriteSongs.length}
              />
            </motion.div>
            <div className="relative">
              <div
                className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
                data-ocid="favorites.list"
              >
                {favoriteSongs.map((song, i) => (
                  <div key={song.id} className="flex-shrink-0 w-40">
                    <SongCard
                      song={song}
                      onPlay={onPlay}
                      index={i + 1}
                      isStarred={true}
                      onToggleStar={onToggleStar}
                    />
                  </div>
                ))}
              </div>
              <div
                className="absolute right-0 top-0 bottom-2 w-12 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to left, oklch(0.07 0.005 48), transparent)",
                }}
              />
            </div>
          </section>
          <SectionDivider />
        </>
      )}

      {/* Featured Genres */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader title="Featured Genres" count={genres.length} />
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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

      <SectionDivider />

      {/* Just For You */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                title="Just For You"
                action={
                  <button
                    type="button"
                    onClick={onExplore}
                    data-ocid="home.link"
                    className="font-body text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-75"
                    style={{ color: "oklch(0.72 0.13 68)" }}
                  >
                    View All
                  </button>
                }
              />
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {justForYou.map((song, i) => (
                <div
                  key={song.id}
                  className={i === 0 ? "col-span-2 row-span-2" : ""}
                >
                  <SongCard
                    song={song}
                    onPlay={onPlay}
                    index={i + 1}
                    isStarred={starredSongs.has(song.id)}
                    onToggleStar={onToggleStar}
                    large={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Now Playing Widget */}
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

      <SectionDivider />

      {/* Masoom Sharma */}
      {masoomSongs.length > 0 && (
        <>
          <section
            className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
            data-ocid="masoom.section"
          >
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                title="Masoom Sharma Hits"
                count={masoomSongs.length}
                action={
                  <button
                    type="button"
                    onClick={() => onGenre("masoom")}
                    data-ocid="masoom.link"
                    className="font-body text-xs font-semibold uppercase tracking-widest hover:opacity-75 transition-opacity"
                    style={{ color: "oklch(0.72 0.13 68)" }}
                  >
                    View All
                  </button>
                }
              />
            </motion.div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {masoomSongs.map((song, i) => (
                <div key={song.id} className="flex-shrink-0 w-40">
                  <SongCard
                    song={song}
                    onPlay={onPlay}
                    index={i + 1}
                    isStarred={starredSongs.has(song.id)}
                    onToggleStar={onToggleStar}
                  />
                </div>
              ))}
            </div>
          </section>
          <SectionDivider />
        </>
      )}

      {/* Sapna Chaudhary */}
      {sapnaSongs.length > 0 && (
        <>
          <section
            className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
            data-ocid="sapna.section"
          >
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                title="Sapna Chaudhary"
                count={sapnaSongs.length}
                action={
                  <button
                    type="button"
                    onClick={() => onGenre("sapna")}
                    data-ocid="sapna.link"
                    className="font-body text-xs font-semibold uppercase tracking-widest hover:opacity-75 transition-opacity"
                    style={{ color: "oklch(0.72 0.13 68)" }}
                  >
                    View All
                  </button>
                }
              />
            </motion.div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {sapnaSongs.map((song, i) => (
                <div key={song.id} className="flex-shrink-0 w-40">
                  <SongCard
                    song={song}
                    onPlay={onPlay}
                    index={i + 1}
                    isStarred={starredSongs.has(song.id)}
                    onToggleStar={onToggleStar}
                  />
                </div>
              ))}
            </div>
          </section>
          <SectionDivider />
        </>
      )}
    </div>
  );
}
