export default function ExploreWindow({ onClose }: { onClose: () => void }) {
  return <section className="explore-window" aria-label="Explore">
    <img src="/images/explore-frame.png" width={371} height={221} alt="" draggable={false} />
    <div className="explore-drag-handle" data-drag-handle aria-hidden="true" />
    <button type="button" className="explore-close" aria-label="Explore penceresini kapat" onClick={onClose} />
  </section>;
}
