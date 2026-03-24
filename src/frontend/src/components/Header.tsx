import { LogOut, Menu, Search, X } from "lucide-react";
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
    <header
      className="sticky top-0 z-40"
      style={{
        background: "oklch(0.07 0.005 48 / 0.97)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid oklch(0.19 0.008 52 / 0.6)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[58px] flex items-center gap-3">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("Home")}
          className="flex items-center gap-2.5 flex-shrink-0"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/beatzflare-logo.dim_600x400.png"
            alt="BEATZFLARE"
            className="h-9 w-auto"
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0 mx-auto">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link}
              onClick={() => onNavigate(link)}
              data-ocid="nav.link"
              className={`relative px-3.5 py-2 text-sm rounded-lg transition-colors font-body ${
                currentPage === link
                  ? "font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={
                currentPage === link ? { color: "oklch(0.72 0.13 68)" } : {}
              }
            >
              {link}
              {currentPage === link && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-px rounded-full"
                  style={{ background: "oklch(0.72 0.13 68)" }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Search */}
        <button
          type="button"
          onClick={onSearchOpen}
          data-ocid="search.input"
          className="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm text-muted-foreground flex-1 max-w-xs transition-all hover:text-foreground"
          style={{
            background: "oklch(0.13 0.007 50)",
            border: "1px solid oklch(0.19 0.008 52)",
          }}
        >
          <Search className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="hidden sm:block text-xs">Search…</span>
        </button>

        {/* User info */}
        {username && onLogout && (
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "oklch(0.13 0.007 50)",
                border: "1px solid oklch(0.19 0.008 52)",
              }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black font-display flex-shrink-0"
                style={{
                  background: "oklch(0.72 0.13 68)",
                  color: "oklch(0.07 0.005 48)",
                }}
              >
                {username.charAt(0).toUpperCase()}
              </div>
              <span
                className="text-xs font-semibold truncate max-w-[72px] font-body"
                style={{ color: "oklch(0.72 0.13 68)" }}
              >
                {username}
              </span>
            </div>
            <button
              type="button"
              onClick={onLogout}
              data-ocid="auth.secondary_button"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg"
              style={{ border: "1px solid oklch(0.19 0.008 52)" }}
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-ocid="nav.toggle"
          className="md:hidden ml-auto p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div
          className="md:hidden px-4 py-3 flex flex-col gap-0.5"
          style={{
            background: "oklch(0.09 0.006 50 / 0.98)",
            borderTop: "1px solid oklch(0.19 0.008 52 / 0.5)",
          }}
        >
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
                  ? "font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={
                currentPage === link
                  ? {
                      color: "oklch(0.72 0.13 68)",
                      background: "oklch(0.72 0.13 68 / 0.07)",
                    }
                  : {}
              }
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
              className="flex items-center gap-2 text-left px-3 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-foreground transition-colors mt-1"
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
