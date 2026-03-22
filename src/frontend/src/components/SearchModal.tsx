import { Dialog, DialogContent } from "@/components/ui/dialog";
import { reels, songs } from "@/data/mockData";
import type { Song } from "@/data/mockData";
import { Play, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onPlay: (song: Song) => void;
  initialQuery?: string;
}

export default function SearchModal({
  open,
  onClose,
  onPlay,
  initialQuery = "",
}: SearchModalProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (open) {
      setQuery(initialQuery);
    }
  }, [open, initialQuery]);

  const q = query.toLowerCase().trim();
  const filteredSongs = q
    ? songs.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      )
    : songs.slice(0, 8);

  const filteredReels = q
    ? reels.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.artist.toLowerCase().includes(q),
      )
    : reels.slice(0, 3);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-2xl bg-card border-border/40 p-0 gap-0 max-h-[80vh] overflow-hidden flex flex-col"
        data-ocid="search.modal"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists, categories…"
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
            data-ocid="search.input"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            data-ocid="search.close_button"
            className="text-muted-foreground hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4 space-y-6">
          {/* Songs */}
          {filteredSongs.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                {q ? "Songs" : "All Songs"}
              </h3>
              <div className="space-y-1" data-ocid="search.list">
                {filteredSongs.map((song, i) => (
                  <button
                    type="button"
                    key={song.id}
                    onClick={() => {
                      onPlay(song);
                      onClose();
                    }}
                    data-ocid={`search.item.${i + 1}`}
                    className="group w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors text-left"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${song.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-lg">🎵</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {song.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {song.artist} • {song.category}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-primary" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reels */}
          {filteredReels.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Reels
              </h3>
              <div className="space-y-1">
                {filteredReels.map((reel, i) => (
                  <div
                    key={reel.id}
                    data-ocid={`search.item.${i + 1}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors cursor-default"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${reel.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-lg">🎬</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {reel.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {reel.artist} • {reel.views} views
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredSongs.length === 0 && filteredReels.length === 0 && (
            <div className="text-center py-12" data-ocid="search.empty_state">
              <span className="text-4xl">🔍</span>
              <p className="text-muted-foreground mt-3">
                No results for &quot;{query}&quot;
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
