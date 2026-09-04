"use client";

import {
  Activity,
  Braces,
  ChevronRight,
  CircleDollarSign,
  Cloud,
  Code2,
  Database,
  FunctionSquare,
  Github,
  Globe2,
  HardDrive,
  Info,
  MonitorCog,
  RotateCcw,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Tab = "architecture" | "estimator";

type ArchitectureNode = {
  id: string;
  label: string;
  service: string;
  role: string;
  detail: string;
  security: string;
  icon: LucideIcon;
  accent: string;
};

type ParsedResource = {
  type: string;
  name: string;
  body: string;
};

type CostLine = {
  key: string;
  resource: string;
  service: string;
  monthly: number | null;
  assumption: string;
};

const SAMPLE_TERRAFORM = `# Serverless portfolio — simplified for estimation
resource "azurerm_cdn_frontdoor_profile" "portfolio" {
  name                = "portfolio-edge"
  resource_group_name = "portfolio-rg"
  sku_name            = "Standard_AzureFrontDoor"
}

resource "azurerm_storage_account" "site" {
  name                     = "portfoliosite"
  resource_group_name      = "portfolio-rg"
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_service_plan" "functions" {
  name                = "portfolio-functions"
  resource_group_name = "portfolio-rg"
  os_type             = "Linux"
  sku_name            = "Y1"
}

resource "azurerm_linux_function_app" "visitor_api" {
  name                       = "portfolio-visitor-api"
  resource_group_name        = "portfolio-rg"
  service_plan_id            = azurerm_service_plan.functions.id
  storage_account_name       = azurerm_storage_account.site.name
  storage_account_access_key = azurerm_storage_account.site.primary_access_key
}

resource "azurerm_cosmosdb_account" "visitors" {
  name                = "portfolio-visitors"
  resource_group_name = "portfolio-rg"
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"
}

resource "azurerm_application_insights" "monitoring" {
  name                = "portfolio-monitoring"
  resource_group_name = "portfolio-rg"
  application_type    = "web"
}`;

const VM_TERRAFORM = `# A small production web workload
resource "azurerm_linux_virtual_machine" "web" {
  name                = "web-vm"
  resource_group_name = "web-rg"
  size                = "Standard_B2s"
  count               = 2
}

resource "azurerm_managed_disk" "data" {
  name                 = "web-data"
  resource_group_name  = "web-rg"
  storage_account_type = "Premium_LRS"
  disk_size_gb         = 128
  count                = 2
}

resource "azurerm_public_ip" "web" {
  name                = "web-ip"
  resource_group_name = "web-rg"
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_container_registry" "images" {
  name                = "webimages"
  resource_group_name = "web-rg"
  sku                 = "Basic"
}`;

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "github",
    label: "GitHub Actions",
    service: "Delivery",
    role: "Builds and deploys every change",
    detail:
      "Two workflows can deploy the static frontend and the Python API independently. Infrastructure changes remain reviewable alongside application code.",
    security:
      "Use OpenID Connect federation instead of storing a long-lived Azure client secret in GitHub.",
    icon: Github,
    accent: "text-violet-600 bg-violet-500/10 border-violet-500/25 dark:text-violet-300",
  },
  {
    id: "frontdoor",
    label: "Front Door",
    service: "Global edge",
    role: "Terminates HTTPS and routes traffic",
    detail:
      "Azure Front Door serves the portfolio from a nearby edge location and sends API requests to the Function App origin.",
    security:
      "Add a Web Application Firewall policy, redirect HTTP to HTTPS, and restrict each origin to Front Door traffic.",
    icon: Globe2,
    accent: "text-sky-700 bg-sky-500/10 border-sky-500/30 dark:text-sky-300",
  },
  {
    id: "storage",
    label: "Static website",
    service: "Storage Account",
    role: "Hosts the portfolio assets",
    detail:
      "The compiled HTML, CSS, JavaScript, and images are stored as static files. There is no application server to patch or scale.",
    security:
      "Keep management access private. Expose only the static website endpoint through Front Door and use deployment identities with least privilege.",
    icon: HardDrive,
    accent: "text-cyan-700 bg-cyan-500/10 border-cyan-500/30 dark:text-cyan-300",
  },
  {
    id: "function",
    label: "Visitor API",
    service: "Azure Functions",
    role: "Handles the visitor counter request",
    detail:
      "A consumption-plan Python function validates the request, increments the counter, and returns a small JSON response. It scales down when idle.",
    security:
      "Validate input, set a strict CORS allowlist, rate-limit at the edge, and use managed identity for database access.",
    icon: FunctionSquare,
    accent: "text-amber-700 bg-amber-500/10 border-amber-500/30 dark:text-amber-300",
  },
  {
    id: "cosmos",
    label: "Visitor data",
    service: "Cosmos DB",
    role: "Stores the counter document",
    detail:
      "A single small document keeps the visitor total. Serverless or low autoscale throughput is a better fit than provisioned capacity for this traffic pattern.",
    security:
      "Disable key-based access where possible, use managed identity, and apply a narrow data-plane role to the Function App.",
    icon: Database,
    accent: "text-emerald-700 bg-emerald-500/10 border-emerald-500/30 dark:text-emerald-300",
  },
  {
    id: "monitor",
    label: "Observability",
    service: "Application Insights",
    role: "Tracks failures and latency",
    detail:
      "Request traces and Function logs make failed deployments, slow dependencies, and unexpected traffic visible without logging sensitive payloads.",
    security:
      "Set a short retention period for this small project and avoid collecting personal data or request bodies.",
    icon: Activity,
    accent: "text-rose-700 bg-rose-500/10 border-rose-500/30 dark:text-rose-300",
  },
];

