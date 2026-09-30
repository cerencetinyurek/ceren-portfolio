"use client";

import { useCallback, useEffect, useState } from "react";
import DesktopIcon, { type DesktopIconProps } from "./DesktopIcon";
import PortfolioCard from "./PortfolioCard";
import RetroPopup, { type PopupKind } from "./RetroPopup";
import AboutPolaroid from "./AboutPolaroid";
import DesktopWindow, { type MobileWindowPlacement, type WindowAnchor } from "./DesktopWindow";
import ExploreWindow from "./ExploreWindow";
import KirpikAnimation from "./KirpikAnimation";
import MobileKirpikAnimation, { type MobileKirpikPhase } from "./MobileKirpikAnimation";
import { portfolioContent } from "../content/portfolio";

type WindowKind = PopupKind | "explore" | "about";
type NavigationIcon = DesktopIconProps & { windowKind?: WindowKind };

const iconSelector = (label: string) => `button[aria-label="${label}"]`;
const windowAnchors: Record<WindowKind, WindowAnchor> = {
  project: { selector: iconSelector(portfolioContent.sections.project.title), side: "right", gap: 20, vertical: -0.46 },
  experience: { selector: iconSelector(portfolioContent.sections.experience.title), side: "right", gap: 26, vertical: -0.3 },
  skills: { selector: iconSelector(portfolioContent.sections.skills.title), side: "left", gap: 50, vertical: -0.24 },
  hobbies: { selector: iconSelector(portfolioContent.sections.hobbies.title), side: "left", gap: 30, vertical: -0.18 },
  contact: { selector: iconSelector(portfolioContent.sections.contact.title), side: "left", gap: 6, vertical: -0.52 },
  bookmark: { selector: iconSelector(portfolioContent.sections.bookmark.title), side: "right", gap: 24, vertical: -0.08 },
  explore: { selector: iconSelector(portfolioContent.desktop.exploreTitle), side: "right", gap: 14, vertical: -0.66 },
  about: { selector: iconSelector(portfolioContent.sections.about.title), side: "right", gap: 18, vertical: -0.24 },
};

