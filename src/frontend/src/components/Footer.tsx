export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}}`;

  return (
    <footer
      className="bg-foreground text-background border-t-4 border-primary mt-auto"
      data-ocid="footer"
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-1">
              <span className="font-display font-black text-xl text-background">
                THE
              </span>
              <span className="font-display font-black text-3xl text-primary uppercase tracking-tight">
                SLAP
              </span>
              <span className="font-display font-black text-xl text-background">
                .com
              </span>
            </div>
            <p className="text-xs text-background/60 font-body italic">
              The Slap: Be Heard. Be Seen. Be Slapped.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="flex gap-4 text-xs text-background/60 font-body">
              <a href="/" className="hover:text-primary transition-smooth">
                About
              </a>
              <a href="/" className="hover:text-primary transition-smooth">
                Privacy
              </a>
              <a href="/" className="hover:text-primary transition-smooth">
                Terms
              </a>
              <a href="/" className="hover:text-primary transition-smooth">
                Help
              </a>
            </div>
            <p className="text-xs text-background/50">
              © {year}. Built with love using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