const VM_RATES: Record<string, number> = {
  Standard_B1s: 7.59,
  Standard_B2s: 30.37,
  Standard_D2s_v5: 70.08,
  Standard_D4s_v5: 140.16,
};

function parseBlocks(source: string): ParsedResource[] {
  const resources: ParsedResource[] = [];
  const pattern = /resource\s+"([^"]+)"\s+"([^"]+)"\s*\{/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source)) !== null) {
    const bodyStart = pattern.lastIndex;
    let depth = 1;
    let index = bodyStart;
    let inString = false;

    while (index < source.length && depth > 0) {
      const char = source[index];
      const escaped = index > 0 && source[index - 1] === "\\";
      if (char === '"' && !escaped) inString = !inString;
      if (!inString && char === "{") depth += 1;
      if (!inString && char === "}") depth -= 1;
      index += 1;
    }

    if (depth === 0) {
      resources.push({
        type: match[1],
        name: match[2],
        body: source.slice(bodyStart, index - 1),
      });
      pattern.lastIndex = index;
    }
  }

  return resources;
}

function stringAttribute(body: string, key: string): string | undefined {
  return body.match(new RegExp(`(?:^|\\n)\\s*${key}\\s*=\\s*"([^"]+)"`))?.[1];
}

function numberAttribute(body: string, key: string, fallback: number): number {
  const value = body.match(new RegExp(`(?:^|\\n)\\s*${key}\\s*=\\s*(\\d+(?:\\.\\d+)?)`))?.[1];
  return value ? Number(value) : fallback;
}

