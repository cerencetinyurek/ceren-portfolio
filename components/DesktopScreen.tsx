"use client";

import { useCallback, useState } from "react";
import DesktopIcon, { type DesktopIconProps } from "./DesktopIcon";
import PortfolioCard from "./PortfolioCard";
import RetroPopup, { type PopupKind } from "./RetroPopup";
import AboutPolaroid from "./AboutPolaroid";
import DesktopWindow, { type WindowAnchor } from "./DesktopWindow";
import ExploreButton from "./ExploreButton";
import ExploreWindow from "./ExploreWindow";
import KirpikAnimation from "./KirpikAnimation";
type WindowKind = PopupKind | "explore" | "about";
const windowAnchors: Record<WindowKind, WindowAnchor> = {
  project: { selector: 'button[aria-label="Projects"]', side: "right", gap: 20, vertical: -.46 },
  experience: { selector: 'button[aria-label="Experience"]', side: "right", gap: 26, vertical: -.3 },
  skills: { selector: 'button[aria-label="Skills"]', side: "left", gap: 50, vertical: -.24 },
  hobbies: { selector: 'button[aria-label="Hobbies"]', side: "left", gap: 30, vertical: -.18 },
  contact: { selector: 'button[aria-label="Contact"]', side: "left", gap: 6, vertical: -.52 },
  explore: { selector: 'button[aria-label="Explore"]', side: "right", gap: 14, vertical: -.66 },
  about: { selector: 'button[aria-label="About"]', side: "right", gap: 18, vertical: -.24 },
};
const windowTitles: Record<WindowKind, string> = { project: "Projects", experience: "Experience", skills: "Skills", hobbies: "Hobbies", contact: "Contact", explore: "Explore", about: "About" };

const icons: DesktopIconProps[] = [
  { name: "about", label: "ABOUT", image: { x: 174.54, y: 276.74, width: 103.594, height: 103.594 }, text: { x: 202.3, y: 381.16, width: 62.169, height: 28.368 } },
  { name: "skills", label: "SKİLLS", image: { x: 1165.67, y: 426.49, width: 103.594, height: 104.21 }, text: { x: 1190.34, y: 518.98, width: 77.079, height: 27.132 } },
  { name: "experience", label: "EXPERİENCE", image: { x: 170.89, y: 434.77, width: 103.594, height: 103.594 }, text: { x: 175.76, y: 522.31, width: 131.308, height: 37.386 } },
  { name: "hobbies", label: "HOBİES", image: { x: 1163.73, y: 278.49, width: 103.594, height: 103.594 }, text: { x: 1185.39, y: 367.95, width: 76.736, height: 48.03 } },
  { name: "project", label: "PROJECT", image: { x: 172.84, y: 587.05, width: 103.594, height: 103.594 }, text: { x: 191.32, y: 669.12, width: 95.32, height: 36.474 } },
  { name: "contact", label: "CONTACT", image: { x: 1162.03, y: 566.08, width: 103.594, height: 103.594 }, text: { x: 1186.35, y: 669.12, width: 82.907, height: 73.86 } },
  { name: "meow", label: "MEOW", image: { x: 1153.015, y: 769.532, width: 123.051, height: 123.051 }, text: { x: 1187, y: 867, width: 56, height: 22 } },
];

function Artwork({ name, x, y, width, height }: { name: string; x: number; y: number; width: number; height: number }) {
  const extension = name === "checkerboard" || name === "flower" ? "webp" : "png";
  return <img className="figma-image" src={`/images/${name}.${extension}`} alt="" draggable={false} width={width} height={height} style={{ left: x, top: y, width, height }} />;
}

export default function DesktopScreen() {
  const [windows, setWindows] = useState<WindowKind[]>([]);
  const [kirpikRun, setKirpikRun] = useState<number | null>(null);
  const [kirpikClosing, setKirpikClosing] = useState(false);
  const toggleKirpik = () => {
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
  const activate = (kind: WindowKind) => setWindows(previous => previous.at(-1) === kind ? previous : [...previous.filter(item => item !== kind), kind]);
  const toggle = (kind: WindowKind) => setWindows(previous => previous.includes(kind) ? previous.filter(item => item !== kind) : [...previous, kind]);
  return <><div className="desktop-viewport"><div className="desktop-canvas bg-[#fff9f2]" aria-label="Ceren’s portfolio desktop">
    <div className="desktop-outer-frame absolute" style={{ left: 107.67, top: 60, width: 1224.571, height: 866.711 }} />
    <Artwork name="checkerboard" x={120.75} y={76.64} width={1198.415} height={840.555} />
    <div className="absolute border-solid" style={{ left: 119.56, top: 74.27, width: 1198.415, height: 35.667, background: "rgba(234,233,233,.3)", borderWidth: 1.189, borderColor: "rgba(239,219,219,.92)", backdropFilter: "blur(17.834px)" }} />
    <div className="desktop-taskbar absolute" style={{ left: 119.56, top: 856.51, width: 1198.415, height: 60.312 }} />
    {icons.map(icon => <DesktopIcon key={icon.name} {...icon}
      hasPopup={icon.name !== "meow"}
      onOpen={icon.name === "meow" ? toggleKirpik : () => toggle(icon.name as PopupKind | "about")} />)}
    <Artwork name="close" x={1283.5} y={81.4} width={22.918} height={22.27} />
    <Artwork name="minimize" x={1222.86} y={81.4} width={22.973} height={22.218} />
    <Artwork name="maximize" x={1253.78} y={81.4} width={24.902} height={21.457} />
    <ExploreButton onOpen={() => toggle("explore")} />
    <PortfolioCard />
    <KirpikAnimation runId={kirpikRun} closing={kirpikClosing} onClosed={removeKirpik} />
    <Artwork name="flower" x={140.96} y={71.89} width={109.379} height={109.379} />
  </div></div>
    {windows.map((kind, index) => <DesktopWindow key={kind} label={windowTitles[kind]} anchor={windowAnchors[kind]} zIndex={100 + index} onActivate={() => activate(kind)} className={kind === "about" ? "desktop-window-about" : kind === "explore" ? "desktop-window-explore" : "desktop-window-popup"}>
      {kind === "about"
        ? <AboutPolaroid onClose={() => setWindows(previous => previous.filter(item => item !== kind))} />
        : kind === "explore"
          ? <ExploreWindow onClose={() => setWindows(previous => previous.filter(item => item !== kind))} />
          : <RetroPopup kind={kind} onClose={() => setWindows(previous => previous.filter(item => item !== kind))} />}
    </DesktopWindow>)}
  </>;
}
