import { portfolioContent } from "../content/portfolio";

export default function ExploreWindow({ onClose }: { onClose: () => void }) {
  return <section className="explore-window" aria-label={portfolioContent.desktop.exploreTitle}>
    <img src="/images/explore-frame.webp" width={371} height={221} alt="" draggable={false} loading="lazy" />
    <div className="explore-drag-handle" data-drag-handle aria-hidden="true" />
    <button type="button" className="explore-close" aria-label={portfolioContent.accessibility.closeExplore} onClick={onClose} />
  </section>;
}
