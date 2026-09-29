import { portfolioContent } from "../content/portfolio";

const stickers = [
  { name: "sticker-2", x: 470, y: 278, boxW: 153.039, boxH: 153.039, w: 141.264, h: 141.264, rotate: 5 },
  { name: "sticker-6", x: 930, y: 540, boxW: 111.607, boxH: 107.738, w: 103.363, h: 99.107, rotate: 5 },
  { name: "sticker-3", x: 895, y: 280, boxW: 169.419, boxH: 169.419, w: 169.419, h: 169.419, rotate: 0 },
  { name: "sticker-5", x: 842, y: 600, boxW: 119.45, boxH: 117.293, w: 103.51, h: 100.851, rotate: -10 },
  { name: "sticker-1", x: 422, y: 345, boxW: 120.707, boxH: 120.707, w: 94.176, h: 94.176, rotate: -20 },
  { name: "sticker-4", x: 414, y: 525, boxW: 187.847, boxH: 187.847, w: 187.847, h: 187.847, rotate: 0 },
];

export default function PortfolioCard() {
  return <div className="portfolio-cluster">
    <div className="portfolio-card-layer">
      <div aria-hidden="true" className="portfolio-glass" />
      <h1 className="portfolio-title absolute m-0 font-pixel font-normal leading-normal text-[#79497c]" style={{ left: 0, top: 145, width: 780, height: 105, fontSize: 96, lineHeight: "normal", textAlign: "center" }}>{portfolioContent.hero.title}</h1>
      <p className="portfolio-subtitle absolute m-0 font-fredoka font-normal text-black" style={{ left: 0, top: 286, width: 780, height: 22, fontSize: 14.267, lineHeight: "normal", textAlign: "center", fontVariationSettings: '"wdth" 100' }}>{portfolioContent.hero.subtitle}</p>
      <p className="portfolio-name absolute m-0 font-fredoka font-normal text-black" style={{ left: 0, top: 55, width: 780, height: 70, fontSize: 64, lineHeight: "normal", textAlign: "center", fontVariationSettings: '"wdth" 100' }}>{portfolioContent.hero.ownerName}</p>
    </div>
    {stickers.map((s, index) => <div key={s.name} className={`sticker-float sticker-float-${index} absolute flex items-center justify-center`} style={{ left: s.x, top: s.y, width: s.boxW, height: s.boxH }}>
      <img src={`/images/${s.name}.webp`} alt="" draggable={false} width={s.w} height={s.h} className="pointer-events-none max-w-none shrink-0 object-cover select-none" style={{ width: s.w, height: s.h, transform: `rotate(${s.rotate}deg)` }} />
    </div>)}
  </div>;
}
