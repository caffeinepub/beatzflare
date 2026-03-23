import type { Song } from "@/data/mockData";
import { Music2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface MediaPlayerModalProps {
  song: Song;
  onClose: () => void;
}

type MediaType =
  | "soundcloud_direct"
  | "soundcloud_search"
  | "audiomack"
  | "audiomack_search"
  | null;

function getMediaType(song: Song): MediaType {
  if (song.audiomackUrl) {
    if (song.audiomackUrl.includes("/search/")) return "audiomack_search";
    return "audiomack";
  }
  if (song.soundcloudUrl) {
    if (song.soundcloudUrl.includes("/search?")) return "soundcloud_search";
    return "soundcloud_direct";
  }
  return null;
}

function getAudiomackEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    const parts = u.pathname.replace(/^\//, "").split("/");
    if (parts.length >= 3) {
      const type = parts[1] === "playlist" ? "playlist" : "song";
      return `https://audiomack.com/embed/${type}/${parts[0]}/${parts[2]}`;
    }
  } catch (_) {
    // ignore
  }
  return url;
}

function getSoundCloudEmbedUrl(rawUrl: string): string {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(rawUrl)}&auto_play=true&color=%23C9A84C&hide_related=true&show_comments=false&show_user=false&show_reposts=false&buying=false&sharing=false&download=false&show_playcount=false&show_teaser=false&visual=false&show_artwork=false&start_track=0&single_active=true`;
}

const BARS: { id: string; h: number; dur: number }[] = [
  { id: "v-a", h: 3, dur: 0.6 },
  { id: "v-b", h: 6, dur: 0.65 },
  { id: "v-c", h: 9, dur: 0.7 },
  { id: "v-d", h: 5, dur: 0.75 },
  { id: "v-e", h: 8, dur: 0.8 },
  { id: "v-f", h: 4, dur: 0.85 },
  { id: "v-g", h: 7, dur: 0.9 },
  { id: "v-h", h: 10, dur: 0.95 },
  { id: "v-i", h: 6, dur: 1.0 },
  { id: "v-j", h: 3, dur: 1.05 },
  { id: "v-k", h: 8, dur: 1.1 },
  { id: "v-l", h: 5, dur: 1.15 },
];

const BG = "oklch(0.12 0.009 55)";

export default function MediaPlayerModal({
  song,
  onClose,
}: MediaPlayerModalProps) {
  const mediaType = getMediaType(song);
  if (!mediaType) return null;

  const isDirect = mediaType === "soundcloud_direct";
  const isSearch = mediaType === "soundcloud_search";
  const isAudiomack = mediaType === "audiomack";
  const isAudiomackSearch = mediaType === "audiomack_search";

  const scUrl = song.soundcloudUrl ?? "";
  const scEmbedSrc = isDirect ? getSoundCloudEmbedUrl(scUrl) : "";
  const amEmbedSrc =
    isAudiomack && song.audiomackUrl
      ? getAudiomackEmbedUrl(song.audiomackUrl)
      : "";

  const searchQuery = isSearch
    ? (() => {
        try {
          return new URL(scUrl).searchParams.get("q") ?? song.title;
        } catch (_) {
          return song.title;
        }
      })()
    : "";

  // SoundCloud search embed URL using their search endpoint
  const scSearchEmbed = isSearch
    ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(`https://soundcloud.com/search?q=${encodeURIComponent(searchQuery)}`)}&auto_play=false&color=%23C9A84C&hide_related=true&show_comments=false&buying=false&sharing=false&download=false&show_playcount=false&show_teaser=false&visual=true&show_artwork=true`
    : "";

  return (
    <AnimatePresence>
      <motion.div
        key="media-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
        onClick={onClose}
        data-ocid="media.modal"
      >
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 16 }}
          transition={{ duration: 0.25, type: "spring", damping: 22 }}
          className="relative w-full mx-4 max-w-[480px]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4 px-1">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2
                  className="text-lg font-bold"
                  style={{ color: "oklch(0.93 0.008 72)" }}
                >
                  {song.title}
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/15 border border-primary/35 text-primary text-xs font-black tracking-widest">
                  BT
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
              <p className="text-xs" style={{ color: "oklch(0.6 0.08 72)" }}>
                {isAudiomack || isAudiomackSearch
                  ? "Songs by Audiomack"
                  : "Songs by SoundCloud"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              data-ocid="media.close_button"
              className="ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-secondary/60 hover:bg-secondary border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* SoundCloud Direct Player */}
          {isDirect && (
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/30">
              <div
                className={`relative w-full bg-gradient-to-br ${song.gradient} flex flex-col items-center justify-center gap-4 py-8`}
              >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/8 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Music2 className="w-7 h-7 text-white/70" />
                  </div>
                  <div className="flex items-end gap-1 h-8">
                    {BARS.map((bar) => (
                      <motion.div
                        key={bar.id}
                        className="w-1 rounded-full bg-primary/60"
                        animate={{
                          height: [
                            `${bar.h * 2.5}px`,
                            `${((bar.h * 2.5 + 8) % 32) + 6}px`,
                            `${bar.h * 2.5}px`,
                          ],
                        }}
                        transition={{
                          duration: bar.dur,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="relative w-full"
                style={{ height: "166px", background: BG }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={scEmbedSrc}
                  title={song.title}
                />
                {/* Block only the bottom "Play on SoundCloud" link - NOT the play button */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10"
                  style={{
                    height: "22px",
                    background: BG,
                    pointerEvents: "all",
                  }}
                />
                {/* Block only the far-right SoundCloud logo area */}
                <div
                  className="absolute top-0 right-0 z-10"
                  style={{
                    width: "140px",
                    height: "30px",
                    background: BG,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* SoundCloud Search — show search results, user taps to play */}
          {isSearch && (
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/30">
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-b border-border/25"
                style={{ background: BG }}
              >
                <span className="text-primary font-black text-sm tracking-widest">
                  BT
                </span>
                <span className="text-border/60 mx-1">·</span>
                <span className="text-muted-foreground text-xs truncate">
                  {song.title}
                </span>
                <span className="ml-auto text-muted-foreground/50 text-xs">
                  Tap to play
                </span>
              </div>
              <div style={{ height: "400px", background: BG }}>
                <iframe
                  src={scSearchEmbed}
                  className="w-full"
                  style={{ height: "400px" }}
                  allow="autoplay"
                  title={song.title}
                />
              </div>
              <div
                className="flex items-center justify-center gap-2 px-4 py-2"
                style={{ background: BG }}
              >
                <div className="flex items-end gap-1 h-4">
                  {BARS.slice(0, 7).map((bar) => (
                    <motion.div
                      key={bar.id}
                      className="w-1 rounded-full bg-primary/40"
                      animate={{
                        height: [
                          `${bar.h}px`,
                          `${((bar.h + 4) % 12) + 3}px`,
                          `${bar.h}px`,
                        ],
                      }}
                      transition={{
                        duration: bar.dur,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground/50">
                  Tap a result above to start playing
                </span>
              </div>
            </div>
          )}

          {/* Audiomack Player */}
          {isAudiomack && (
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/30">
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-b border-border/25"
                style={{ background: BG }}
              >
                <span className="text-primary font-black text-sm tracking-widest">
                  BT
                </span>
                <span className="text-border/60 mx-1">·</span>
                <span className="text-muted-foreground text-xs truncate">
                  {song.title}
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-muted-foreground/60 text-xs">Live</span>
                </span>
              </div>
              <iframe
                className="w-full"
                height="252"
                src={amEmbedSrc}
                frameBorder="0"
                scrolling="no"
                allow="autoplay"
                title={song.title}
              />
              <div
                className="flex items-end justify-center gap-1 h-8 px-4 py-1"
                style={{ background: BG }}
              >
                {BARS.map((bar) => (
                  <motion.div
                    key={bar.id}
                    className="w-1 rounded-full bg-primary/50"
                    animate={{
                      height: [
                        `${bar.h * 1.5}px`,
                        `${((bar.h * 1.5 + 6) % 20) + 4}px`,
                        `${bar.h * 1.5}px`,
                      ],
                    }}
                    transition={{
                      duration: bar.dur,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Audiomack Search — branded search panel */}
          {isAudiomackSearch && song.audiomackUrl && (
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/30">
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-b border-border/25"
                style={{ background: BG }}
              >
                <span className="text-primary font-black text-sm tracking-widest">
                  BT
                </span>
                <span className="text-border/60 mx-1">·</span>
                <span className="text-muted-foreground text-xs truncate">
                  {song.title}
                </span>
              </div>
              <div
                className="flex flex-col items-center justify-center gap-5 px-6 py-8"
                style={{ background: BG }}
              >
                <div
                  className="w-20 h-20 rounded-full border-2 border-primary/40 flex items-center justify-center"
                  style={{ background: "oklch(0.16 0.02 55)" }}
                >
                  <Music2
                    className="w-9 h-9"
                    style={{ color: "oklch(0.75 0.14 72)" }}
                  />
                </div>
                <div className="text-center">
                  <p
                    className="text-base font-semibold"
                    style={{ color: "oklch(0.93 0.008 72)" }}
                  >
                    {song.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {song.artist}
                  </p>
                </div>
                <div className="flex items-end gap-1 h-8">
                  {BARS.slice(0, 8).map((bar) => (
                    <motion.div
                      key={bar.id}
                      className="w-1 rounded-full bg-primary/60"
                      animate={{
                        height: [
                          `${bar.h * 2.5}px`,
                          `${((bar.h * 2.5 + 8) % 32) + 6}px`,
                          `${bar.h * 2.5}px`,
                        ],
                      }}
                      transition={{
                        duration: bar.dur,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                <a
                  href={song.audiomackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="media.primary_button"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "oklch(0.72 0.15 72)",
                    color: "oklch(0.12 0.009 55)",
                  }}
                >
                  ▶ Play on Audiomack
                </a>
                <p className="text-xs text-muted-foreground/50">
                  Opens Audiomack search in a new tab
                </p>
              </div>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground/40 mt-4">
            Tap outside to close
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
