"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ResumePreviewProps = {
  children?: ReactNode;
  className?: string;
};

export const ResumePreview = ({ children, className }: ResumePreviewProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={cn(className)} aria-label="Preview resume">
        {children ?? <><FileText size={15} /> Resume</>}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="flex h-[min(88vh,920px)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-white/15 bg-[#111] shadow-2xl shadow-black/60">
            <div className="flex min-h-12 items-center border-b border-white/10 bg-[#171717] px-4">
              <div className="flex min-w-0 flex-1 items-center justify-center gap-2 text-sm font-medium text-white">
                <FileText size={16} />
                Resume
              </div>
              <button type="button" onClick={() => setOpen(false)} className="-mr-4 flex h-12 w-12 items-center justify-center border-l border-white/10 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="Close resume preview">
                <X size={18} />
              </button>
            </div>
            <iframe src="/arnab-jena-resume.pdf" title="Arnab Jena resume" className="min-h-0 flex-1 border-0 bg-white" />
          </div>
        </div>
      )}
    </>
  );
};
