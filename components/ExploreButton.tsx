import { portfolioContent } from "../content/portfolio";

export default function ExploreButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button type="button" className="explore-button group relative h-14 w-32 cursor-pointer border-0 bg-transparent p-0 transition duration-200 hover:scale-[1.035] hover:drop-shadow-[0_0_7px_rgba(255,104,185,.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#79497c] sm:h-16 sm:w-36 lg:h-20 lg:w-44" aria-label={portfolioContent.desktop.exploreTitle} aria-haspopup="dialog" onClick={onOpen}>
      <img className="absolute inset-0 h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-0" src="/images/explore.png" alt="" draggable={false} width={386} height={172} decoding="async" />
      <img className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100" src="/images/explore-hover.png" alt="" draggable={false} width={386} height={172} loading="lazy" decoding="async" />
    </button>
  );
}
