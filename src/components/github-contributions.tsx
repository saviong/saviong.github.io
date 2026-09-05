"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionsResponse = {
  total: { lastYear?: number };
  contributions: ContributionDay[];
};

const USERNAME = "saviong";
const REFRESH_INTERVAL_MS = 15 * 60 * 1000;
const LEVEL_STYLES = [
  "bg-muted",
  "bg-emerald-200 dark:bg-emerald-950",
  "bg-emerald-400 dark:bg-emerald-800",
  "bg-emerald-600 dark:bg-emerald-600",
  "bg-emerald-800 dark:bg-emerald-400",
];

function chunkIntoWeeks(days: ContributionDay[]) {
  const weeks: ContributionDay[][] = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }
  return weeks;
}

function calculateStreak(days: ContributionDay[]) {
  let index = days.length - 1;
  if (days[index]?.count === 0) index -= 1;

  let streak = 0;
  while (index >= 0 && days[index].count > 0) {
    streak += 1;
    index -= 1;
  }
  return streak;
}

function formatContribution(day: ContributionDay) {
  const date = new Date(`${day.date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date}`;
}

export function GitHubContributions() {
  const [data, setData] = useState<ContributionsResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const load = () => {
      // cache: "no-store" so a refresh never comes back from the browser cache.
      fetch("/api/github-contributions", {
        signal: controller.signal,
        cache: "no-store",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Contribution request failed");
          return response.json();
        })
        .then((result: ContributionsResponse) => {
          if (cancelled) return;
          hasLoadedRef.current = true;
          setData(result);
          setFailed(false);
        })
        .catch((error: Error) => {
          if (error.name === "AbortError" || cancelled) return;
          // Keep showing the last good graph if a background refresh fails.
          if (!hasLoadedRef.current) setFailed(true);
        });
    };

    load();

    const interval = setInterval(load, REFRESH_INTERVAL_MS);
    const refreshOnReturn = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", refreshOnReturn);

    return () => {
      cancelled = true;
      controller.abort();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshOnReturn);
    };
  }, []);

  const weeks = useMemo(
    () => chunkIntoWeeks(data?.contributions ?? []),
    [data?.contributions],
  );
  const activeDays = data?.contributions.filter((day) => day.count > 0).length ?? 0;
  const streak = calculateStreak(data?.contributions ?? []);
  const total = data?.total.lastYear ?? data?.contributions.reduce((sum, day) => sum + day.count, 0) ?? 0;

  return (
    <section id="github-contributions" className="w-full py-12">
      <BlurFade delay={0.04 * 11}>
        <SectionHeading
          eyebrow="GitHub Activity"
          title="Building in Public"
          description="My public contributions over the past year, refreshed automatically from GitHub."
        />
      </BlurFade>

      <BlurFade delay={0.04 * 12}>
        <div className="mt-8 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-foreground p-2 text-background">
                <Github className="size-5" />
              </span>
              <div>
                <p className="font-semibold">@{USERNAME}</p>
                <p className="text-sm text-muted-foreground">Public GitHub contributions</p>
              </div>
            </div>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View profile <ExternalLink className="size-3.5" />
            </a>
          </div>

          {failed ? (
            <div className="rounded-lg bg-muted/60 px-4 py-8 text-center">
              <p className="text-sm font-medium">Contribution activity is temporarily unavailable.</p>
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-emerald-700 underline underline-offset-4 dark:text-emerald-400"
              >
                View activity on GitHub
              </a>
            </div>
          ) : !data ? (
            <div className="space-y-3" aria-label="Loading GitHub contributions">
              <div className="h-4 w-40 animate-pulse rounded bg-muted" />
              <div className="h-28 animate-pulse rounded-lg bg-muted" />
            </div>
          ) : (
            <>
              <div className="mb-4 grid grid-cols-3 gap-3">
                <div><p className="text-2xl font-bold">{total}</p><p className="text-xs text-muted-foreground">contributions</p></div>
                <div><p className="text-2xl font-bold">{activeDays}</p><p className="text-xs text-muted-foreground">active days</p></div>
                <div><p className="text-2xl font-bold">{streak}</p><p className="text-xs text-muted-foreground">day streak</p></div>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[680px]">
                  <div className="mb-1 grid grid-flow-col grid-rows-1 gap-1 pl-7">
                    {weeks.map((week, index) => {
                      const currentMonth = new Date(`${week[0].date}T00:00:00`).getMonth();
                      const previousMonth = index > 0
                        ? new Date(`${weeks[index - 1][0].date}T00:00:00`).getMonth()
                        : -1;
                      return (
                        <span key={week[0].date} className="w-2.5 text-[10px] text-muted-foreground">
                          {currentMonth !== previousMonth
                            ? new Date(`${week[0].date}T00:00:00`).toLocaleDateString("en-GB", { month: "short" })
                            : ""}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <div className="grid h-[94px] grid-rows-7 gap-1 text-[10px] leading-[10px] text-muted-foreground">
                      <span />
                      <span>Mon</span>
                      <span />
                      <span>Wed</span>
                      <span />
                      <span>Fri</span>
                      <span />
                    </div>
                    <div className="grid grid-flow-col grid-rows-7 gap-1">
                      {data.contributions.map((day) => (
                        <span
                          key={day.date}
                          title={formatContribution(day)}
                          aria-label={formatContribution(day)}
                          className={cn(
                            "size-2.5 rounded-[2px] ring-1 ring-inset ring-black/5 dark:ring-white/5",
                            LEVEL_STYLES[Math.min(day.level, LEVEL_STYLES.length - 1)],
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                <span>Less</span>
                {LEVEL_STYLES.map((style, level) => (
                  <span key={level} className={cn("size-2.5 rounded-[2px]", style)} />
                ))}
                <span>More</span>
              </div>
            </>
          )}
        </div>
      </BlurFade>
    </section>
  );
}
