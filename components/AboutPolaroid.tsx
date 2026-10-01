"use client";
import { useState } from "react";
import { portfolioContent } from "../content/portfolio";
export default function AboutPolaroid({ onClose }: { onClose: () => void }) {
  const [flipped, setFlipped] = useState(false);
  return <section className="about-polaroid">
    <button type="button" className="polaroid-flip" aria-label={portfolioContent.accessibility.flipPolaroid} aria-pressed={flipped} onClick={() => setFlipped(value => !value)}>
      <span className="polaroid-turn" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <span className="polaroid-face polaroid-front" aria-hidden={flipped}><img className="polaroid-photo" src="/images/about-front.jpeg" alt="" draggable={false} width={1538} height={2046} loading="lazy" decoding="async" /></span>
        <span className="polaroid-face polaroid-back" aria-hidden={!flipped}><img className="polaroid-handwriting" src="/images/about-back.png" alt="" draggable={false} width={1057} height={887} loading="lazy" decoding="async" /></span>
      </span>
    </button>
    <span className="about-drag-handle" data-drag-handle aria-hidden="true" />
    <button type="button" className="about-close" aria-label={portfolioContent.accessibility.closeAbout} onClick={event => { event.stopPropagation(); onClose(); }}>
      <img src="/images/window-close.png" alt="" draggable={false} width={26} height={28} aria-hidden="true" />
    </button>
  </section>;
}
