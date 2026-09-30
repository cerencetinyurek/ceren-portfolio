"use client";

import { useEffect, useRef } from "react";

export default function FlowerCursor() {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = layer.current!;
    const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!media.matches || navigator.maxTouchPoints > 0) return;
    const flowers = Array.from(element.querySelectorAll<HTMLImageElement>("img"));
    const points = flowers.map(() => ({ x: 0, y: 0 }));
    let enabled = false, visible = false, ready = false, frame = 0, previous = 0;
    let target = { x: 0, y: 0 }, scale = 1, clickable = false, pressed = false;
    const hide = () => { visible = false; element.style.opacity = "0"; document.documentElement.classList.remove("flower-cursor-active"); cancelAnimationFrame(frame); frame = 0; previous = 0; };
    const tick = (time: number) => {
      if (!visible) return;
      const dt = previous ? Math.min(time - previous, 50) : 16.67;
      previous = time;
      const desiredScale = pressed ? .85 : clickable ? 1.18 : 1;
      scale += (desiredScale - scale) * (1 - Math.exp(-dt / 65));
      points.forEach((point, index) => {
        const destination = index ? points[index - 1] : target;
        const alpha = 1 - Math.exp(-dt / [24, 70, 115][index]);
        point.x += (destination.x - point.x) * alpha;
        point.y += (destination.y - point.y) * alpha;
        flowers[index].style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${index ? 1 : scale})`;
      });
      frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (!enabled || !ready || event.pointerType !== "mouse") { hide(); return; }
      target = { x: event.clientX, y: event.clientY };
      clickable = !!(event.target as Element).closest("button:not(:disabled), a[href], [role=button], [data-drag-handle]");
      if (!visible) {
        points.forEach(point => Object.assign(point, target));
        visible = true;
        element.style.opacity = "1";
        document.documentElement.classList.add("flower-cursor-active");
        frame = requestAnimationFrame(tick);
      }
    };
    const configure = () => { enabled = media.matches && navigator.maxTouchPoints === 0; if (!enabled) hide(); };
    const down = () => { pressed = true; };
    const up = () => { pressed = false; };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };
    const visibility = () => { if (document.hidden) hide(); };
    // A manual popover keeps the decorative cursor above modal Polaroid dialogs.
    element.showPopover();
    const observer = new MutationObserver(records => {
      if (records.some(record => record.target instanceof HTMLDialogElement && record.target.open)) {
        element.hidePopover(); element.showPopover();
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["open"], subtree: true });
    let disposed = false;
    Promise.all(flowers.map(image => image.decode())).then(() => { if (!disposed) ready = true; }).catch(() => hide());
    configure();
    media.addEventListener("change", configure);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true; hide(); observer.disconnect(); element.hidePopover();
      media.removeEventListener("change", configure);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return <div ref={layer} popover="manual" className="flower-cursor" aria-hidden="true">
    <img src="/images/flower-optimized.webp" alt="" draggable={false} loading="lazy" />
    <img src="/images/cursor-purple.webp" alt="" draggable={false} loading="lazy" />
    <img src="/images/cursor-white.webp" alt="" draggable={false} loading="lazy" />
  </div>;
}
