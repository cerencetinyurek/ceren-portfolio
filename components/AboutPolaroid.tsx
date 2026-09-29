"use client";
import { useState } from "react";
import { portfolioContent } from "../content/portfolio";
export default function AboutPolaroid({ onClose }: { onClose: () => void }) {
  const [flipped, setFlipped] = useState(false);
  return <section className="about-polaroid">
    <button type="button" className="polaroid-flip" aria-label={portfolioContent.accessibility.flipPolaroid} aria-pressed={flipped} onClick={() => setFlipped(value => !value)}>
      <span className="polaroid-turn" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <span className="polaroid-face polaroid-front" aria-hidden={flipped}><span className="polaroid-photo" data-asset-slot="front-photo" /></span>
        <span className="polaroid-face polaroid-back" aria-hidden={!flipped}><span className="polaroid-handwriting" data-asset-slot="back-handwriting" /></span>
      </span>
    </button>
    <button type="button" className="about-close" aria-label={portfolioContent.accessibility.closeAbout} onClick={event => { event.stopPropagation(); onClose(); }}>
      <img src="/images/window-close.png" alt="" draggable={false} aria-hidden="true" />
    </button>
  </section>;
}
