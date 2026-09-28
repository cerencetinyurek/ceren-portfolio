import {
  popupContent,
  portfolioContent,
  type PortfolioPopupKind,
} from "../content/portfolio";

export type PopupKind = PortfolioPopupKind;

type StructuredContent =
  | {
      type: "experience";
      downloads: readonly { label: string; path: string; fileName: string }[];
      items: readonly { company: string; role: string; description: string }[];
    }
  | { type: "projects"; items: readonly { number: string; title: string; description: string }[] }
  | { type: "skills"; groups: readonly { title: string; items: readonly string[] }[] }
  | { type: "hobbies"; items: readonly string[] }
  | { type: "contact"; items: readonly { label: string; value: string; url: string }[] };

function PopupBody({ content }: { content: string | StructuredContent }) {
  if (typeof content === "string") return <p>{content}</p>;

  if (content.type === "experience") return <>
    <div className="popup-download-group popup-download-group-experience">
      {content.downloads.map((download) => <a
        className="popup-download-button"
        href={download.path}
        download={download.fileName}
        key={download.path}>
        {download.label}
      </a>)}
    </div>
    <div className="popup-entry-list">
      {content.items.map((item) => <article className="popup-entry" key={item.company}>
        <h3>{item.company}</h3><p className="popup-role">{item.role}</p><p>{item.description}</p>
      </article>)}
    </div>
  </>;

  if (content.type === "projects") return <div className="popup-entry-list">
    {content.items.map((item) => <article className="popup-entry" key={item.number}>
      <p className="popup-number">{item.number}</p><h3>{item.title}</h3><p>{item.description}</p>
    </article>)}
  </div>;

  if (content.type === "skills") return <div className="popup-skill-groups">
    {content.groups.map((group) => <section key={group.title}>
      <h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>)}
  </div>;

  if (content.type === "hobbies") return <ul className="popup-hobby-list">
    {content.items.map((item) => <li key={item}>{item}</li>)}
  </ul>;

  return <address className="popup-contact-list">
    {content.items.map((item) => <a key={item.label} href={item.url}>
      <strong>{item.label}</strong><span>{item.value}</span>
    </a>)}
  </address>;
}

export default function RetroPopup({ kind, onClose }: { kind: PopupKind; onClose: () => void }) {
  const section = popupContent[kind];

  return <section className="retro-popup" aria-label={section.title}>
    <img className="popup-frame" src="/images/popup-frame.webp" width={883} height={795} alt="" draggable={false} loading="lazy" />
    <div className="popup-title-strip" data-drag-handle><h2 className="popup-title">{section.title}</h2></div>
    <div className="popup-menu" aria-label={portfolioContent.accessibility.popupMenu}>
      {portfolioContent.desktop.popupMenu.map((item) => <span key={item}>{item}</span>)}
    </div>
    <button autoFocus type="button" className="popup-close" aria-label={portfolioContent.accessibility.closePopup} onClick={onClose} />
    <div className="popup-content"><PopupBody content={section.content as string | StructuredContent} /></div>
  </section>;
}
