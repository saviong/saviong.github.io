"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: readonly string[];
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
};

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

// "Sep 2026" -> that month. For a range like "Jan 2025 - Mar 2025" the last
// date mentioned is the completion date, which is what we order by.
function completedAt(dates: string) {
  const found = dates.match(/[A-Za-z]{3,}\s+\d{4}/g);
  if (!found) return 0;

  const parts = found[found.length - 1].split(/\s+/);
  const month = MONTHS.indexOf(parts[0].slice(0, 3).toLowerCase());
  return new Date(Number(parts[1]), month < 0 ? 0 : month, 1).getTime();
}

// One card plus the gap between cards, so a click advances by exactly one card.
function stepSize(track: HTMLElement) {
  const card = track.firstElementChild as HTMLElement | null;
  if (!card) return 0;
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  return card.offsetWidth + gap;
}

export function ProjectCarousel({ projects }: { projects: readonly Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);
  const [position, setPosition] = useState(0);
  const [positionCount, setPositionCount] = useState(1);

  // Newest completion first, so the most recent work is what a visitor sees.
  // Array.prototype.sort is stable, so projects finished in the same month keep
  // the order they are written in.
  const ordered = useMemo(
    () => [...projects].sort((a, b) => completedAt(b.dates) - completedAt(a.dates)),
    [projects],
  );

  // Reconciles state with wherever the track actually is, after a swipe,
  // a resize, or the tail of a click-driven scroll.
  const syncControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const step = stepSize(track);
    const measured = step > 0 ? Math.round(track.scrollLeft / step) : 0;

    positionRef.current = measured;
    setPosition(measured);
    setCanScrollBack(track.scrollLeft > 1);
    setCanScrollForward(track.scrollLeft < maxScroll - 1);
    setPositionCount(step > 0 ? Math.round(maxScroll / step) + 1 : 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    syncControls();
    track.addEventListener("scroll", syncControls, { passive: true });

    // Card widths change with the viewport, so remeasure rather than assume.
    const observer = new ResizeObserver(syncControls);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", syncControls);
      observer.disconnect();
    };
  }, [syncControls]);

  const scrollToPosition = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const step = stepSize(track);
    const lastIndex = step > 0 ? Math.round(maxScroll / step) : 0;
    const target = Math.max(0, Math.min(index, lastIndex));

    // Update intent immediately rather than waiting for scroll events. Two quick
    // clicks must advance two cards, even while the first scroll is still
    // animating and the measured position has not caught up yet.
    positionRef.current = target;
    setPosition(target);
    setCanScrollBack(target > 0);
    setCanScrollForward(target < lastIndex);

    // Assigning scrollLeft always lands on the right card. The easing comes from
    // CSS scroll-behavior on the track, so if a browser cannot animate we still
    // move — the animation is decoration, never a requirement for it to work.
    track.scrollLeft = Math.min(target * step, maxScroll);
  }, []);

  const move = useCallback(
    (direction: -1 | 1) => scrollToPosition(positionRef.current + direction),
    [scrollToPosition],
  );

  const arrowClasses =
    "absolute top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full " +
    "border bg-background/80 text-foreground shadow-md backdrop-blur-sm transition-all duration-200 " +
    "hover:scale-110 hover:bg-background hover:shadow-lg active:scale-95 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="relative mx-auto max-w-[800px]">
      {/* Edge fades hint that the row continues past the visible cards. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-300",
          canScrollBack ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-300",
          canScrollForward ? "opacity-100" : "opacity-0",
        )}
      />

      <button
        type="button"
        onClick={() => move(-1)}
        disabled={!canScrollBack}
        aria-label="Show previous project"
        className={cn(arrowClasses, "left-0 -translate-x-1/4 sm:-translate-x-1/2")}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => move(1)}
        disabled={!canScrollForward}
        aria-label="Show next project"
        className={cn(arrowClasses, "right-0 translate-x-1/4 sm:translate-x-1/2")}
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Native scrolling keeps swipe, momentum and keyboard support for free. */}
      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects, most recently completed first"
        className={cn(
          "flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1",
          "scroll-smooth motion-reduce:scroll-auto",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {ordered.map((project) => (
          <div
            key={project.title}
            className="w-full shrink-0 snap-start sm:w-[calc((100%-0.75rem)/2)]"
          >
            <ProjectCard
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </div>
        ))}
      </div>

      {positionCount > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: positionCount }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToPosition(index)}
              aria-label={`Go to project ${index + 1}`}
              aria-current={index === position}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                index === position
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
