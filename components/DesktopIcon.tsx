type Rect = { x: number; y: number; width: number; height: number };
export type DesktopIconProps = {
  name: string;
  label: string;
  image: Rect;
  text: Rect;
  artworkMaxSize?: number;
  artworkScale?: number;
  onOpen?: () => void;
  href?: string;
  hasPopup?: boolean;
};

export default function DesktopIcon({ name, label, image, text, artworkMaxSize, artworkScale, onOpen, href, hasPopup = true }: DesktopIconProps) {
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
    <p className="figma-label desktop-icon-label" data-icon={name} style={{ left: text.x, top: text.y, width: text.width, height: text.height }}>{label}</p>
    {/* Original Figma raster artwork, including its transparent padding. */}
    <img className={`figma-image desktop-icon-art${artworkMaxSize ? " paired-desktop-icon" : ""}`} data-icon={name} src={`/images/${name}.png`} alt="" draggable={false}
      width={artworkWidth} height={artworkHeight}
      style={{
        left: image.x + (image.width - artworkWidth) / 2,
        top: image.y + (image.height - artworkHeight) / 2,
        width: artworkWidth,
        height: artworkHeight,
        transform: artworkScale ? `scale(${artworkScale})` : undefined,
        transformOrigin: "center",
      }} />
    {href ? (
      <a className="desktop-icon-button" data-icon={name} aria-label={accessibleName} href={href} style={hitArea} />
    ) : onOpen ? (
      <button type="button" className="desktop-icon-button" data-icon={name} aria-label={accessibleName} aria-haspopup={hasPopup ? "dialog" : undefined} onClick={onOpen} style={hitArea} />
    ) : null}
  </>;
}
