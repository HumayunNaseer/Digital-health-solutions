import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X, Linkedin } from "lucide-react";
import { profile } from "../content/site";
import { sitePath } from "../lib/site-path";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 4v24M4 16h24"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3" fill="var(--canvas)" />
    </svg>
  );
}

export function ActionLink({
  children,
  href = "/contact/",
  secondary = false,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <a
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
      href={sitePath(href)}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

export function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            toggleRef.current?.focus();
          }
        }}
      >
        <div className="container header-inner">
          <a href={sitePath("/")} className="brand" aria-label="Humayun Naseer — home">
            <BrandMark />
            <span>
              Humayun Naseer<small>Healthcare Technology Partner</small>
            </span>
          </a>
          <button
            ref={toggleRef}
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className={`main-nav ${open ? "is-open" : ""}`}
          >
            <a href={sitePath("/#solutions")} onClick={() => setOpen(false)}>
              Solutions
            </a>
            <a
              href={sitePath("/#work")}
              className={path.startsWith("/work/") ? "nav-current" : ""}
              onClick={() => setOpen(false)}
            >
              Selected work
            </a>
            <a href={sitePath("/#approach")} onClick={() => setOpen(false)}>
              Approach
            </a>
            <a href={sitePath("/#about")} onClick={() => setOpen(false)}>
              About
            </a>
            <ActionLink className="nav-cta">Let’s talk</ActionLink>
          </nav>
        </div>
      </header>
    </>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

export function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="container contact-banner-inner">
        <div>
          <Eyebrow light>A GOOD PLACE TO START</Eyebrow>
          <h2>
            What would you like <br /> to make <em>work better?</em>
          </h2>
          <p>
            A new idea. A complicated workflow. A product ready for its next
            chapter.
          </p>
        </div>
        <div className="banner-actions">
          <ActionLink>Discuss your healthcare product</ActionLink>
          <a className="quiet-link" href={`mailto:${profile.email}`}>
            Or email me directly <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <a className="brand" href={sitePath("/")}>
          <BrandMark />
          <span>
            Humayun Naseer<small>Thoughtful technology. Connected care.</small>
          </span>
        </a>
        <p>
          Healthcare product thinking. <br /> Hands-on engineering.
        </p>
        <a
          className="footer-social"
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn <Linkedin size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Humayun Naseer</span>
        <span>Built with care.</span>
        <a href={sitePath("/privacy/")}>Privacy</a>
      </div>
    </footer>
  );
}
