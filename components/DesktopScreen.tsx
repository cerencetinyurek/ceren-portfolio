"use client";

import { useCallback, useEffect, useState } from "react";
import DesktopIcon, { type DesktopIconProps } from "./DesktopIcon";
import PortfolioCard from "./PortfolioCard";
import RetroPopup, { type PopupKind } from "./RetroPopup";
import AboutPolaroid from "./AboutPolaroid";
import DesktopWindow, { type MobileWindowPlacement, type WindowAnchor } from "./DesktopWindow";
import ExploreButton from "./ExploreButton";
import ExploreWindow from "./ExploreWindow";
import KirpikAnimation from "./KirpikAnimation";
import MobileKirpikAnimation, { type MobileKirpikPhase } from "./MobileKirpikAnimation";
type WindowKind = PopupKind | "explore" | "about";
const windowAnchors: Record<WindowKind, WindowAnchor> = {
  project: {
    selector: 'button[aria-label="Projects"]',
    side: "right",
    gap: 20,
    vertical: -0.46,
  },
  experience: {
    selector: 'button[aria-label="Experience"]',
    side: "right",
    gap: 26,
    vertical: -0.3,
  },
  skills: {
    selector: 'button[aria-label="Skills"]',
    side: "left",
    gap: 50,
    vertical: -0.24,
  },
  hobbies: {
    selector: 'button[aria-label="Hobbies"]',
    side: "left",
    gap: 30,
    vertical: -0.18,
  },
  contact: {
    selector: 'button[aria-label="Contact"]',
    side: "left",
    gap: 6,
    vertical: -0.52,
  },
  bookmark: {
    selector: 'button[aria-label="Bookmark"]',
    side: "right",
    gap: 24,
    vertical: -0.08,
  },
  explore: {
    selector: 'button[aria-label="Explore"]',
    side: "right",
    gap: 14,
    vertical: -0.66,
  },
  about: {
    selector: 'button[aria-label="About"]',
    side: "right",
    gap: 18,
    vertical: -0.24,
  },
};
const windowTitles: Record<WindowKind, string> = {
  project: "Projects",
  experience: "Experience",
  skills: "Skills",
  hobbies: "Hobbies",
  contact: "Contact",
  bookmark: "Bookmark",
  explore: "Explore",
  about: "About",
};

const mobileWindowPlacements: Record<WindowKind, MobileWindowPlacement> = {
  project: { x: 0.9, y: 0.1 },
  experience: { x: 0.05, y: 0.12 },
  skills: { x: 0.08, y: 0.42 },
  hobbies: { x: 0.92, y: 0.4 },
  contact: { x: 0.94, y: 0.72 },
  bookmark: { x: 0.04, y: 0.74 },
  about: { x: 0.14, y: 0.43 },
  explore: { x: 0.42, y: 0.68 },
};

const icons: DesktopIconProps[] = [
  {
    name: "booknook",
    label: "BOOKNOOK",
    image: { x: 1172.5, y: 577, width: 183, height: 183 },
    text: { x: 1214, y: 725, width: 100, height: 28 },
    artworkScale: 0.9,
    href: "https://booknook.cerencetinyurek.com",
    hasPopup: false,
  },
  {
    name: "bookmark",
    label: "BOOKMARK",
    image: { x: 153.5, y: 628, width: 97, height: 97 },
    text: { x: 147, y: 725, width: 110, height: 28 },
    artworkScale: 0.9,
  },
  {
    name: "about",
    label: "ABOUT",
    image: { x: 150.2, y: 225, width: 103.594, height: 103.594 },
    text: { x: 170.92, y: 329.42, width: 62.169, height: 28.368 },
  },
  {
    name: "skills",
    label: "SKILLS",
    image: { x: 1212.2, y: 365.05, width: 103.594, height: 104.21 },
    text: { x: 1225.46, y: 457.54, width: 77.079, height: 27.132 },
  },
  {
    name: "experience",
    label: "EXPERIENCE",
    image: { x: 150.2, y: 370, width: 103.594, height: 103.594 },
    text: { x: 136.35, y: 457.54, width: 131.308, height: 37.386 },
  },
  {
    name: "hobbies",
    label: "HOBIES",
    image: { x: 1212.2, y: 503.6, width: 103.594, height: 103.594 },
    text: { x: 1225.63, y: 593.07, width: 76.736, height: 48.03 },
  },
  {
    name: "project",
    label: "PROJECT",
    image: { x: 150.2, y: 511, width: 103.594, height: 103.594 },
    text: { x: 154.34, y: 593.07, width: 95.32, height: 36.474 },
  },
  {
    name: "contact",
    label: "CONTACT",
    image: { x: 1212.2, y: 226.38, width: 103.594, height: 103.594 },
    text: { x: 1222.55, y: 329.42, width: 82.907, height: 73.86 },
  },
  {
    name: "meow",
    label: "MEOW",
    image: { x: 1203.015, y: 769.532, width: 123.051, height: 123.051 },
    text: { x: 1237, y: 867, width: 56, height: 22 },
  },
];

