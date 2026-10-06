"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioContent } from "../content/portfolio";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
};

export default function MusicPlayerWindow({ onClose }: { onClose: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playAfterTrackChange = useRef(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const tracks = portfolioContent.musicPlayer.tracks;
  const track = tracks[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    setPlaying(false);
    setCurrentTime(0);
    audio?.load();
    if (audio && playAfterTrackChange.current) {
      playAfterTrackChange.current = false;
      void audio.play().catch(() => setPlaying(false));
    }
  }, [trackIndex]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (audio.paused) await audio.play();
    else audio.pause();
  };

  const changeTrack = (direction: number) => {
    if (!tracks.length) return;
    playAfterTrackChange.current = true;
    setTrackIndex((current) => (current + direction + tracks.length) % tracks.length);
  };

  return (
    <section className="relative flex aspect-[883/795] w-full flex-col overflow-hidden border-[3px] border-[#79497c] bg-[#e9a8cf] p-2 shadow-[5px_5px_0_rgba(121,73,124,.38)]" aria-label={portfolioContent.musicPlayer.title}>
      <audio
        ref={audioRef}
        src={track?.src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => changeTrack(1)}
      />

      <div className="flex h-[12%] shrink-0 touch-none select-none items-center border-2 border-[#79497c] bg-[#e0a0d2] px-3 active:cursor-grabbing" data-drag-handle>
        <span className="font-pixel text-[clamp(13px,6cqw,20px)] text-[#58365b]">{portfolioContent.musicPlayer.title}</span>
      </div>
      <button type="button" className="absolute right-1 top-1 grid h-10 w-10 cursor-pointer place-items-center border-0 bg-transparent" aria-label={portfolioContent.accessibility.closeMusic} onClick={onClose}>
        <img className="h-5 w-5 object-contain [image-rendering:pixelated]" src="/images/window-close.png" alt="" draggable={false} width={26} height={28} />
      </button>

      <div className="relative mt-2 flex min-h-0 flex-1 flex-col items-center overflow-hidden border-2 border-[#79497c] bg-[linear-gradient(rgba(224,160,210,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(224,160,210,.16)_1px,transparent_1px),#f8dbea] bg-[size:18px_18px] px-4 py-1 text-[#58365b]">
        <div className="absolute left-2 top-2 flex h-6 items-end gap-0.5 opacity-55" aria-hidden="true">
          <span className="h-2 w-1 bg-[#79497c]" /><span className="h-4 w-1 bg-[#79497c]" /><span className="h-3 w-1 bg-[#79497c]" /><span className="h-5 w-1 bg-[#79497c]" />
        </div>
        <span className="absolute right-3 top-2 font-pixel text-sm opacity-55" aria-hidden="true">♪ ✦</span>
        <span className="pointer-events-none absolute left-3 top-[27%] -rotate-12 font-pixel text-[13px] text-[#b66fa8] drop-shadow-[1px_1px_0_#fff]" aria-hidden="true">♥</span>
        <span className="absolute right-3 top-[34%] rotate-12 font-pixel text-[15px] text-[#9d72b5] drop-shadow-[1px_1px_0_#fff]" aria-hidden="true">✦</span>

        <div className={`grid aspect-square w-[21%] shrink-0 place-items-center rounded-full border-[4px] border-[#79497c] bg-[radial-gradient(circle,#f8dbea_0_13%,#79497c_14%_22%,#d49bc9_23%_38%,#79497c_39%_45%,#e9a8cf_46%)] shadow-[3px_3px_0_rgba(121,73,124,.25)] ${playing ? "motion-safe:animate-[spin_3s_linear_infinite]" : ""}`}>
          <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#79497c] bg-[#fff3bd] font-serif text-[20px] font-black leading-none text-[#58365b] shadow-[1px_1px_0_#fff]">♪</span>
        </div>

        <div className="mt-1 w-full shrink-0 text-center">
          <p className="m-0 font-pixel text-[clamp(9px,4cqw,12px)] leading-tight">{track?.title ?? portfolioContent.musicPlayer.emptyTitle}</p>
          <p className="m-0 mt-0.5 font-fredoka text-[10px] leading-none">{track?.artist ?? portfolioContent.musicPlayer.emptyArtist}</p>
        </div>

        <input
          className="mt-1 h-2 w-full shrink-0 cursor-pointer accent-[#79497c] disabled:cursor-default"
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          disabled={!track}
          aria-label="Track progress"
          onChange={(event) => {
            const nextTime = Number(event.target.value);
            if (audioRef.current) audioRef.current.currentTime = nextTime;
            setCurrentTime(nextTime);
          }}
        />
        <div className="flex w-full shrink-0 justify-between font-fredoka text-[9px]">
          <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
        </div>

        <div className="mt-1 w-full shrink-0 border-t border-dashed border-[#b77ca9] pt-1.5">
          <div className="grid w-full grid-cols-3 items-center gap-2 px-1">
            <button type="button" className="h-6 w-full min-w-0 border-2 border-[#79497c] bg-[#f2b9d8] font-pixel text-[9px] shadow-[2px_2px_0_#79497c] disabled:opacity-65" disabled={!track} onClick={() => changeTrack(-1)} aria-label="Previous track">|◀</button>
            <button type="button" className="grid h-7 w-full min-w-0 place-items-center border-2 border-[#79497c] bg-[#f7cbe2] font-pixel text-xs shadow-[2px_2px_0_#79497c] disabled:opacity-65" disabled={!track} onClick={togglePlayback} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <span className="flex items-center gap-1" aria-hidden="true"><span className="h-3 w-1 bg-[#58365b]" /><span className="h-3 w-1 bg-[#58365b]" /></span> : "▶"}
            </button>
            <button type="button" className="h-6 w-full min-w-0 border-2 border-[#79497c] bg-[#f2b9d8] font-pixel text-[9px] shadow-[2px_2px_0_#79497c] disabled:opacity-65" disabled={!track} onClick={() => changeTrack(1)} aria-label="Next track">▶|</button>
          </div>

          <label className="mt-4 hidden w-full touch-none items-center gap-2 rounded-sm bg-[#efbfd9]/70 px-2 py-0.5 font-fredoka text-[9px] md:flex">
            <span className="shrink-0 font-pixel text-[8px]">VOL</span>
            <input
              className="music-volume-slider h-2 min-w-0 flex-1 cursor-pointer touch-none appearance-none rounded-full border border-[#b77ca9] [&::-moz-range-progress]:h-full [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-[#ffe47c]"
              style={{ background: `linear-gradient(to right, #ffe47c 0%, #ffe47c ${volume * 100}%, #f8dbea ${volume * 100}%, #f8dbea 100%)` }}
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              aria-label="Volume"
              onChange={(event) => {
                const nextVolume = Number(event.target.value);
                setVolume(nextVolume);
                if (audioRef.current) audioRef.current.volume = nextVolume;
              }}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
