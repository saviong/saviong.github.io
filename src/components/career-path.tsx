"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, Cloud, FlaskConical, Gamepad2, Layers3, TrainFront, Workflow } from "lucide-react";
import { useRef, useState } from "react";
import { AI_PROJECTS } from "@/data/ai-projects";
import { cn } from "@/lib/utils";

const stages = [
  { label: "Chemistry", icon: FlaskConical, phase: "The foundation", title: "Start with a question. Test the answer.", detail: "Studying chemistry at HKUST, with an exchange at TUM, shaped how I analyse problems, test assumptions and learn unfamiliar systems.", skills: ["Analytical thinking", "Experimentation", "Documentation"] },
  { label: "Business & people", icon: BriefcaseBusiness, phase: "The connection", title: "Understand the people behind the problem.", detail: "Technical sales and business development at MediFast taught me to gather requirements, explain complex ideas and improve processes with VBA automation.", skills: ["Stakeholder communication", "Process improvement", "VBA"] },
  { label: "Lab operations", icon: Workflow, phase: "My current work", title: "Make everyday operations work better.", detail: "As a Laboratory Asset Coordinator at Anthony Nolan, I coordinate equipment and maintenance, support quality processes and automate repetitive work with Power Automate.", skills: ["Operational reliability", "Power Automate", "Quality assurance"] },
  { label: "Cloud & AI", icon: Cloud, phase: "What I’m building towards", title: "Turn that experience into working systems.", detail: "With Azure Administrator and Terraform Associate certifications, I’m applying cloud skills to real projects: building with Claude and ChatGPT, testing the result and choosing infrastructure around the workload.", skills: ["Azure + Terraform", "AI-assisted development", "Cost-aware deployment"] },
] as const;

const projectIcons = [Gamepad2, TrainFront, Layers3];

export function CareerPath() {
  const [active, setActive] = useState(3);
  const reducedMotion = useReducedMotion();
  const artwork = useRef<HTMLElement>(null);
  const inView = useInView(artwork);
  const selected = stages[active];

  return (
    <section ref={artwork} id="career-path" aria-labelledby="career-title" className="career-art py-5 lg:-mx-28">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">The path, connected</p><h2 id="career-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Chemist turned Cloud Engineer</h2></div>
        <p className="text-xs text-muted-foreground">Different roles. A shared instinct to improve things.</p>
      </div>
      <div className="overflow-hidden rounded-3xl border bg-card">
        <div className="relative px-4 pt-7 sm:px-7">
          <svg viewBox="0 0 800 24" preserveAspectRatio="none" className="pointer-events-none absolute left-[14%] top-[59px] hidden h-6 w-[72%] text-emerald-600/30 sm:block" aria-hidden="true">
            <path d="M0 12 H800" fill="none" stroke="currentColor" strokeWidth="1" />
            <motion.path d="M0 12 H800" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20 180" initial={false} animate={reducedMotion || !inView ? { strokeDashoffset: 0 } : { strokeDashoffset: [0, -200] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
          </svg>
          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2" role="group" aria-label="Explore my career stages">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return <motion.button key={stage.label} type="button" aria-pressed={active === index} aria-controls="career-detail" onClick={() => setActive(index)} initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.08 }} whileHover={reducedMotion ? {} : { y: -4 }} className={cn("group relative flex min-h-36 flex-col items-center rounded-2xl px-2 pb-4 pt-3 text-center outline-offset-4 transition-colors focus-visible:outline-emerald-600", active === index ? "bg-emerald-500/10" : "hover:bg-muted/60")}>
                <span className={cn("relative flex size-16 items-center justify-center rounded-2xl border bg-background transition-colors", active === index ? "border-emerald-600/50 text-emerald-700 shadow-[0_0_24px_-8px_rgba(16,185,129,.45)] dark:text-emerald-400" : "text-muted-foreground")}><Icon className="size-7" aria-hidden="true" /><span className="absolute -right-1 -top-1 rounded-full border bg-background px-1.5 py-0.5 font-mono text-[9px]">0{index + 1}</span></span>
                <span className="mt-3 text-xs font-semibold sm:text-sm">{stage.label}</span>
                <span className="mt-1 text-[10px] text-muted-foreground">{index === 2 ? "Current role" : index === 3 ? "Projects & learning" : "Experience"}</span>
              </motion.button>;
            })}
          </div>
        </div>
        <div id="career-detail" aria-live="polite" aria-atomic="true" className="min-h-[260px] px-6 pb-7 pt-6 sm:min-h-[215px] sm:px-9">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -5 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">{selected.phase}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{selected.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{selected.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2">{selected.skills.map(skill => <span key={skill} className="rounded-full border px-2.5 py-1 text-[10px]">{skill}</span>)}</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="border-t bg-muted/30 px-5 py-5 sm:px-7">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Where the learning becomes real</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {AI_PROJECTS.map((project, index) => {
              const Icon = projectIcons[index];
              return <a key={project.id} href={project.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl border bg-background px-3 py-3 transition-colors hover:border-emerald-600/40 focus-visible:outline-emerald-600"><Icon className="size-4 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" /><div className="min-w-0"><p className="text-xs font-semibold">{project.title}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{project.hosting}</p></div><ArrowUpRight className="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
