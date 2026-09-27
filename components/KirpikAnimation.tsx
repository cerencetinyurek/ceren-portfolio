"use client";

import { useEffect, useRef, useState } from "react";

const IDLE_FRAME = 1;
const WALK_FRAMES = [2, 3, 4, 3];
const STRETCH_FRAMES = [5, 6];
const SLEEP_FRAME = 7;

const FIRST_IDLE_DURATION = 2100;
const WALK_DURATION = 5600;
const SECOND_IDLE_DURATION = 1400;
const STRETCH_DURATION = 1000;
const WALK_FRAME_TIME = 145;
// State scaling grows around the bottom center. These coordinates keep the
// larger sitting pose clear of Meow and the sleeping pose clear of Explore.
const START_X = 1102;
const END_X = 365;

type KirpikPhase = "idle-start" | "walking" | "idle-end" | "stretching" | "sleeping";

type KirpikAnimationProps = {
  runId: number | null;
  closing: boolean;
  onClosed: () => void;
};

const frameSource = (frame: number) => `/images/kirpik-gif/${frame}.png`;

export default function KirpikAnimation({ runId, closing, onClosed }: KirpikAnimationProps) {
  const spriteRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(closing);
  const currentFrameRef = useRef(IDLE_FRAME);
  const currentPhaseRef = useRef<KirpikPhase>("idle-start");
  const [frame, setFrame] = useState(IDLE_FRAME);
  const [phase, setPhase] = useState<KirpikPhase>("idle-start");
  closingRef.current = closing;

  useEffect(() => {
    [IDLE_FRAME, ...WALK_FRAMES, ...STRETCH_FRAMES, SLEEP_FRAME].forEach(number => {
      const image = new Image();
      image.src = frameSource(number);
    });
  }, []);

  useEffect(() => {
    if (runId === null) return;

    let animationFrame = 0;
    const startedAt = performance.now();

    const show = (nextPhase: KirpikPhase, nextFrame: number) => {
      if (currentPhaseRef.current !== nextPhase) {
        currentPhaseRef.current = nextPhase;
        setPhase(nextPhase);
      }
      if (currentFrameRef.current !== nextFrame) {
        currentFrameRef.current = nextFrame;
        setFrame(nextFrame);
      }
    };

    currentPhaseRef.current = "idle-start";
    currentFrameRef.current = IDLE_FRAME;
    setPhase("idle-start");
    setFrame(IDLE_FRAME);
    if (spriteRef.current) spriteRef.current.style.transform = `translate3d(${START_X}px, 0, 0)`;

    const animate = (now: number) => {
      if (closingRef.current) return;
      const elapsed = now - startedAt;
      const walkStart = FIRST_IDLE_DURATION;
      const secondIdleStart = walkStart + WALK_DURATION;
      const stretchStart = secondIdleStart + SECOND_IDLE_DURATION;
      const sleepStart = stretchStart + STRETCH_DURATION;

      if (elapsed < walkStart) {
        show("idle-start", IDLE_FRAME);
      } else if (elapsed < secondIdleStart) {
        const walkingElapsed = elapsed - walkStart;
        const progress = Math.min(walkingElapsed / WALK_DURATION, 1);
        const x = START_X + (END_X - START_X) * progress;
        const frameIndex = Math.floor(walkingElapsed / WALK_FRAME_TIME) % WALK_FRAMES.length;
        if (spriteRef.current) spriteRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
        show("walking", WALK_FRAMES[frameIndex]);
      } else if (elapsed < stretchStart) {
        if (spriteRef.current) spriteRef.current.style.transform = `translate3d(${END_X}px, 0, 0)`;
        show("idle-end", IDLE_FRAME);
      } else if (elapsed < sleepStart) {
        const stretchingElapsed = elapsed - stretchStart;
        const frameTime = STRETCH_DURATION / STRETCH_FRAMES.length;
        const frameIndex = Math.min(Math.floor(stretchingElapsed / frameTime), STRETCH_FRAMES.length - 1);
        show("stretching", STRETCH_FRAMES[frameIndex]);
      } else {
        show("sleeping", SLEEP_FRAME);
        return;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [runId]);

  useEffect(() => {
    if (!closing) return;
    const closeTimer = window.setTimeout(onClosed, 720);
    return () => window.clearTimeout(closeTimer);
  }, [closing, onClosed]);

  if (runId === null) return null;

  return (
    <div ref={spriteRef} className={`kirpik-sprite kirpik-${phase}${closing ? " kirpik-closing" : ""}`} aria-hidden="true">
      <img src={frameSource(frame)} alt="" draggable={false} />
      {closing && <span className="kirpik-pixel-heart"><span /></span>}
    </div>
  );
}
