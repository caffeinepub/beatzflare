import type { Song } from "@/data/mockData";
import { Music2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface MediaPlayerModalProps {
  song: Song;
  onClose: () => void;
}

type MediaType = "soundcloud" | "audiomack" | null;

function getMediaType(song: Song): MediaType {
  if (song.audiomackUrl) return "audiomack";
  if (song.soundcloudUrl) return "soundcloud";
  return null;
}

function getAudiomackEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    const parts = u.pathname.replace(/^\//, "").split("/");
    // /artist/song/slug  or  /artist/playlist/slug
    if (parts.length >= 3) {
      const type = parts[1] === "playlist" ? "playlist" : "song";
      return `https://audiomack.com/embed/${type}/${parts[0]}/${parts[2]}`;
    }
  } catch (_) {
    // ignore
  }
  return url;
}

function isSearchUrl(url: string): boolean {
  return (
    url.includes("/search") &&
    (url.includes("?q=") || url.includes("/search/results"))
  );
}

function getSoundCloudEmbedUrl(rawUrl: string): string {
  if (isSearchUrl(rawUrl)) {
    // Search embed: auto_play=false so browser allows user to pick a track
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(rawUrl)}&auto_play=false&color=%23C9A84C&hide_related=false&show_comments=false&show_user=true&show_reposts=false&buying=false&sharing=false&download=false&show_playcount=false&show_teaser=false&visual=false`;
  }
  // Direct track embed: auto_play=true
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(rawUrl)}&auto_play=true&color=%23C9A84C&hide_related=true&show_comments=false&show_user=false&show_reposts=false&buying=false&sharing=false&download=false&show_playcount=false&show_teaser=false&visual=false&show_artwork=false&start_track=0&single_active=true`;
}

const VISUALIZER_BARS: { id: string; h: number; dur: number }[] = [
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
  { id: "v-m", h: 9, dur: 1.2 },
  { id: "v-n", h: 4, dur: 1.25 },
  { id: "v-o", h: 7, dur: 1.3 },
];

const COVER_BG = "oklch(0.12 0.009 55)";

export default function MediaPlayerModal({
  song,
  onClose,
}: MediaPlayerModalProps) {
  const mediaType = getMediaType(song);
  if (!mediaType) return null;

  const isSoundCloud = mediaType === "soundcloud";
  const isAudiomack = mediaType === "audiomack";

  const scUrl = song.soundcloudUrl ?? "";
  const isSearchEmbed = isSoundCloud && isSearchUrl(scUrl);

  const scEmbedSrc = isSoundCloud && scUrl ? getSoundCloudEmbedUrl(scUrl) : "";

  const amEmbedSrc =
    isAudiomack && song.audiomackUrl
      ? getAudiomackEmbedUrl(song.audiomackUrl)
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

          {/* Player Area */}
          {isSoundCloud && (
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/30">
              {/* Album art / visualizer — only for direct tracks, not search */}
              {!isSearchEmbed && (
                <div
                  className={`relative w-full bg-gradient-to-br ${song.gradient} flex flex-col items-center justify-center gap-4 py-8`}
                >
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-white/8 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Music2 className="w-7 h-7 text-white/70" />
                    </div>
                    <div className="flex items-end gap-1 h-8">
                      {VISUALIZER_BARS.map((bar) => (
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
              )}

              {/* Search embed hint */}
              {isSearchEmbed && (
                <div
                  className="relative flex items-center gap-2 px-3 py-2"
                  style={{ background: COVER_BG }}
                >
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/15 border border-primary/35 text-primary text-xs font-black tracking-widest">
                    BT
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "oklch(0.72 0.08 72)" }}
                  >
                    Tap a result to play
                  </span>
                </div>
              )}

              {/* SoundCloud iframe */}
              {isSearchEmbed ? (
                // Search results — full height, no overlays blocking the list
                <div
                  className="relative w-full"
                  style={{ background: COVER_BG }}
                >
                  <iframe
                    className="w-full block"
                    height="300"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={scEmbedSrc}
                    title={song.title}
                  />
                </div>
              ) : (
                // Direct track — clip to 130px to hide "Play on SoundCloud" footer
                <div
                  className="relative w-full"
                  style={{
                    height: "130px",
                    overflow: "hidden",
                    background: COVER_BG,
                  }}
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
                  {/* Bottom: covers "Play on SoundCloud" footer */}
                  <div
                    className="absolute bottom-0 left-0 right-0 z-10"
                    style={{
                      height: "44px",
                      background: COVER_BG,
                      pointerEvents: "all",
                    }}
                  />
                  {/* Top-right: covers waveform SC link */}
                  <div
                    className="absolute top-0 right-0 z-10"
                    style={{
                      width: "200px",
                      height: "36px",
                      background: COVER_BG,
                      pointerEvents: "all",
                    }}
                  />
                  {/* Top-left: covers SC logo */}
                  <div
                    className="absolute top-0 left-0 z-10"
                    style={{
                      width: "90px",
                      height: "36px",
                      background: COVER_BG,
                      pointerEvents: "all",
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {isAudiomack && (
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/30">
              {/* BT header bar */}
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-b border-border/25"
                style={{ background: COVER_BG }}
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
              {/* Visualizer footer */}
              <div
                className="flex items-end justify-center gap-1 h-8 px-4 py-1"
                style={{ background: COVER_BG }}
              >
                {VISUALIZER_BARS.slice(0, 12).map((bar) => (
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

          <p className="text-center text-xs text-muted-foreground/40 mt-4">
            Tap outside to close
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
