import { portfolioContent } from "../content/portfolio";

export default function ExploreButton({ onOpen }: { onOpen: () => void }) {
  return <button type="button" className="explore-button" aria-label={portfolioContent.desktop.exploreTitle} aria-haspopup="dialog" onClick={onOpen}>
    <img className="explore-button-image explore-button-default" src="/images/explore.png" alt="" draggable={false} />
    <img className="explore-button-image explore-button-hover" src="/images/explore-hover.png" alt="" draggable={false} />
  </button>;
}
