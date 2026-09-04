import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AzureLab } from "@/components/azure-lab";

export const metadata: Metadata = {
  title: "Azure Architecture Lab",
  description:
    "Explore an interactive Azure architecture and estimate the monthly cost of Terraform resources in your browser.",
};

export default function AzureLabPage() {
  return (
    <main className="relative left-1/2 w-[min(1120px,calc(100vw-2rem))] -translate-x-1/2 pb-20">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to portfolio
      </Link>

      <header className="mb-8 max-w-3xl space-y-3">
        <div className="inline-flex rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-700 dark:text-sky-300">
          Interactive cloud lab
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Plan the architecture. Estimate the spend.
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Explore the request path behind my serverless Azure portfolio, then
          edit its Terraform to see how infrastructure choices affect an
          indicative monthly cost.
        </p>
      </header>

      <AzureLab />
    </main>
  );
}
