"use client";

import { useEffect, useState } from "react";
import { Logo } from "./ui/Logo";
import { NAV_ITEMS } from "@/lib/data";
import { Close, Menu } from "./ui/Icons";
import { clsx } from "@/lib/clsx";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ink/95 backdrop-blur-md border-b border-bone/10"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <div className="flex h-16 md:h-20 items-center justify-between">
            <a
              href="/"
              aria-label="Karate Klub Ljubljana — domov"
              className={clsx(
                "transition-colors",
                scrolled ? "text-bone" : "text-ink",
              )}
            >
              <Logo
                variant="wordmark"
                className={clsx(
                  scrolled || open ? "text-bone" : "text-ink",
                )}
              />
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={clsx(
                    "label px-4 py-2 transition-colors",
                    scrolled
                      ? "text-bone/70 hover:text-blood"
                      : "text-ink/70 hover:text-blood",
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="/#kontakt"
              className={clsx(
                "hidden lg:inline-flex label px-5 py-3 transition-all duration-300 border",
                scrolled
                  ? "bg-blood text-bone border-blood hover:bg-bone hover:text-ink hover:border-bone"
                  : "bg-ink text-bone border-ink hover:bg-blood hover:border-blood",
              )}
            >
              Včlani se
            </a>

            <button
              type="button"
              aria-label="Odpri meni"
              onClick={() => setOpen(true)}
              className={clsx(
                "lg:hidden p-2 -mr-2 transition-colors",
                scrolled ? "text-bone" : "text-ink",
              )}
            >
              <Menu className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={clsx(
          "fixed inset-0 z-[60] transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={clsx(
            "absolute inset-0 bg-ink transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={clsx(
            "relative flex h-full flex-col text-bone transition-all duration-500",
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4",
          )}
        >
          <div className="flex items-center justify-between px-5 sm:px-8 h-16 md:h-20 border-b border-bone/10">
            <Logo variant="wordmark" className="text-bone" />
            <button
              type="button"
              aria-label="Zapri meni"
              onClick={() => setOpen(false)}
              className="p-2 -mr-2 text-bone"
            >
              <Close className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>
          <nav className="flex flex-col flex-1 px-5 sm:px-8 py-8 overflow-y-auto">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "group flex items-baseline gap-5 py-5 border-b border-bone/10",
                  "transition-all",
                )}
                style={{
                  animation: open
                    ? `fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 60 + 100}ms both`
                    : undefined,
                }}
              >
                <span className="display text-[2.5rem] sm:text-5xl group-hover:text-blood transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
            <a
              href="/#kontakt"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center gap-2 bg-blood px-6 py-5 label text-bone hover:bg-bone hover:text-ink transition-colors"
            >
              Včlani se →
            </a>
          </nav>
          <div className="px-5 sm:px-8 py-6 border-t border-bone/10 label text-bone/40">
            EST. 1971 · LJUBLJANA · SLOVENIJA
          </div>
        </div>
      </div>
    </>
  );
}
