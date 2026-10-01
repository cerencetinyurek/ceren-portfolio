export type DesktopIconProps = {
  name: string;
  label: string;
  accessibleLabel?: string;
  onOpen?: () => void;
  href?: string;
  openInNewTab?: boolean;
  hasPopup?: boolean;
  placement?: string;
  imageSize?: string;
  visualSize?: string;
  itemGap?: string;
  labelClassName?: string;
  imageSrc?: string;
  hoverImageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export default function DesktopIcon({ name, label, accessibleLabel, onOpen, href, openInNewTab = false, hasPopup = true, placement = "", imageSize = "h-12 w-12 sm:h-12 sm:w-12 xl:h-18 xl:w-18", visualSize = "h-14 sm:h-14 xl:h-20", itemGap = "gap-1.5 xl:gap-2", labelClassName = "", imageSrc, hoverImageSrc, imageWidth = 256, imageHeight = 256 }: DesktopIconProps) {
  const accessibleName = accessibleLabel ?? label;
  return (
    <div className={`group relative z-10 flex min-w-0 flex-col items-center justify-center ${itemGap} ${placement}`} data-icon={name}>
      <span className={`relative flex w-full items-center justify-center ${visualSize}`} aria-hidden="true">
        <img className={`${imageSize} object-contain select-none ${hoverImageSrc ? "transition-opacity duration-200 group-hover:opacity-0" : ""}`} data-icon={name} src={imageSrc ?? `/images/${name}-optimized.webp`} alt="" draggable={false} width={imageWidth} height={imageHeight} decoding="async" />
        {hoverImageSrc ? <img className={`${imageSize} absolute object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100`} src={hoverImageSrc} alt="" draggable={false} width={imageWidth} height={imageHeight} loading="lazy" decoding="async" /> : null}
      </span>
      {label ? <span className={`font-pixel text-[10px] leading-none whitespace-nowrap text-black sm:text-xs xl:text-base ${labelClassName}`}>{label}</span> : null}
      {href ? (
        <a className="desktop-icon-button absolute -inset-1 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#79497c]" aria-label={accessibleName} href={href} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noopener noreferrer" : undefined} />
      ) : onOpen ? (
        <button type="button" className="desktop-icon-button absolute -inset-1 cursor-pointer rounded-sm border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#79497c]" aria-label={accessibleName} aria-haspopup={hasPopup ? "dialog" : undefined} onClick={onOpen} />
      ) : null}
    </div>
  );
}
