"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";

export function PortfolioHero() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="hero" aria-labelledby="intro-title" className="portfolio-hero relative lg:-mx-28">
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-[2rem] border bg-card p-6 sm:p-10">
        <div className="hero-glow pointer-events-none absolute -right-20 -top-24 size-80 rounded-full" aria-hidden="true" />
        <div className="relative flex items-center justify-between gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400 sm:text-xs">Savio Ng / Portfolio</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5" aria-hidden="true" />Hong Kong → UK</p>
        </div>
        <div className="relative mt-8 grid items-start gap-6 sm:grid-cols-[1fr_auto]">
          <div className="order-2 sm:order-1">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Hi, I’m Savio.</p>
            <h1 id="intro-title" className="text-[2.65rem] font-semibold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-[3.6rem]">A scientific mind.<br />A builder’s <span className="text-emerald-700 dark:text-emerald-400">instinct.</span></h1>
          </div>
          <div className="order-1 flex items-center gap-3 sm:order-2 sm:pt-2">
            <div className="relative rounded-full border border-emerald-500/25 p-2">
              <Avatar className="size-16 sm:size-24"><AvatarImage className="object-cover" src={DATA.avatarUrl} alt="Savio Ng" /><AvatarFallback>SN</AvatarFallback></Avatar>
              <span className="absolute bottom-1 right-1 flex size-7 items-center justify-center rounded-full border-4 border-background bg-emerald-600 text-white"><Check className="size-3" aria-hidden="true" /></span>
            </div>
            <p className="text-xs text-muted-foreground sm:hidden">Ng Chung Yeung<br /><span lang="zh-Hant">吳仲洋</span></p>
          </div>
        </div>
        <p className="relative mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">I turn everyday problems into useful software. My path from chemistry and laboratory operations to Cloud & DevOps brings together analytical thinking, hands-on automation and AI-assisted development.</p>
        <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#ai-projects" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Explore my AI-assisted projects<ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" /></a>
          <a href="https://mycv.saviong.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors hover:bg-muted">View my CV<ArrowUpRight className="size-4" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
        </div>
        <div className="relative mt-8 grid gap-4 border-t pt-5 text-xs sm:grid-cols-3">
          <div><p className="font-semibold">Azure certified</p><p className="mt-1 text-muted-foreground">AZ-104 Administrator</p></div>
          <div><p className="font-semibold">Infrastructure as code</p><p className="mt-1 text-muted-foreground">Terraform Associate</p></div>
          <div><p className="font-semibold">Ideas, shipped</p><p className="mt-1 text-muted-foreground">3 recent AI-assisted projects</p></div>
        </div>
      </motion.div>
      <p className="mt-4 hidden text-right text-xs text-muted-foreground sm:block">Ng Chung Yeung <span lang="zh-Hant">吳仲洋</span> · Savio to friends and colleagues</p>
    </section>
  );
}
