type Rect = { x: number; y: number; width: number; height: number };
export type DesktopIconProps = {
  name: string;
  label: string;
  image: Rect;
  text: Rect;
  onOpen?: () => void;
  hasPopup?: boolean;
};

export default function DesktopIcon({ name, label, image, text, onOpen, hasPopup = true }: DesktopIconProps) {
  return <>
    <p className="figma-label" style={{ left: text.x, top: text.y, width: text.width, height: text.height }}>{label}</p>
    {/* Original Figma raster artwork, including its transparent padding. */}
    <img className="figma-image" src={`/images/${name}.png`} alt="" draggable={false}
      width={image.width} height={image.height}
      style={{ left: image.x, top: image.y, width: image.width, height: image.height }} />
    {onOpen && <button type="button" className="desktop-icon-button" aria-label={name === "project" ? "Projects" : name[0].toUpperCase() + name.slice(1)} aria-haspopup={hasPopup ? "dialog" : undefined} onClick={onOpen}
      style={{ left: Math.min(image.x, text.x), top: image.y, width: Math.max(image.x + image.width, text.x + text.width) - Math.min(image.x, text.x), height: Math.max(image.y + image.height, text.y + text.height) - image.y }} />}
  </>;
}
