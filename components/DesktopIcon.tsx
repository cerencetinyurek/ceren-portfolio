type Rect = { x: number; y: number; width: number; height: number };
export type DesktopIconProps = {
  name: string;
  label: string;
  image: Rect;
  text: Rect;
  artworkMaxSize?: number;
  onOpen?: () => void;
  href?: string;
  hasPopup?: boolean;
};

export default function DesktopIcon({ name, label, image, text, artworkMaxSize, onOpen, href, hasPopup = true }: DesktopIconProps) {
  const accessibleName = name === "project" ? "Projects" : name[0].toUpperCase() + name.slice(1);
  const artworkWidth = artworkMaxSize ?? image.width;
  const artworkHeight = artworkMaxSize ?? image.height;
  const hitArea = {
    left: Math.min(image.x, text.x),
    top: image.y,
    width: Math.max(image.x + image.width, text.x + text.width) - Math.min(image.x, text.x),
    height: Math.max(image.y + image.height, text.y + text.height) - image.y,
  };

  return <>
    <p className="figma-label" style={{ left: text.x, top: text.y, width: text.width, height: text.height }}>{label}</p>
    {/* Original Figma raster artwork, including its transparent padding. */}
    <img className={`figma-image${artworkMaxSize ? " paired-desktop-icon" : ""}`} src={`/images/${name}.png`} alt="" draggable={false}
      width={artworkWidth} height={artworkHeight}
      style={{
        left: image.x + (image.width - artworkWidth) / 2,
        top: image.y + (image.height - artworkHeight) / 2,
        width: artworkWidth,
        height: artworkHeight,
      }} />
    {href ? (
      <a className="desktop-icon-button" aria-label={accessibleName} href={href} style={hitArea} />
    ) : onOpen ? (
      <button type="button" className="desktop-icon-button" aria-label={accessibleName} aria-haspopup={hasPopup ? "dialog" : undefined} onClick={onOpen} style={hitArea} />
    ) : null}
  </>;
}
