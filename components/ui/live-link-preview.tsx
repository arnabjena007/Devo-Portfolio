"use client";

import React from "react";
import { ArrowUpRight, ExternalLink, LoaderCircle, X } from "lucide-react";

type PreviewState = {
  url: string;
  title: string;
};

const getLinkTitle = (anchor: HTMLAnchorElement) =>
  anchor.getAttribute("aria-label") || anchor.textContent?.trim() || "External link";

export const LiveLinkPreviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [preview, setPreview] = React.useState<PreviewState | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!preview) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [preview]);

  const handleLinkClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const anchor = (event.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
    if (!anchor || anchor.dataset.preview === "off") return;

    const href = anchor.href;
    if (!/^https?:\/\//.test(href) || href.startsWith(window.location.origin)) return;

    event.preventDefault();
    setIsLoading(true);
    setPreview({ url: href, title: getLinkTitle(anchor) });
  };

  const hostname = preview ? new URL(preview.url).hostname.replace(/^www\./, "") : "";

  return (
    <div onClickCapture={handleLinkClick}>
      {children}

      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview: ${preview.title}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPreview(null);
          }}
        >
          <div className="flex h-[min(78vh,760px)] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-white/15 bg-[#111] shadow-2xl shadow-black/60">
            <div className="flex min-h-12 items-center border-b border-white/10 bg-[#171717] pl-4">
              <div className="min-w-0 flex-1 text-center">
                <p className="truncate text-sm font-medium text-white">{hostname}</p>
                <p className="truncate text-xs text-neutral-500">{preview.title}</p>
              </div>
              <a
                href={preview.url}
                target="_blank"
                rel="noreferrer"
                data-preview="off"
                className="flex h-12 w-12 shrink-0 items-center justify-center border-l border-white/10 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={`Open ${hostname} in a new tab`}
                title="Open in a new tab"
              >
                <ExternalLink size={17} />
              </a>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="flex h-12 w-12 shrink-0 items-center justify-center border-l border-white/10 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 bg-white">
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#111] text-sm text-neutral-400">
                  <LoaderCircle size={22} className="animate-spin" />
                  Loading live preview…
                </div>
              )}
              <iframe
                key={preview.url}
                src={preview.url}
                title={`Live preview of ${preview.title}`}
                className="h-full w-full border-0"
                onLoad={() => setIsLoading(false)}
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-[#171717] px-4 py-2.5 text-xs text-neutral-500">
              <span className="truncate">Some sites block embedded previews.</span>
              <a
                href={preview.url}
                target="_blank"
                rel="noreferrer"
                data-preview="off"
                className="inline-flex shrink-0 items-center gap-1 font-medium text-neutral-200 transition-colors hover:text-white"
              >
                Open in new tab <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