function Artwork({
  name,
  x,
  y,
  width,
  height,
}: {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const extension =
    name === "checkerboard" || name === "flower" ? "webp" : "png";
  return (
    <img
      className={`figma-image figma-artwork figma-artwork-${name}`}
      src={`/images/${name}.${extension}`}
      alt=""
      draggable={false}
      width={width}
      height={height}
      style={{ left: x, top: y, width, height }}
    />
  );
}

export default function DesktopScreen() {
  const [windows, setWindows] = useState<WindowKind[]>([]);
  const [kirpikRun, setKirpikRun] = useState<number | null>(null);
  const [kirpikClosing, setKirpikClosing] = useState(false);
  const [mobileKirpikPhase, setMobileKirpikPhase] = useState<MobileKirpikPhase>("hidden");
  const advanceMobileKirpikState = useCallback(() => {
    setMobileKirpikPhase((current) => {
      if (current === "hidden") return "sitting";
      if (current === "sitting") return "stretching";
      if (current === "stretching") return "sleeping";
      if (current === "sleeping") return "closing";
      return current;
    });
  }, []);
  const toggleKirpik = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      advanceMobileKirpikState();
      return;
    }
    if (kirpikClosing) return;
    if (kirpikRun === null) {
      setKirpikRun(1);
      return;
    }
    setKirpikClosing(true);
  };
  const removeKirpik = useCallback(() => {
    setKirpikRun(null);
    setKirpikClosing(false);
  }, []);
  const activate = (kind: WindowKind) =>
    setWindows((previous) =>
      previous.at(-1) === kind
        ? previous
        : [...previous.filter((item) => item !== kind), kind],
    );
  const toggle = (kind: WindowKind) =>
    setWindows((previous) =>
      previous.includes(kind)
        ? previous.filter((item) => item !== kind)
        : [...previous, kind],
    );
  useEffect(() => {
    if (windows.length === 0) return;
    const closeTopWindow = (event: PointerEvent) => {
      if (!window.matchMedia("(max-width: 768px)").matches) return;
      const target = event.target as HTMLElement;
      if (target.closest(".desktop-window, .desktop-icon-button, .explore-button")) return;
      setWindows((previous) => previous.slice(0, -1));
    };
    document.addEventListener("pointerdown", closeTopWindow);
    return () => document.removeEventListener("pointerdown", closeTopWindow);
  }, [windows.length]);
  return (
    <>
      <div className="desktop-viewport">
        <div
          className="desktop-canvas"
          aria-label="Ceren’s portfolio desktop">
          <div
            className="desktop-outer-frame absolute"
            style={{ left: 55, top: 68.5, width: 1330, height: 858.211 }}
          />
          <Artwork
            name="bg-liquified"
            x={62}
            y={76.64}
            width={1316}
            height={800}
          />
          <div
            className="desktop-topbar absolute border-solid"
            style={{
              left: 61,
              top: 74.27,
              width: 1318,
              height: 35.667,
              background: "rgba(234,233,233,.3)",
              borderWidth: 1.189,
              borderColor: "rgba(239,219,219,.92)",
              backdropFilter: "blur(17.834px)",
            }}
          />
          <div
            className="desktop-taskbar absolute"
            style={{
              left: 61,
              top: 856.51,
              width: 1318,
              height: 60.312,
            }}
          />
          {icons.map((icon) => (
            <DesktopIcon
              key={icon.name}
              {...icon}
              hasPopup={icon.hasPopup ?? icon.name !== "meow"}
              onOpen={
                icon.href
                  ? undefined
                  : icon.name === "meow"
                  ? toggleKirpik
                  : () => toggle(icon.name as PopupKind | "about")
              }
            />
          ))}
          <Artwork
            name="close"
            x={1341.5}
            y={81.4}
            width={22.918}
            height={22.27}
          />
          <Artwork
            name="minimize"
            x={1280.86}
            y={81.4}
            width={22.973}
            height={22.218}
          />
          <Artwork
            name="maximize"
            x={1311.78}
            y={81.4}
            width={24.902}
            height={21.457}
          />
          <ExploreButton onOpen={() => toggle("explore")} />
          <PortfolioCard />
          <KirpikAnimation
            runId={kirpikRun}
            closing={kirpikClosing}
            onClosed={removeKirpik}
          />
          <MobileKirpikAnimation
            phase={mobileKirpikPhase}
            onAdvance={advanceMobileKirpikState}
            onClosed={() => setMobileKirpikPhase("hidden")}
          />
          <Artwork
            name="flower"
            x={82.96}
            y={71.89}
            width={109.379}
            height={109.379}
          />
        </div>
      </div>
      {windows.map((kind, index) => (
        <DesktopWindow
          key={kind}
          label={windowTitles[kind]}
          anchor={windowAnchors[kind]}
          mobilePlacement={mobileWindowPlacements[kind]}
          zIndex={100 + index}
          onActivate={() => activate(kind)}
          className={
            kind === "about"
              ? "desktop-window-about"
              : kind === "explore"
                ? "desktop-window-explore"
                : "desktop-window-popup"
          }>
          {kind === "about" ? (
            <AboutPolaroid
              onClose={() =>
                setWindows((previous) =>
                  previous.filter((item) => item !== kind),
                )
              }
            />
          ) : kind === "explore" ? (
            <ExploreWindow
              onClose={() =>
                setWindows((previous) =>
                  previous.filter((item) => item !== kind),
                )
              }
            />
          ) : (
            <RetroPopup
              kind={kind}
              onClose={() =>
                setWindows((previous) =>
                  previous.filter((item) => item !== kind),
                )
              }
            />
          )}
        </DesktopWindow>
      ))}
    </>
  );
}
