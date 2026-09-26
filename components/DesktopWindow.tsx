"use client";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
type Point = { x: number; y: number };
export type WindowAnchor = { selector: string; side: "left" | "right"; gap: number; vertical: number };
export default function DesktopWindow({ label, anchor, zIndex, onActivate, className = "", children }: {
  label: string; anchor: WindowAnchor; zIndex: number; onActivate: () => void; className?: string; children: ReactNode;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Point | null>(null);
  const drag = useRef<{ pointer: number; x: number; y: number; origin: Point } | null>(null);
  const constrain = (point: Point) => {
    const rect = frame.current!.getBoundingClientRect();
    return { x: Math.max(8, Math.min(point.x, window.innerWidth - rect.width - 8)), y: Math.max(8, Math.min(point.y, window.innerHeight - rect.height - 8)) };
  };
  useLayoutEffect(() => {
    const anchorElement = document.querySelector<HTMLElement>(anchor.selector);
    const anchorRect = anchorElement?.getBoundingClientRect();
    const frameRect = frame.current!.getBoundingClientRect();
    const initial = constrain(anchorRect ? {
      x: anchor.side === "right" ? anchorRect.right + anchor.gap : anchorRect.left - frameRect.width - anchor.gap,
      y: anchorRect.top + frameRect.height * anchor.vertical,
    } : { x: (window.innerWidth - frameRect.width) / 2, y: (window.innerHeight - frameRect.height) / 2 });
    setPosition(initial);
    const resize = () => setPosition(previous => constrain(previous ?? initial));
    const observer = new ResizeObserver(resize);
    observer.observe(frame.current!);
    window.addEventListener("resize", resize);
    return () => { observer.disconnect(); window.removeEventListener("resize", resize); };
  }, [anchor.selector, anchor.side, anchor.gap, anchor.vertical]);
  return <div ref={frame} className={`desktop-window ${className}`} role="dialog" aria-label={label}
    style={{ left: position?.x ?? 0, top: position?.y ?? 0, zIndex, visibility: position ? "visible" : "hidden" }}
    onPointerDown={event => {
      onActivate();
      if (event.button !== 0 || !(event.target as HTMLElement).closest("[data-drag-handle]")) return;
      const rect = frame.current!.getBoundingClientRect();
      drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, origin: { x: rect.left, y: rect.top } };
      event.currentTarget.setPointerCapture(event.pointerId);
      event.preventDefault();
    }}
    onPointerMove={event => {
      const active = drag.current;
      if (!active || active.pointer !== event.pointerId) return;
      setPosition(constrain({ x: active.origin.x + event.clientX - active.x, y: active.origin.y + event.clientY - active.y }));
    }}
    onPointerUp={event => { drag.current = null; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
    onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }} onFocusCapture={onActivate}>
    {children}
  </div>;
}
