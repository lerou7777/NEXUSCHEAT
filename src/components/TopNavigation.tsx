import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "SERVICES", path: "/services" },
  { label: "ABOUT", path: "/about" },
  { label: "MODULES", path: "/modules" },
];

const systemInfo = [
  { label: "Status", value: "Operational", status: "online" },
  { label: "Environment", value: "Global" },
  { label: "Build", value: "2.4.1" },
  { label: "Session", value: "Temporary" },
];

export function TopNavigation() {
  const location = useLocation();
  const [userName, setUserName] = useState<string | null>(null);
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    const syncSession = () => {
      const name = sessionStorage.getItem("nexus_user_name");
      const creds = sessionStorage.getItem("nexus_credits");

      setUserName(name);
      setCredits(creds ? parseInt(creds, 10) : 0);
    };

    // Initial load
    syncSession();

    // Same-tab updates
    window.addEventListener("nexus_user_update", syncSession);

    // Cross-tab updates
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener("nexus_user_update", syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">

          {/* LEFT — Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link font-mono text-xs tracking-wide ${
                  isActive(item.path) ? "active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT — User + System Info */}
          <div className="flex items-center gap-4">

            {/* User info (always visible when logged) */}
            {userName && (
              <div className="flex items-center gap-3 pr-3 border-r border-border/50">
                <span className="font-mono text-xs text-foreground">
                  Credits:{" "}
                  <span className="text-primary">{credits}</span>
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/60 tracking-wide">
                  [{userName}]
                </span>
              </div>
            )}

            {/* System info (hide on very small screens if needed) */}
            <div className="hidden lg:flex items-center gap-4">
              {systemInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-2">
                  <span className="text-label">{info.label}:</span>
                  <span className="font-mono text-xs text-foreground flex items-center gap-1.5">
                    {info.status === "online" && (
                      <span className="status-dot-online" />
                    )}
                    {info.value}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