function estimateResources(
  resources: ParsedResource[],
  usage: { storageGb: number; outboundGb: number; requestsMillion: number; cosmosRu: number; logsGb: number },
): CostLine[] {
  return resources.map((resource) => {
    const count = numberAttribute(resource.body, "count", 1);
    const base = {
      key: `${resource.type}.${resource.name}`,
      resource: resource.name,
    };

    switch (resource.type) {
      case "azurerm_linux_virtual_machine": {
        const size = stringAttribute(resource.body, "size") ?? "Standard_B1s";
        const rate = VM_RATES[size];
        return {
          ...base,
          service: `Virtual Machine · ${size}`,
          monthly: rate === undefined ? null : rate * count,
          assumption: rate === undefined ? "VM size is not in this demo rate card" : `${count} × 730 hours`,
        };
      }
      case "azurerm_managed_disk": {
        const size = numberAttribute(resource.body, "disk_size_gb", 128);
        const tier = stringAttribute(resource.body, "storage_account_type") ?? "Standard_LRS";
        const perGb = tier.startsWith("Premium") ? 0.15 : 0.045;
        return {
          ...base,
          service: `Managed Disk · ${tier}`,
          monthly: size * perGb * count,
          assumption: `${size} GB per disk`,
        };
      }
      case "azurerm_storage_account":
        return {
          ...base,
          service: "Storage Account · LRS",
          monthly: usage.storageGb * 0.0184,
          assumption: `${usage.storageGb} GB hot storage`,
        };
      case "azurerm_cdn_frontdoor_profile":
        return {
          ...base,
          service: "Front Door · Standard",
          monthly: 35 + usage.outboundGb * 0.087,
          assumption: `$35 base + ${usage.outboundGb} GB outbound`,
        };
      case "azurerm_service_plan": {
        const sku = stringAttribute(resource.body, "sku_name") ?? "Y1";
        return {
          ...base,
          service: `Functions plan · ${sku}`,
          monthly: sku === "Y1" ? 0 : null,
          assumption: sku === "Y1" ? "Consumption plan; compute excluded" : "Only Y1 is priced in this demo",
        };
      }
      case "azurerm_linux_function_app":
        return {
          ...base,
          service: "Function App · Requests",
          monthly: Math.max(0, usage.requestsMillion - 1) * 0.2,
          assumption: `${usage.requestsMillion.toFixed(1)}M requests; first 1M included`,
        };
      case "azurerm_cosmosdb_account":
        return {
          ...base,
          service: "Cosmos DB · Provisioned throughput",
          monthly: (usage.cosmosRu / 100) * 0.008 * 730,
          assumption: `${usage.cosmosRu} RU/s × 730 hours`,
        };
      case "azurerm_application_insights":
        return {
          ...base,
          service: "Application Insights",
          monthly: Math.max(0, usage.logsGb - 5) * 2.76,
          assumption: `${usage.logsGb} GB ingested; first 5 GB included`,
        };
      case "azurerm_public_ip":
        return { ...base, service: "Public IP · Standard", monthly: 3.65 * count, assumption: "730 hours" };
      case "azurerm_container_registry":
        return { ...base, service: "Container Registry · Basic", monthly: 5 * count, assumption: "$5 per registry" };
      default:
        return {
          ...base,
          service: resource.type.replace(/^azurerm_/, "").replaceAll("_", " "),
          monthly: null,
          assumption: "Resource detected, but not priced",
        };
    }
  });
}

function ArchitectureNodeButton({
  node,
  selected,
  onSelect,
}: {
  node: ArchitectureNode;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = node.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group flex min-h-28 w-full flex-col items-start justify-between rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        selected
          ? "border-sky-500 bg-sky-500/10 shadow-[0_0_0_3px_rgba(14,165,233,0.12)]"
          : "border-border bg-background hover:-translate-y-0.5 hover:border-sky-500/50 hover:shadow-md",
      )}
    >
      <span className={cn("rounded-lg border p-2", node.accent)}>
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block text-sm font-semibold">{node.label}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{node.service}</span>
      </span>
    </button>
  );
}

