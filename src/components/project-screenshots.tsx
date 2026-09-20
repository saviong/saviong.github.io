"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type ProjectScreenshot = { src: string; alt: string; caption: string };
const SLIDE_INTERVAL = 4000;

export function ProjectScreenshots({ title, url, screenshots }: { title: string; url: string; screenshots: readonly ProjectScreenshot[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const gallery = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const inView = useInView(gallery, { amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const running = !paused && !hovered && !focused && !expanded && pageVisible && inView && !reducedMotion;
  const screenshot = screenshots[current];

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setCurrent(value => (value + 1) % screenshots.length), SLIDE_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [current, running, screenshots.length]);

  function select(index: number) {
    setCurrent((index + screenshots.length) % screenshots.length);
  }

  return (
    <figure ref={gallery} aria-label={`${title} screenshots`} aria-roledescription="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-lg">
        <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-3" aria-hidden="true"><span className="size-1.5 rounded-full bg-slate-600" /><span className="size-1.5 rounded-full bg-slate-600" /><span className="size-1.5 rounded-full bg-slate-600" /><span className="ml-2 truncate font-mono text-[10px] text-slate-400">{new URL(url).hostname}</span><span className="ml-auto text-[9px] font-medium tracking-widest text-slate-400">EN</span></div>
        <button type="button" onClick={() => { setExpanded(true); dialog.current?.showModal(); }} aria-label={`Enlarge ${title} screenshot ${current + 1}`} aria-haspopup="dialog" className="group relative block aspect-[16/9] w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-emerald-400">
          {screenshots.map((slide, index) => <motion.span key={slide.src} aria-hidden={current !== index} initial={false} animate={{ opacity: current === index ? 1 : 0, x: reducedMotion || current === index ? 0 : 16 }} transition={{ duration: reducedMotion ? 0 : 0.55, ease: "easeInOut" }} className={cn("absolute inset-0", current === index ? "z-10" : "z-0")}><Image src={slide.src} alt={slide.alt} fill sizes="(min-width: 1024px) 780px, (min-width: 640px) 600px, 90vw" loading="eager" className="object-cover object-top" /></motion.span>)}
          <span className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/85 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm"><Maximize2 className="size-3" aria-hidden="true" />View capture</span>
        </button>
        <div className="h-0.5 bg-white/10" aria-hidden="true"><span key={`${current}-${running}`} className={cn("block h-full origin-left bg-emerald-400", !reducedMotion && "capture-progress")} style={{ animationPlayState: running ? "running" : "paused", transform: reducedMotion ? "scaleX(1)" : undefined }} /></div>
      </div>
      <figcaption className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live={running ? "off" : "polite"} aria-atomic="true" className="text-[10px] leading-relaxed text-muted-foreground"><p className="font-medium text-foreground">{screenshot.caption}</p><p>English · {current + 1} / {screenshots.length} · September 2026</p></div>
        <div className="flex items-center gap-1" role="group" aria-label={`${title} screenshot controls`}>
          <button type="button" aria-label="Previous screenshot" onClick={() => select(current - 1)} className="flex size-9 items-center justify-center rounded-full border hover:bg-muted focus-visible:outline-emerald-600"><ChevronLeft className="size-3.5" /></button>
          {screenshots.map((slide, index) => <button key={slide.src} type="button" aria-label={`Show screenshot ${index + 1}: ${slide.caption}`} aria-current={current === index ? "true" : undefined} onClick={() => select(index)} className="flex size-8 items-center justify-center rounded-full focus-visible:outline-emerald-600"><span className={cn("h-1.5 rounded-full transition-all", current === index ? "w-5 bg-emerald-600" : "w-1.5 bg-muted-foreground/35")} /></button>)}
          <button type="button" aria-label="Next screenshot" onClick={() => select(current + 1)} className="flex size-9 items-center justify-center rounded-full border hover:bg-muted focus-visible:outline-emerald-600"><ChevronRight className="size-3.5" /></button>
          <button type="button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} aria-pressed={paused} disabled={!!reducedMotion} onClick={() => setPaused(value => !value)} className="ml-1 flex size-9 items-center justify-center rounded-full border hover:bg-muted focus-visible:outline-emerald-600 disabled:opacity-40">{paused || reducedMotion ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}</button>
          <span className="ml-1 text-[9px] text-muted-foreground">{reducedMotion ? "Manual" : "4s"}</span>
        </div>
      </figcaption>
      <dialog ref={dialog} aria-label={`${title} enlarged screenshot`} onClose={() => setExpanded(false)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} className="ai-capture-dialog w-[min(1200px,94vw)] max-w-none overflow-hidden rounded-2xl border bg-background p-0 text-foreground shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b px-4 py-3"><h3 className="text-sm font-semibold">{title} · {current + 1} / {screenshots.length}</h3><button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close screenshot" className="flex size-9 items-center justify-center rounded-full border hover:bg-muted focus-visible:outline-emerald-600"><X className="size-4" /></button></div>
        {expanded && <div className="relative aspect-[16/9]"><Image src={screenshot.src} alt={screenshot.alt} fill sizes="94vw" className="object-contain" /></div>}
        <p className="px-4 py-3 text-xs text-muted-foreground">{screenshot.caption} · English · September 2026</p>
      </dialog>
    </figure>
  );
}
