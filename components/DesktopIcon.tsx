type Rect = { x: number; y: number; width: number; height: number };
export type DesktopIconProps = {
  name: string;
  label: string;
  accessibleLabel?: string;
  image: Rect;
  text: Rect;
  artworkMaxSize?: number;
  artworkScale?: number;
  onOpen?: () => void;
  href?: string;
  hasPopup?: boolean;
};

export default function DesktopIcon({ name, label, accessibleLabel, image, text, artworkMaxSize, artworkScale, onOpen, href, hasPopup = true }: DesktopIconProps) {
  const accessibleName = accessibleLabel ?? label;
  const artworkWidth = artworkMaxSize ?? image.width;
  const artworkHeight = artworkMaxSize ?? image.height;
  const hitArea = {
    left: Math.min(image.x, text.x),
    top: image.y,
    width: Math.max(image.x + image.width, text.x + text.width) - Math.min(image.x, text.x),
    height: Math.max(image.y + image.height, text.y + text.height) - image.y,
  };

  if (name !== "meow") {
    const itemWidth = Math.max(image.width, text.width);
    const visualHeight = image.height > 130
      ? Math.max(1, text.y - image.y - 7)
      : image.height;
    const itemStyle = {
      left: image.x + image.width / 2 - itemWidth / 2,
      top: image.y,
      width: itemWidth,
      "--desktop-icon-visual-height": `${visualHeight}px`,
    } as React.CSSProperties;

    return <div className="desktop-icon-item" data-icon={name} style={itemStyle}>
      <span className="desktop-icon-visual" aria-hidden="true">
        <img className={`figma-image desktop-icon-art${artworkMaxSize ? " paired-desktop-icon" : ""}`} data-icon={name} src={`/images/${name}.png`} alt="" draggable={false}
          width={artworkWidth} height={artworkHeight}
          style={{
            width: artworkWidth,
            height: artworkHeight,
            transform: artworkScale ? `scale(${artworkScale})` : undefined,
            transformOrigin: "center",
          }} />
      </span>
      <p className="figma-label desktop-icon-label" data-icon={name}>{label}</p>
      {href ? (
        <a className="desktop-icon-button" data-icon={name} aria-label={accessibleName} href={href} />
      ) : onOpen ? (
        <button type="button" className="desktop-icon-button" data-icon={name} aria-label={accessibleName} aria-haspopup={hasPopup ? "dialog" : undefined} onClick={onOpen} />
      ) : null}
    </div>;
  }

  return <div className="desktop-icon-item" data-icon={name}>
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
    <p className="figma-label desktop-icon-label" data-icon={name} style={{ left: text.x, top: text.y, width: text.width, height: text.height }}>{label}</p>
    {href ? (
      <a className="desktop-icon-button" data-icon={name} aria-label={accessibleName} href={href} style={hitArea} />
    ) : onOpen ? (
      <button type="button" className="desktop-icon-button" data-icon={name} aria-label={accessibleName} aria-haspopup={hasPopup ? "dialog" : undefined} onClick={onOpen} style={hitArea} />
    ) : null}
  </div>;
}
