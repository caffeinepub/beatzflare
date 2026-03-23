import { LogOut, Menu, Music2, Search } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearchOpen: () => void;
  username?: string;
  onLogout?: () => void;
}

const navLinks = ["Home", "Explore", "Radio", "Charts", "Library"];

export default function Header({
  currentPage,
  onNavigate,
  onSearchOpen,
  username,
  onLogout,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("Home")}
          className="flex items-center gap-2.5 flex-shrink-0 group"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/beatzflare-logo.dim_600x400.png"
            alt="BEATZFLARE"
            className="h-10 w-auto"
          />
        </button>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-0.5 mx-auto">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link}
              onClick={() => onNavigate(link)}
              data-ocid="nav.link"
              className={`px-3.5 py-2 text-sm rounded-md transition-colors relative font-body ${
                currentPage === link
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground font-medium"
              }`}
            >
              {link}
              {currentPage === link && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-px bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Search */}
        <button
          type="button"
          onClick={onSearchOpen}
          data-ocid="search.input"
          className="flex items-center gap-2 bg-card hover:bg-secondary border border-border/40 rounded-full px-4 py-2 text-sm text-muted-foreground flex-1 max-w-xs transition-colors"
        >
          <Search className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="hidden sm:block truncate text-xs">
            Search songs, artists…
          </span>
          <span className="sm:hidden text-xs">Search</span>
        </button>

        {/* User + Logout */}
        {username && onLogout && (
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <span
              className="text-xs font-semibold truncate max-w-[80px]"
              style={{ color: "#d4a017" }}
            >
              {username}
            </span>
            <button
              type="button"
              onClick={onLogout}
              data-ocid="auth.secondary_button"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg border border-border/30 hover:border-border/60"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Mobile menu */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-ocid="nav.toggle"
          className="md:hidden ml-auto p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/25 bg-card/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link}
              onClick={() => {
                onNavigate(link);
                setMobileMenuOpen(false);
              }}
              data-ocid="nav.link"
              className={`text-left px-3 py-2.5 text-sm rounded-lg transition-colors font-body ${
                currentPage === link
                  ? "text-primary font-semibold bg-primary/8"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link}
            </button>
          ))}
          {username && onLogout && (
            <button
              type="button"
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              data-ocid="auth.secondary_button"
              className="flex items-center gap-2 text-left px-3 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout ({username})
            </button>
          )}
        </div>
      )}
    </header>
  );
}