function ArchitectureView() {
  const [selectedId, setSelectedId] = useState("frontdoor");
  const selected = ARCHITECTURE_NODES.find((node) => node.id === selectedId)!;
  const SelectedIcon = selected.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">Serverless portfolio request path</p>
            <p className="mt-1 text-sm text-muted-foreground">Select any service to inspect its role.</p>
          </div>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <span className="size-2 rounded-full bg-emerald-500" />
            Managed services
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid items-center gap-2 sm:grid-cols-[1fr_28px_1fr_28px_1fr]">
            <ArchitectureNodeButton node={ARCHITECTURE_NODES[0]} selected={selectedId === "github"} onSelect={() => setSelectedId("github")} />
            <ChevronRight className="mx-auto hidden size-5 text-sky-500 sm:block" />
            <ArchitectureNodeButton node={ARCHITECTURE_NODES[2]} selected={selectedId === "storage"} onSelect={() => setSelectedId("storage")} />
            <ChevronRight className="mx-auto hidden size-5 text-sky-500 sm:block" />
            <ArchitectureNodeButton node={ARCHITECTURE_NODES[1]} selected={selectedId === "frontdoor"} onSelect={() => setSelectedId("frontdoor")} />
          </div>

          <div className="flex items-center justify-center gap-2 py-1 text-xs font-medium text-sky-600 dark:text-sky-300">
            <span className="h-6 w-px bg-sky-500/40" />
            API request
            <span className="h-6 w-px bg-sky-500/40" />
          </div>

          <div className="grid items-center gap-2 sm:grid-cols-[1fr_28px_1fr_28px_1fr]">
            <div className="hidden sm:block" />
            <div className="hidden sm:block" />
            <ArchitectureNodeButton node={ARCHITECTURE_NODES[3]} selected={selectedId === "function"} onSelect={() => setSelectedId("function")} />
            <ChevronRight className="mx-auto hidden size-5 text-sky-500 sm:block" />
            <ArchitectureNodeButton node={ARCHITECTURE_NODES[4]} selected={selectedId === "cosmos"} onSelect={() => setSelectedId("cosmos")} />
          </div>

          <div className="grid gap-2 sm:grid-cols-[1fr_28px_1fr_28px_1fr]">
            <div className="hidden sm:block" />
            <div className="hidden sm:block" />
            <div className="flex items-center justify-center py-1 text-sky-500">
              <span className="h-6 w-px bg-sky-500/40" />
            </div>
            <div className="hidden sm:block" />
            <div className="hidden sm:block" />
            <div className="hidden sm:block" />
            <div className="hidden sm:block" />
            <ArchitectureNodeButton node={ARCHITECTURE_NODES[5]} selected={selectedId === "monitor"} onSelect={() => setSelectedId("monitor")} />
          </div>
        </div>
      </div>

      <aside className="rounded-2xl border border-sky-500/25 bg-gradient-to-b from-sky-500/10 to-background p-5 shadow-sm" aria-live="polite">
        <div className={cn("mb-5 inline-flex rounded-xl border p-3", selected.accent)}>
          <SelectedIcon className="size-6" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">{selected.service}</p>
        <h2 className="mt-2 text-2xl font-bold">{selected.label}</h2>
        <p className="mt-2 text-base font-medium leading-relaxed">{selected.role}</p>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{selected.detail}</p>
        <div className="mt-6 rounded-xl border bg-background/80 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="size-4 text-emerald-600" />
            Security decision
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{selected.security}</p>
        </div>
      </aside>
    </div>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{value} {unit}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-sky-600"
      />
    </label>
  );
}

