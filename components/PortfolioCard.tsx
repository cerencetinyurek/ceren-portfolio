import { portfolioContent } from "../content/portfolio";

const stickers = [
  { name: "sticker-2", className: "-left-5 -top-7 w-20 sm:-left-8 sm:-top-10 sm:w-28 lg:-left-8 lg:-top-10 lg:w-28", rotate: 5 },
  { name: "sticker-6", className: "-right-5 -bottom-5 w-16 sm:-right-8 sm:-bottom-8 sm:w-20 lg:-right-8 lg:-bottom-12 lg:w-20", rotate: 5 },
  { name: "sticker-3", className: "-right-7 -top-8 w-20 sm:-right-10 sm:-top-10 sm:w-28 lg:-right-10 lg:-top-10 lg:w-28", rotate: 0 },
  { name: "sticker-5", className: "right-8 -bottom-10 w-14 sm:right-12 sm:-bottom-12 sm:w-20 lg:right-12 lg:-bottom-14 lg:w-20", rotate: -10 },
  { name: "sticker-1", className: "-left-8 top-5 w-16 sm:-left-12 sm:top-8 sm:w-20 lg:-left-12 lg:top-8 lg:w-20", rotate: -20 },
  { name: "sticker-4", className: "-left-8 -bottom-8 w-20 sm:-left-12 sm:-bottom-12 sm:w-28 lg:-left-12 lg:-bottom-12 lg:w-28", rotate: 0 },
];

export default function PortfolioCard() {
  return (
    <div className="relative mx-auto flex w-full max-w-sm scale-[0.92] items-center justify-center sm:max-w-xl lg:max-w-3xl">
      <div className="relative z-[2] flex aspect-[780/405] w-full flex-col items-center justify-center border border-white/75 bg-gradient-to-br from-[#d9d3fa]/60 to-[#eecae8]/45 px-4 text-center shadow-[0_12px_28px_rgba(121,73,124,.16),0_0_20px_rgba(224,160,210,.14),inset_0_1px_1px_rgba(255,255,255,.55)] backdrop-blur-[9px] sm:px-8">
        <p className="m-0 font-fredoka text-2xl leading-none text-black sm:text-4xl lg:text-5xl xl:text-6xl">{portfolioContent.hero.ownerName}</p>
        <h1 className="m-0 mt-3 font-pixel text-4xl leading-none font-normal whitespace-nowrap text-[#79497c] sm:mt-5 sm:text-6xl lg:text-7xl xl:text-8xl">{portfolioContent.hero.title}</h1>
        <p className="m-0 mt-3 font-fredoka text-[8px] leading-none text-black sm:mt-5 sm:text-xs lg:text-sm">{portfolioContent.hero.subtitle}</p>
      </div>
      {stickers.map((sticker, index) => (
        <div key={sticker.name} className={`sticker-float sticker-float-${index} pointer-events-none absolute z-[3] aspect-square ${sticker.className}`}>
          <img src={`/images/${sticker.name}.webp`} alt="" draggable={false} className="h-full w-full object-contain select-none" style={{ transform: `rotate(${sticker.rotate}deg)` }} />
        </div>
      ))}
    </div>
  );
}
