"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Sparkles } from "lucide-react";
import { ProjectScreenshots } from "@/components/project-screenshots";
import { AI_PROJECTS } from "@/data/ai-projects";
import { cn } from "@/lib/utils";

export function AIProjects() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % AI_PROJECTS.length;
    else if (event.key === "ArrowLeft") next = (index + AI_PROJECTS.length - 1) % AI_PROJECTS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = AI_PROJECTS.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="ai-projects" aria-labelledby="ai-projects-title" className="ai-showcase scroll-mt-8 py-10 sm:py-14 lg:-mx-28">
      <div className="relative overflow-hidden rounded-3xl border bg-card shadow-sm">
        <div className="ai-project-grid pointer-events-none absolute inset-x-0 top-0 h-80" aria-hidden="true" />
        <header className="relative px-5 pb-7 pt-8 sm:px-9 sm:pt-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400"><Sparkles className="size-4" aria-hidden="true" /> AI-assisted engineering</p>
            <span className="text-xs text-muted-foreground">Selected work / 2026</span>
          </div>
          <h2 id="ai-projects-title" className="max-w-xl text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">From a prompt<br />to a working product<span className="text-emerald-600 dark:text-emerald-400">.</span></h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">I build with Claude and ChatGPT, bringing ideas to life through code, testing and cloud deployment. These three projects show the technical skills and engineering decisions behind the result.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
            {["Claude + ChatGPT", "Full-stack development", "Cost-conscious cloud"].map((label) => <span key={label} className="rounded-full border bg-background/80 px-3 py-1.5">{label}</span>)}
          </div>
        </header>

        <div role="tablist" aria-label="AI project case studies" className="relative grid grid-cols-3 border-y bg-muted/40 px-2 sm:px-5">
          {AI_PROJECTS.map((item, index) => (
            <button key={item.id} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab" id={`tab-${item.id}`} aria-controls={`panel-${item.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => moveTab(event, index)} className={cn("relative min-h-20 px-2 py-4 text-left outline-offset-[-4px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 sm:px-4", active === index ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
              <span className="mb-1 block font-mono text-[10px] text-muted-foreground">{item.number} /</span>
              <span className="block text-xs font-semibold sm:text-sm">{item.title}</span>
              {active === index && <span className="absolute inset-x-2 bottom-0 h-0.5 bg-emerald-600 sm:inset-x-4" />}
            </button>
          ))}
        </div>

        {AI_PROJECTS.map((item, index) => (
          <div key={item.id} id={`panel-${item.id}`} role="tabpanel" aria-labelledby={`tab-${item.id}`} tabIndex={0} hidden={active !== index} className="focus-visible:outline-2 focus-visible:outline-emerald-600">
            {active === index && <motion.div initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="px-5 pt-7 sm:px-9">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground"><span>{item.category}</span><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />{item.hosting}</span></div>
                <ProjectScreenshots key={item.id} title={item.title} url={item.url} screenshots={item.screenshots} />
              </div>
              <div className="grid gap-6 px-5 py-7 sm:px-9 md:grid-cols-[1.1fr_1fr] md:gap-9">
                <div>
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight">{item.headline}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Skills applied</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${item.title} skills`}>{item.skills.map((skill) => <li key={skill} className="rounded-md border bg-muted/40 px-2 py-1 text-[11px]">{skill}</li>)}</ul>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Explore {item.title}<ArrowUpRight className="size-4" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
                </div>
                <div className="space-y-5">
                  {item.evidence.map((point) => <div key={point.title}><h4 className="flex items-start gap-2 text-sm font-semibold"><Check className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />{point.title}</h4><p className="mt-1 pl-6 text-xs leading-relaxed text-muted-foreground">{point.text}</p></div>)}
                  <div className="rounded-xl border border-emerald-600/15 bg-emerald-500/5 p-4"><p className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400"><Code2 className="size-3.5" aria-hidden="true" />Working with AI</p><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.aiFocus}</p></div>
                </div>
              </div>
            </motion.div>}
          </div>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 px-5 py-4 sm:px-9"><p className="text-xs text-muted-foreground">Explore the product. Then look at the decisions behind it.</p><a href="#cloud-decisions" className="flex min-h-8 items-center gap-2 text-xs font-semibold hover:underline">Deployment & cost<ArrowDown className="size-3.5" aria-hidden="true" /></a></div>
      </div>

      <section id="cloud-decisions" aria-labelledby="cloud-decisions-title" className="scroll-mt-8 pt-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">Cloud choices / Operating cost</p>
        <h3 id="cloud-decisions-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">The right infrastructure for the job.</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Three workloads, three deployment decisions. I look at what needs to run, what can stay in the browser, and what each extra service costs to operate.</p>
        <div className="mt-6 space-y-4">
          {AI_PROJECTS.map((item) => (
            <article key={item.id} className="infrastructure-card grid grid-cols-[minmax(85px,0.65fr)_minmax(0,1.35fr)] overflow-hidden rounded-2xl border bg-card transition-colors hover:border-emerald-600/40 sm:grid-cols-[240px_minmax(0,1fr)]">
              <div className="flex flex-col justify-center border-r bg-emerald-500/[0.035] p-3 sm:p-6">
                <p className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">{item.number} /</p>
                <h4 className="mt-2 text-xs font-semibold sm:text-sm">{item.title}</h4>
                <div className="mt-5 space-y-2" aria-label={`${item.title} architecture`}>
                  {item.route.map((step, index) => <div key={step}>{index > 0 && <ArrowDown className="mx-auto mb-2 size-4 text-emerald-600" aria-hidden="true" />}<p className="rounded-lg border border-emerald-600/20 bg-background px-1.5 py-3 text-center font-mono text-[9px] leading-relaxed sm:px-3 sm:text-[11px]">{step}</p></div>)}
                </div>
              </div>
              <div className="min-w-0 p-4 sm:p-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">The operating decision</p>
                <h4 className="mt-2 text-base font-semibold tracking-tight sm:text-lg">{item.costTitle}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.cost}</p>
                <details className="mt-4 border-t pt-3"><summary className="cursor-pointer text-xs font-medium marker:text-emerald-600">The trade-off</summary><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.tradeoff}</p></details>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">Architecture reflects project configuration reviewed in September 2026. Included quotas are conditional, not a guarantee of zero total cost. Platform references: <a className="underline underline-offset-2" href="https://vercel.com/docs/plans/hobby" target="_blank" rel="noopener noreferrer">Vercel Hobby</a>, <a className="underline underline-offset-2" href="https://learn.microsoft.com/en-us/azure/cosmos-db/free-tier" target="_blank" rel="noopener noreferrer">Cosmos DB free tier</a>, <a className="underline underline-offset-2" href="https://learn.microsoft.com/en-us/azure/container-apps/billing" target="_blank" rel="noopener noreferrer">Container Apps billing</a>.</p>
      </section>

      <aside aria-labelledby="engineering-mindset" className="mt-9 border-l-2 border-emerald-600 pl-5">
        <h3 id="engineering-mindset" className="text-lg font-semibold tracking-tight">A scientific mindset. An engineer’s follow-through.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">My background in chemistry and laboratory operations taught me to question assumptions, document decisions and investigate failures. I bring that discipline to AI-assisted development: the result needs to be understandable, testable and practical to run.</p>
        <a href="#work" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold hover:underline">See the experience behind the projects<ArrowRight className="size-3.5" aria-hidden="true" /></a>
      </aside>


    </section>
  );
}
