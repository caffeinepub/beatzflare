import ExplorePage from "@/components/ExplorePage";
import GenrePage from "@/components/GenrePage";
import Header from "@/components/Header";
import HomePage from "@/components/HomePage";
import MediaPlayerModal from "@/components/MediaPlayerModal";
import PlayerBar from "@/components/PlayerBar";
import ReelViewer from "@/components/ReelViewer";
import SearchModal from "@/components/SearchModal";
import SplashScreen from "@/components/SplashScreen";
import { songs } from "@/data/mockData";
import type { Reel, Song } from "@/data/mockData";
import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type Page = "Home" | "Explore" | "Radio" | "Charts" | "Library" | "Genre";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("Home");
  const [currentGenre, setCurrentGenre] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReel, setActiveReel] = useState<Reel | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasExternalMedia = !!(
    currentSong &&
    isPlaying &&
    (currentSong.soundcloudUrl || currentSong.audiomackUrl)
  );

  useEffect(() => {
    if (isPlaying && !hasExternalMedia) {
      progressRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            handleNext();
            return 0;
          }
          return p + 0.2;
        });
      }, 200);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
    }
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, hasExternalMedia]);

  const handlePlay = useCallback((song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  const handleNext = useCallback(() => {
    if (!currentSong) return;
    const idx = songs.findIndex((s) => s.id === currentSong.id);
    const next = songs[(idx + 1) % songs.length];
    setCurrentSong(next);
    setProgress(0);
  }, [currentSong]);

  const handlePrev = useCallback(() => {
    if (!currentSong) return;
    const idx = songs.findIndex((s) => s.id === currentSong.id);
    const prev = songs[(idx - 1 + songs.length) % songs.length];
    setCurrentSong(prev);
    setProgress(0);
  }, [currentSong]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    setCurrentGenre(null);
  };

  const handleGenre = (genreId: string) => {
    setCurrentGenre(genreId);
    setCurrentPage("Genre");
  };

  const renderPage = () => {
    if (currentPage === "Genre" && currentGenre) {
      return (
        <GenrePage
          genreId={currentGenre}
          onBack={() => handleNavigate("Home")}
          onPlay={handlePlay}
        />
      );
    }
    if (currentPage === "Explore" || currentPage === "Charts") {
      return <ExplorePage onPlay={handlePlay} onGenre={handleGenre} />;
    }
    return (
      <HomePage
        currentSong={currentSong}
        isPlaying={isPlaying}
        progress={progress}
        onPlay={handlePlay}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        onGenre={handleGenre}
        onExplore={() => handleNavigate("Explore")}
        onReel={setActiveReel}
      />
    );
  };

  return (
    <>
      <AnimatePresence>
        {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      </AnimatePresence>

      {splashDone && (
        <div className="min-h-screen bg-background">
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onSearchOpen={() => setSearchOpen(true)}
          />
          <main>{renderPage()}</main>

          {/* Footer */}
          <footer
            className="border-t border-border/20 py-12 px-4"
            style={{ background: "oklch(0.10 0.008 55)" }}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
                <div className="flex items-center gap-4">
                  <img
                    src="/assets/generated/beatzflare-logo.dim_600x400.png"
                    alt="BEATZFLARE"
                    className="h-14 w-auto"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Developed by{" "}
                      <span className="text-primary/80 font-medium">
                        Adarsh Chaudhary
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Powered by{" "}
                      <span className="text-primary/80 font-medium">
                        MR. DINESH KUMAR CHAUDHARY
                      </span>
                    </p>
                  </div>
                </div>

                <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  {["About", "Terms", "Privacy"].map((item) => (
                    <a
                      key={item}
                      href="https://beatzflare.app"
                      className="hover:text-foreground transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="border-t border-border/15 pt-6 text-center text-xs text-muted-foreground/50">
                © {new Date().getFullYear()}.{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary/70 transition-colors"
                >
                  Built with ❤️ using caffeine.ai
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}

      <PlayerBar
        song={currentSong}
        isPlaying={isPlaying}
        progress={progress}
        volume={volume}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        onVolumeChange={setVolume}
        onProgressChange={setProgress}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => {
          setSearchOpen(false);
          setSearchQuery("");
        }}
        onPlay={handlePlay}
        initialQuery={searchQuery}
      />

      <AnimatePresence>
        {activeReel && (
          <ReelViewer
            initialReel={activeReel}
            onClose={() => setActiveReel(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasExternalMedia && currentSong && (
          <MediaPlayerModal
            key={currentSong.id}
            song={currentSong}
            onClose={() => setIsPlaying(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
