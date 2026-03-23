import type { Song } from "@/data/mockData";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface MediaPlayerModalProps {
  song: Song;
  onClose: () => void;
}

/** Normalize mobile SoundCloud URLs to desktop */
function normalizeScUrl(url: string): string {
  return url.replace("https://m.soundcloud.com/", "https://soundcloud.com/");
}

/**
 * Converts Audiomack page URL to embeddable iframe URL.
 * https://audiomack.com/artist/song/slug → https://audiomack.com/embed/song/artist/slug
 */
function normalizeAudiomackUrl(url: string): string {
  if (!url) return url;
  if (url.includes("/embed/")) return url; // already embed format
  const match = url.match(/audiomack\.com\/([^/]+)\/song\/([^/?#]+)/);
  if (match) {
    return `https://audiomack.com/embed/song/${match[1]}/${match[2]}`;
  }
  return url;
}

/**
 * Returns true when the URL is a browsable multi-track embed
 * (playlist /sets/, artist /popular-tracks, /tracks, tag pages, etc.)
 */
function isMultiTrackUrl(url: string): boolean {
  return (
    url.includes("/sets/") ||
    url.includes("/popular-tracks") ||
    url.includes("/tracks") ||
    url.includes("soundcloud.com/tags/")
  );
}

function getSoundCloudEmbedUrl(rawUrl: string, multiTrack: boolean): string {
  const url = normalizeScUrl(rawUrl);
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=true&color=%23C9A84C&hide_related=true&show_comments=false&show_user=false&show_reposts=false&buying=false&sharing=false&download=false&show_playcount=false&show_teaser=false&visual=${multiTrack ? "true" : "false"}&show_artwork=${multiTrack ? "true" : "false"}&single_active=true`;
}

/** Category-specific artwork for each section */
const CATEGORY_PHOTOS: Record<string, string> = {
  "Masoom Sharma": "/assets/generated/masoom-sharma.dim_400x400.jpg",
  "Sapna Chaudhary": "/assets/generated/sapna-chaudhary.dim_400x400.jpg",
  "Renuka Panwar": "/assets/generated/renuka-panwar.dim_400x400.jpg",
  "Haryanvi Hits": "/assets/generated/jaat-haryanvi.dim_400x400.jpg",
  "Punjabi Hits": "/assets/generated/jatt-punjabi.dim_400x400.jpg",
  "Bollywood Hits": "/assets/generated/bollywood-hits.dim_400x400.jpg",
  "90s Hits": "/assets/generated/90s-hits.dim_400x400.jpg",
  "Sad Songs": "/assets/generated/sad-songs.dim_400x400.jpg",
  "Top 100": "/assets/generated/top-100.dim_400x400.jpg",
  VVIP: "/assets/generated/vvip-section.dim_400x400.jpg",
};

const SONG_PHOTOS: Record<string, string> = {
  ms_am1: "/assets/generated/masoom-sharma-real.dim_400x400.jpg",
};

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
  const rawUrl = song.soundcloudUrl ?? "";
  const isSearchUrl = rawUrl.includes("/search?");
  const multiTrack = !isSearchUrl && rawUrl ? isMultiTrackUrl(rawUrl) : false;
  const hasSoundCloudDirect = !!(rawUrl && !isSearchUrl);
  const hasAudiomack = !!(
    song.audiomackUrl && !song.audiomackUrl.includes("/search/")
  );
  const audiomackEmbedUrl = hasAudiomack
    ? normalizeAudiomackUrl(song.audiomackUrl!)
    : "";

  const scEmbedSrc = hasSoundCloudDirect
    ? getSoundCloudEmbedUrl(rawUrl, multiTrack)
    : "";

  const normalizedUrl = normalizeScUrl(rawUrl);
  const scSearchEmbedSrc = isSearchUrl
    ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(normalizedUrl)}&auto_play=false&color=%23C9A84C&hide_related=false&show_comments=false&buying=false&sharing=false&download=false&show_playcount=false&show_teaser=false&visual=true&show_artwork=true`
    : "";

  const playerHeight = multiTrack ? 450 : 166;

  // Category artwork (song-specific first, then category)
  const artwork =
    SONG_PHOTOS[song.id] ?? CATEGORY_PHOTOS[song.category] ?? null;

  // Determine source label
  const sourceLabel =
    !song.soundcloudUrl && hasAudiomack
      ? "Songs by Audiomack"
      : "Songs by SoundCloud";

  if (!song.soundcloudUrl && !song.audiomackUrl) return null;

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
          {/* Song artwork + header row */}
          <div className="flex items-center gap-4 mb-4 px-1">
            {/* Category / song image */}
            {artwork && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 shadow-lg"
                style={{
                  borderColor: "oklch(0.74 0.135 70 / 0.45)",
                  boxShadow: "0 0 20px oklch(0.74 0.135 70 / 0.25)",
                }}
              >
                <img
                  src={artwork}
                  alt={song.category}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            <div className="flex-1 flex items-start justify-between gap-2 min-w-0">
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2
                    className="text-base font-bold truncate"
                    style={{ color: "oklch(0.93 0.008 72)" }}
                  >
                    {song.title}
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/15 border border-primary/35 text-primary text-[10px] font-black tracking-widest flex-shrink-0">
                    BT
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {song.artist}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.74 0.135 70 / 0.12)",
                      color: "oklch(0.74 0.135 70)",
                      border: "1px solid oklch(0.74 0.135 70 / 0.25)",
                    }}
                  >
                    {song.category}
                  </span>
                  <p
                    className="text-[10px]"
                    style={{ color: "oklch(0.6 0.08 72)" }}
                  >
                    {sourceLabel}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                data-ocid="media.close_button"
                className="ml-2 flex-shrink-0 w-8 h-8 rounded-full bg-secondary/60 hover:bg-secondary border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div
            className="rounded-xl overflow-hidden shadow-2xl border border-border/30"
            style={{ background: BG }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b border-border/25"
              style={{ background: BG }}
            >
              <span className="text-primary font-black text-sm tracking-widest">
                BT
              </span>
              <span className="text-border/60 mx-1">·</span>
              <span className="text-muted-foreground text-xs truncate flex-1">
                {song.title}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground/60 text-xs">LIVE</span>
              </span>
            </div>

            {/* SoundCloud DIRECT / PLAYLIST / PROFILE player */}
            {hasSoundCloudDirect && (
              <div
                className="relative w-full"
                style={{ height: `${playerHeight}px`, background: BG }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full"
                  height={playerHeight}
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={scEmbedSrc}
                  title={song.title}
                />
                {/* Hide bottom SoundCloud branding bar for single track embeds only */}
                {!multiTrack && (
                  <>
                    <div
                      className="absolute bottom-0 left-0 right-0 z-10"
                      style={{
                        height: "22px",
                        background: BG,
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      className="absolute top-0 right-0 z-10"
                      style={{
                        width: "140px",
                        height: "28px",
                        background: BG,
                        pointerEvents: "none",
                      }}
                    />
                  </>
                )}
              </div>
            )}

            {/* SoundCloud SEARCH player */}
            {isSearchUrl && (
              <>
                <div
                  className="flex items-center gap-2 px-4 py-2 border-b border-border/20"
                  style={{ background: BG }}
                >
                  <span className="text-primary/70 text-xs">
                    Tap a result below to play
                  </span>
                </div>
                <div style={{ height: "450px", background: BG }}>
                  <iframe
                    src={scSearchEmbedSrc}
                    className="w-full"
                    style={{ height: "450px" }}
                    allow="autoplay"
                    title={song.title}
                    frameBorder="no"
                    scrolling="no"
                  />
                </div>
              </>
            )}

            {/* Audiomack player (when no SoundCloud URL available) */}
            {!song.soundcloudUrl && hasAudiomack && (
              <iframe
                className="w-full"
                height="252"
                src={audiomackEmbedUrl}
                frameBorder="0"
                scrolling="no"
                allow="autoplay"
                title={song.title}
              />
            )}

            {/* Animated bars */}
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

          <p className="text-center text-xs text-muted-foreground/40 mt-4">
            Tap outside to close
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
