"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

type Contribution = { date: string; count: number };

const LEVELS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const startOfGraph = (year: number) => {
  const start = new Date(year, 0, 1);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
};

const contributionLevel = (count: number, max: number) => {
  if (!count || !max) return 0;
  return Math.min(4, Math.ceil((count / max) * 4));
};

export function GitHubContributionsFallback() {
  return <div className="h-40 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900" />;
}

const GitHubContributions = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    let active = true;

    const loadContributions = async () => {
      try {
        const response = await fetch("https://github-contributions-api.jogruber.de/v4/arnabjena007");
        if (!response.ok) throw new Error("Contribution request failed");
        const data = await response.json();
        if (active) setContributions(data.contributions ?? []);
      } catch {
        if (active) setContributions([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadContributions();
    return () => {
      active = false;
    };
  }, []);

  const years = useMemo(() => {
    const available = new Set(contributions.map(({ date }) => Number(date.slice(0, 4))).filter(Boolean));
    available.add(currentYear);
    return [...available].sort((a, b) => b - a).slice(0, 5);
  }, [contributions, currentYear]);

  const { days, total, max } = useMemo(() => {
    const byDate = new Map(
      contributions.filter(({ date }) => date.startsWith(`${year}-`)).map(({ date, count }) => [date, count]),
    );
    const maximum = Math.max(0, ...byDate.values());
    const start = startOfGraph(year);
    const graphDays = Array.from({ length: 53 * 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const inYear = date.getFullYear() === year;
      return { date, inYear, count: inYear ? byDate.get(dateKey(date)) ?? 0 : 0 };
    });
    return { days: graphDays, total: [...byDate.values()].reduce((sum, count) => sum + count, 0), max: maximum };
  }, [contributions, year]);

  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white p-4 font-sans shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          <span className="font-semibold text-neutral-950 dark:text-white">{loading ? "…" : total.toLocaleString("en-US")}</span>{" "}
          contributions in {year}
        </p>
        <label className="relative shrink-0">
          <span className="sr-only">Contribution year</span>
          <select value={year} onChange={(event) => setYear(Number(event.target.value))} className="appearance-none rounded-md border border-neutral-200 bg-white py-1 pl-2 pr-6 text-xs font-medium text-neutral-700 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
            {years.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
          <ChevronDown size={12} aria-hidden className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-neutral-400" />
        </label>
      </div>

      <div className="grid grid-cols-12 gap-1 px-6 text-[9px] text-neutral-400 sm:text-[10px]">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => <span key={month}>{month}</span>)}
      </div>
      <div className="mt-1 grid auto-cols-fr grid-flow-col grid-rows-7 gap-[3px]" aria-label={`${total} GitHub contributions in ${year}`}>
        {days.map(({ date, count, inYear }) => {
          const level = inYear ? contributionLevel(count, max) : 0;
          return (
            <span
              key={dateKey(date)}
              title={inYear ? `${count} contributions on ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : undefined}
              className="aspect-square min-h-0 rounded-[2px]"
              style={{ backgroundColor: inYear ? LEVELS[level] : "transparent" }}
            />
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
        <a href="https://github.com/arnabjena007" target="_blank" rel="noreferrer" className="hover:text-neutral-950 dark:hover:text-white">@arnabjena007 ↗</a>
        <div className="flex items-center gap-1" aria-label="Contribution intensity: less to more">
          <span>Less</span>
          {LEVELS.map((color) => <span key={color} className="size-2.5 rounded-[2px]" style={{ backgroundColor: color }} />)}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributions;
