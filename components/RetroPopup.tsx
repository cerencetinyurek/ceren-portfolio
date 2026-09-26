export type PopupKind = "project" | "experience" | "hobbies" | "skills" | "contact";
const titles: Record<PopupKind, string> = { project: "Projects", experience: "Experience", hobbies: "Hobbies", skills: "Skills", contact: "Contact" };

export default function RetroPopup({ kind, onClose }: { kind: PopupKind; onClose: () => void }) {
  return <section className="retro-popup" aria-label={titles[kind]}>
    <img className="popup-frame" src="/images/popup-frame.webp" width={883} height={795} alt="" draggable={false} loading="lazy" />
    <div className="popup-title-strip" data-drag-handle><h2 className="popup-title">{titles[kind]}</h2></div>
    <div className="popup-menu" aria-label="Pencere menüsü">
      <span>File</span><span>Edit</span><span>View</span><span>Image</span>
    </div>
    <button autoFocus type="button" className="popup-close" aria-label="Kapat" onClick={onClose} />
    <div className="popup-content"><p>İçerik yakında eklenecek.</p></div>
  </section>;
}
