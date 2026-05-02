import { useAuth } from "@/hooks/use-auth";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, LogOut, Star } from "lucide-react";
import { UserAvatar } from "./UserAvatar";

const NAV_ITEMS = [
  { label: "HOME", to: "/" },
  { label: "CLIPS", to: "/clips" },
  { label: "PIX", to: "/pix" },
  { label: "PROFILES", to: "/profiles" },
];

export function NavBar() {
  const { isLoggedIn, principal, login, logout } = useAuth();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  function isActive(to: string) {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  }

  return (
    <header
      className="bg-foreground shadow-elevated sticky top-0 z-50"
      data-ocid="navbar"
    >
      {/* Logo bar */}
      <div
        className="px-4"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.62 0.28 18) 0%, oklch(0.52 0.26 18) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-1 group"
            data-ocid="nav.logo_link"
          >
            <span className="font-display font-black text-white text-2xl tracking-tight">
              THE
            </span>
            <span
              className="font-display font-black text-4xl uppercase tracking-tighter"
              style={{
                color: "oklch(0.96 0.15 88)",
                textShadow: "2px 2px 0px rgba(0,0,0,0.3)",
              }}
            >
              SLAP
            </span>
            <span className="font-display font-black text-white text-2xl">
              .com
            </span>
            <Star
              className="w-5 h-5 ml-1"
              style={{ color: "oklch(0.96 0.15 88)" }}
              fill="oklch(0.96 0.15 88)"
            />
          </Link>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <UserAvatar
                  name={principal?.slice(0, 8) ?? "User"}
                  size="sm"
                  avatarColor="#e84e0f"
                />
                <span className="text-white/80 text-xs hidden sm:block font-body">
                  {principal?.slice(0, 10)}…
                </span>
                <button
                  type="button"
                  onClick={logout}
                  data-ocid="nav.logout_button"
                  className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-bold transition-smooth"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">SIGN OUT</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={login}
                data-ocid="nav.login_button"
                className="btn-chunky text-xs font-display"
                style={{
                  background: "oklch(0.65 0.24 195)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <span className="flex items-center gap-1.5">
                  <LogIn className="w-4 h-4" />
                  SIGN IN
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Nav tabs bar */}
      <nav
        className="px-4"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.65 0.24 195) 0%, oklch(0.55 0.22 195) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={`nav.tab.${item.label.toLowerCase()}`}
              className={`px-6 py-3 font-display font-black text-sm tracking-widest transition-smooth relative ${
                isActive(item.to)
                  ? "bg-white/20 text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
