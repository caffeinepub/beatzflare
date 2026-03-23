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
  action,
}: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-1 h-7 rounded-full flex-shrink-0"
        style={{ background: "linear-gradient(to bottom, #d4a017, #92600a)" }}
      />
      <h2 className="text-xl font-black uppercase tracking-widest text-white">
        {title}
      </h2>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, rgba(212,160,23,0.3), transparent)",
        }}
      />
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,160,23,0.25), transparent)",
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

      {/* NOW TRENDING marquee */}
      <div
        className="overflow-hidden border-y py-2.5 my-2"
        style={{
          background: "rgba(212,160,23,0.06)",
          borderColor: "rgba(212,160,23,0.18)",
        }}
      >
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {[
            ...TRENDING_NAMES.map((n) => ({ n, k: `a-${n}` })),
            ...TRENDING_NAMES.map((n) => ({ n, k: `b-${n}` })),
          ].map(({ n, k }) => (
            <span
              key={k}
              className="text-xs font-black tracking-[0.2em] uppercase inline-flex items-center gap-2"
              style={{ color: "#d4a017" }}
            >
              <span className="opacity-60">⬡</span> {n}
            </span>
          ))}
        </div>
      </div>

      {/* Favorites section */}
      {favoriteSongs.length > 0 && (
        <>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader title="My Favorites" />
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
                className="absolute right-0 top-0 bottom-2 w-16 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to left, oklch(0.09 0.008 55), transparent)",
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
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader title="Featured Genres" />
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

      {/* Just For You + Now Playing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
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
                    className="text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                    style={{ color: "#d4a017" }}
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

      <SectionDivider />

      {/* Masoom Sharma Hits */}
      {masoomSongs.length > 0 && (
        <>
          <section
            className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
            data-ocid="masoom.section"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                title="Masoom Sharma Hits"
                action={
                  <button
                    type="button"
                    onClick={() => onGenre("masoom")}
                    data-ocid="masoom.link"
                    className="text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                    style={{ color: "#d4a017" }}
                  >
                    View All 60 Songs
                  </button>
                }
              />
            </motion.div>
            <div className="relative">
              <div
                className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
                data-ocid="masoom.list"
              >
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
              <div
                className="absolute right-0 top-0 bottom-3 w-16 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to left, oklch(0.09 0.008 55), transparent)",
                }}
              />
            </div>
          </section>
          <SectionDivider />
        </>
      )}

      {/* Sapna Chaudhary Hits */}
      {sapnaSongs.length > 0 && (
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
          data-ocid="sapna.section"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title="Sapna Chaudhary Hits"
              action={
                <button
                  type="button"
                  onClick={() => onGenre("sapna")}
                  data-ocid="sapna.link"
                  className="text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                  style={{ color: "#d4a017" }}
                >
                  View All 15 Songs
                </button>
              }
            />
          </motion.div>
          <div className="relative">
            <div
              className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
              data-ocid="sapna.list"
            >
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
            <div
              className="absolute right-0 top-0 bottom-3 w-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, oklch(0.09 0.008 55), transparent)",
              }}
            />
          </div>
        </section>
      )}
    </div>
  );
}