const windowTitles: Record<WindowKind, string> = {
  project: portfolioContent.sections.project.title,
  experience: portfolioContent.sections.experience.title,
  skills: portfolioContent.sections.skills.title,
  hobbies: portfolioContent.sections.hobbies.title,
  contact: portfolioContent.sections.contact.title,
  bookmark: portfolioContent.sections.bookmark.title,
  explore: portfolioContent.desktop.exploreTitle,
  about: portfolioContent.sections.about.title,
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

const leftNavigationIcons: NavigationIcon[] = [
  {
    name: "about",
    label: portfolioContent.sections.about.navigationLabel,
    accessibleLabel: portfolioContent.sections.about.title,
    windowKind: "about",
  },
  {
    name: "experience",
    label: portfolioContent.sections.experience.navigationLabel,
    accessibleLabel: portfolioContent.sections.experience.title,
    windowKind: "experience",
  },
  {
    name: "project",
    label: portfolioContent.sections.project.navigationLabel,
    accessibleLabel: portfolioContent.sections.project.title,
    windowKind: "project",
  },
  {
    name: "bookmark",
    label: portfolioContent.sections.bookmark.navigationLabel,
    accessibleLabel: portfolioContent.sections.bookmark.title,
    windowKind: "bookmark",
    imageSize: "h-12 w-12 sm:h-12 sm:w-12 md:h-11 md:w-11 xl:h-15 xl:w-15",
  },
];

const rightNavigationIcons: NavigationIcon[] = [
  {
    name: "contact",
    label: portfolioContent.sections.contact.navigationLabel,
    accessibleLabel: portfolioContent.sections.contact.title,
    windowKind: "contact",
  },
  {
    name: "skills",
    label: portfolioContent.sections.skills.navigationLabel,
    accessibleLabel: portfolioContent.sections.skills.title,
    windowKind: "skills",
  },
  {
    name: "hobbies",
    label: portfolioContent.sections.hobbies.navigationLabel,
    accessibleLabel: portfolioContent.sections.hobbies.title,
    windowKind: "hobbies",
  },
  {
    name: "booknook",
    label: portfolioContent.sections.booknook.navigationLabel,
    accessibleLabel: portfolioContent.sections.booknook.title,
    href: portfolioContent.sections.booknook.url,
    openInNewTab: true,
    hasPopup: false,
    imageSize: "h-20 w-20 xl:h-24 xl:w-24",
    visualSize: "h-20 xl:h-24",
    itemGap: "gap-0",
    labelClassName: "-mt-1",
  },
  {
    name: "meow",
    label: portfolioContent.desktop.meowLabel,
    accessibleLabel: portfolioContent.desktop.meowLabel,
    hasPopup: false,
    placement: "col-start-2 row-start-5 md:col-auto md:row-auto",
    imageSize: "h-11 w-16 sm:h-12 sm:w-18 md:h-16 md:w-24 xl:h-18 xl:w-28",
    visualSize: "h-11 sm:h-12 md:h-16 xl:h-18",
    itemGap: "gap-0",
    labelClassName: "-mt-1",
  },
];

const mobileNavigationIcons = Array.from(
  { length: Math.max(leftNavigationIcons.length, rightNavigationIcons.length) },
  (_, index) => [leftNavigationIcons[index], rightNavigationIcons[index]],
).flat().filter((icon): icon is NavigationIcon => Boolean(icon));

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
    if (window.matchMedia("(max-width: 1023px)").matches) {
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
  const activate = (kind: WindowKind) => setWindows((previous) => previous.at(-1) === kind ? previous : [...previous.filter((item) => item !== kind), kind]);
  const toggle = (kind: WindowKind) => setWindows((previous) => previous.includes(kind) ? previous.filter((item) => item !== kind) : [...previous, kind]);

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
      <section className="relative flex h-full max-h-[1025px] w-full max-w-[1200px] min-h-0 flex-col overflow-hidden border-[6px] border-[#f4e7a1] bg-[#f4e7a1] shadow-[0_8px_24px_rgba(121,73,124,.14)] md:scale-90" aria-label={portfolioContent.accessibility.desktopLabel}>
        <img className="absolute inset-0 h-full w-full object-cover" src="/images/bg-liquified.png" alt="" draggable={false} />
        <header className="relative z-20 flex h-8 shrink-0 items-center justify-end gap-1 border-b border-white/20 bg-white/15 px-2 shadow-[inset_0_-1px_0_rgba(255,255,255,.16)] backdrop-blur-md sm:h-9">
          <img className="mr-auto h-14 w-14 translate-y-5 object-contain sm:h-16 sm:w-16 sm:translate-y-6 lg:h-20 lg:w-20" src="/images/flower.webp" alt="" draggable={false} />
          <img className="h-[18px] w-auto object-contain sm:h-[22px]" src="/images/window-controls.png" alt="" draggable={false} />
        </header>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div className="relative z-10 grid h-full min-h-0 grid-rows-[minmax(8rem,auto)_minmax(0,1fr)] gap-2 px-5 py-3 sm:grid-rows-[minmax(10rem,auto)_minmax(0,1fr)] sm:px-8 md:grid-cols-[7rem_minmax(0,1fr)_7rem] md:grid-rows-1 md:justify-center md:gap-x-5 md:px-8 md:py-6 lg:grid-cols-[12rem_minmax(0,1fr)_12rem] lg:py-8">
            <div className="flex min-w-0 items-center px-4 pt-8 sm:pt-10 md:col-start-2 md:row-start-1 md:px-0 md:pt-12 lg:pt-10">
              <PortfolioCard />
            </div>
            <nav className="grid min-h-0 grid-cols-2 grid-rows-5 gap-x-5 gap-y-1 md:hidden" aria-label="Portfolio navigation">
              {mobileNavigationIcons.map((icon) => (
                <DesktopIcon key={icon.name} {...icon} onOpen={icon.name === "meow" ? toggleKirpik : icon.windowKind ? () => toggle(icon.windowKind!) : undefined} />
              ))}
            </nav>
            <nav className="hidden min-h-0 -translate-x-6 content-center gap-y-1 md:col-start-1 md:row-start-1 md:grid md:grid-rows-[repeat(5,minmax(0,6rem))] lg:-translate-x-8 lg:grid-rows-[repeat(5,minmax(0,7rem))]" aria-label="Portfolio navigation left">
              {leftNavigationIcons.map((icon) => (
                <DesktopIcon key={icon.name} {...icon} onOpen={icon.windowKind ? () => toggle(icon.windowKind!) : undefined} />
              ))}
              <DesktopIcon name="music" label="MUSIC" hasPopup={false} />
            </nav>
            <nav className="hidden min-h-0 translate-x-[17px] content-center gap-y-1 md:col-start-3 md:row-start-1 md:grid md:grid-rows-[repeat(5,minmax(0,6rem))] lg:grid-rows-[repeat(5,minmax(0,7rem))]" aria-label="Portfolio navigation right">
              {rightNavigationIcons.map((icon) => (
                <DesktopIcon key={icon.name} {...icon} onOpen={icon.name === "meow" ? toggleKirpik : icon.windowKind ? () => toggle(icon.windowKind!) : undefined} />
              ))}
            </nav>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden h-20 lg:block">
            <KirpikAnimation runId={kirpikRun} closing={kirpikClosing} onClosed={removeKirpik} />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 lg:hidden">
            <MobileKirpikAnimation phase={mobileKirpikPhase} onAdvance={advanceMobileKirpikState} onClosed={() => setMobileKirpikPhase("hidden")} />
          </div>
        </div>

        <footer className="relative z-20 h-8 shrink-0 border-t-2 border-white/90 bg-[#f4e7a1] shadow-[0_-3px_10px_rgba(121,73,124,.08)] sm:h-10">
          <div className="grid h-full grid-cols-2 gap-x-5 px-5 sm:px-8 md:grid-cols-[7rem_minmax(0,1fr)_7rem] md:gap-x-5 lg:grid-cols-[12rem_minmax(0,1fr)_12rem]">
            <div className="flex -translate-x-4 -translate-y-[3px] items-center justify-center">
            <DesktopIcon
              name="explore"
              label=""
              accessibleLabel={portfolioContent.desktop.exploreTitle}
              imageSrc="/images/explore.png"
              hoverImageSrc="/images/explore-hover.png"
              imageSize="h-[30px] w-auto scale-[1.25] sm:h-9"
              visualSize="h-[30px] sm:h-9"
              onOpen={() => toggle("explore")}
            />
            </div>
          </div>
        </footer>
      </section>

      {windows.map((kind, index) => (
        <DesktopWindow key={kind} label={windowTitles[kind]} anchor={windowAnchors[kind]} mobilePlacement={mobileWindowPlacements[kind]} zIndex={100 + index} onActivate={() => activate(kind)} className={kind === "about" ? "desktop-window-about" : kind === "explore" ? "desktop-window-explore" : "desktop-window-popup"}>
          {kind === "about" ? (
            <AboutPolaroid onClose={() => setWindows((previous) => previous.filter((item) => item !== kind))} />
          ) : kind === "explore" ? (
            <ExploreWindow onClose={() => setWindows((previous) => previous.filter((item) => item !== kind))} />
          ) : (
            <RetroPopup kind={kind} onClose={() => setWindows((previous) => previous.filter((item) => item !== kind))} />
          )}
        </DesktopWindow>
      ))}
    </>
  );
}
