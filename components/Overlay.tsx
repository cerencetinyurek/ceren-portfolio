"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Overlay({ label, onClose, children }: { label: string; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialog} className="portfolio-overlay" aria-label={label} onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="overlay-stage" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      {children}
    </div>
  </dialog>;
}
