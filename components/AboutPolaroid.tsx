"use client";
import { useState } from "react";
export default function AboutPolaroid({ onClose }: { onClose: () => void }) {
  const [flipped, setFlipped] = useState(false);
  return <section className="about-polaroid">
    <button type="button" className="polaroid-flip" aria-label="Polaroid’i çevir" aria-pressed={flipped} onClick={() => setFlipped(value => !value)}>
      <span className="polaroid-turn" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <span className="polaroid-face polaroid-front" aria-hidden={flipped}><span className="polaroid-photo" data-asset-slot="front-photo" /></span>
        <span className="polaroid-face polaroid-back" aria-hidden={!flipped}><span className="polaroid-handwriting" data-asset-slot="back-handwriting" /></span>
      </span>
    </button>
    <button type="button" className="about-close" aria-label="About Polaroid’i kapat" onClick={event => { event.stopPropagation(); onClose(); }}><span aria-hidden="true">×</span></button>
  </section>;
}
