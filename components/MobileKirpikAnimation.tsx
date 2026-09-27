"use client";

import { useEffect } from "react";

export type MobileKirpikPhase =
  | "hidden"
  | "sitting"
  | "stretching"
  | "sleeping"
  | "closing";

const frames: Record<Exclude<MobileKirpikPhase, "hidden" | "closing">, number> = {
  sitting: 1,
  stretching: 5,
  sleeping: 7,
};

export default function MobileKirpikAnimation({
  phase,
  onAdvance,
  onClosed,
}: {
  phase: MobileKirpikPhase;
  onAdvance: () => void;
  onClosed: () => void;
}) {
  useEffect(() => {
    if (phase !== "closing") return;
    const timer = window.setTimeout(onClosed, 650);
    return () => window.clearTimeout(timer);
  }, [phase, onClosed]);

  if (phase === "hidden") return null;

  const visiblePhase = phase === "closing" ? "sleeping" : phase;
  return (
    <button
      type="button"
      className={`mobile-kirpik mobile-kirpik-${phase}`}
      aria-label="Advance Kırpık animation"
      disabled={phase === "closing"}
      onClick={(event) => {
        event.stopPropagation();
        onAdvance();
      }}>
      <img
        src={`/images/kirpik-gif/${frames[visiblePhase]}.png`}
        alt=""
        draggable={false}
      />
      {phase === "closing" && (
        <span className="kirpik-pixel-heart">
          <span />
        </span>
      )}
    </button>
  );
}