function EstimatorView() {
  const [terraform, setTerraform] = useState(SAMPLE_TERRAFORM);
  const [storageGb, setStorageGb] = useState(5);
  const [outboundGb, setOutboundGb] = useState(25);
  const [requestsMillion, setRequestsMillion] = useState(0.5);
  const [cosmosRu, setCosmosRu] = useState(400);
  const [logsGb, setLogsGb] = useState(3);

  const resources = useMemo(() => parseBlocks(terraform), [terraform]);
  const lines = useMemo(
    () => estimateResources(resources, { storageGb, outboundGb, requestsMillion, cosmosRu, logsGb }),
    [resources, storageGb, outboundGb, requestsMillion, cosmosRu, logsGb],
  );
  const total = lines.reduce((sum, line) => sum + (line.monthly ?? 0), 0);
  const unsupported = lines.filter((line) => line.monthly === null).length;

  const loadSample = (sample: "serverless" | "vm") => {
    setTerraform(sample === "serverless" ? SAMPLE_TERRAFORM : VM_TERRAFORM);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(390px,.95fr)]">
      <section className="overflow-hidden rounded-2xl border bg-[#07111f] text-slate-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Braces className="size-4 text-sky-400" />
            main.tf
          </div>
          <div className="flex gap-2">
            <button onClick={() => loadSample("serverless")} className="rounded-md border border-white/15 px-2.5 py-1.5 text-xs transition-colors hover:bg-white/10">Serverless sample</button>
            <button onClick={() => loadSample("vm")} className="rounded-md border border-white/15 px-2.5 py-1.5 text-xs transition-colors hover:bg-white/10">VM sample</button>
          </div>
        </div>
        <textarea
          value={terraform}
          onChange={(event) => setTerraform(event.target.value)}
          spellCheck={false}
          aria-label="Terraform configuration"
          className="h-[520px] w-full resize-y bg-transparent p-5 font-mono text-sm leading-6 text-slate-200 outline-none selection:bg-sky-500/40"
        />
      </section>

      <div className="space-y-5">
        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Indicative monthly cost</p>
              <p className="mt-1 text-4xl font-bold tracking-tight">${total.toFixed(2)}</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              {resources.length} resources found
            </span>
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted p-3 text-xs leading-5 text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            Educational estimate in USD using a small illustrative rate card. It is not an Azure quote and excludes taxes, reservations, regional variation, and some usage charges.
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Usage assumptions</h2>
              <p className="mt-1 text-xs text-muted-foreground">Terraform describes capacity; these controls model consumption.</p>
            </div>
            <button
              onClick={() => { setStorageGb(5); setOutboundGb(25); setRequestsMillion(0.5); setCosmosRu(400); setLogsGb(3); }}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Reset usage assumptions"
              title="Reset assumptions"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <RangeField label="Hot storage" value={storageGb} min={1} max={500} step={1} unit="GB" onChange={setStorageGb} />
            <RangeField label="Outbound data" value={outboundGb} min={0} max={1000} step={5} unit="GB" onChange={setOutboundGb} />
            <RangeField label="Function requests" value={requestsMillion} min={0} max={20} step={0.5} unit="million" onChange={setRequestsMillion} />
            <RangeField label="Cosmos throughput" value={cosmosRu} min={100} max={4000} step={100} unit="RU/s" onChange={setCosmosRu} />
            <RangeField label="Log ingestion" value={logsGb} min={0} max={100} step={1} unit="GB" onChange={setLogsGb} />
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="font-semibold">Cost breakdown</h2>
            {unsupported > 0 && <span className="text-xs text-amber-700 dark:text-amber-300">{unsupported} not priced</span>}
          </div>
          {lines.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <Code2 className="mx-auto size-7 text-muted-foreground" />
              <p className="mt-3 text-sm font-medium">No resource blocks detected</p>
              <p className="mt-1 text-xs text-muted-foreground">Add an azurerm resource to the editor.</p>
            </div>
          ) : (
            <div className="max-h-80 divide-y overflow-y-auto">
              {lines.map((line) => (
                <div key={line.key} className="flex items-start justify-between gap-4 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium capitalize">{line.service}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{line.resource} · {line.assumption}</p>
                  </div>
                  <span className={cn("shrink-0 font-mono text-sm font-semibold", line.monthly === null && "text-muted-foreground")}>
                    {line.monthly === null ? "—" : `$${line.monthly.toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export function AzureLab() {
  const [tab, setTab] = useState<Tab>("architecture");

  return (
    <div className="space-y-5">
      <div className="flex w-full max-w-md rounded-xl border bg-muted/60 p-1" role="tablist" aria-label="Azure lab tools">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "architecture"}
          onClick={() => setTab("architecture")}
          className={cn("flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all", tab === "architecture" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
        >
          <Workflow className="size-4" />
          Architecture
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "estimator"}
          onClick={() => setTab("estimator")}
          className={cn("flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all", tab === "estimator" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
        >
          <CircleDollarSign className="size-4" />
          Cost estimator
        </button>
      </div>

      {tab === "architecture" ? <ArchitectureView /> : <EstimatorView />}

      <footer className="grid gap-3 rounded-2xl border bg-muted/30 p-5 text-sm sm:grid-cols-3">
        <div className="flex gap-3"><Cloud className="mt-0.5 size-5 shrink-0 text-sky-600" /><span><strong className="block">Cloud-native</strong><span className="text-muted-foreground">Managed services with no persistent web server.</span></span></div>
        <div className="flex gap-3"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" /><span><strong className="block">Least privilege</strong><span className="text-muted-foreground">Identity-based access between Azure resources.</span></span></div>
        <div className="flex gap-3"><MonitorCog className="mt-0.5 size-5 shrink-0 text-violet-600" /><span><strong className="block">Observable</strong><span className="text-muted-foreground">Telemetry covers delivery, API, and dependencies.</span></span></div>
      </footer>
    </div>
  );
}
