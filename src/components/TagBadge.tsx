"use client";
import { Tag } from "@/types";

const TAG_COLORS: Record<string, string> = {
  Marketing: "bg-pink-950/60 text-pink-300 border border-pink-900/50",
  Email: "bg-violet-950/60 text-violet-300 border border-violet-900/50",
  Copywriting: "bg-purple-950/60 text-purple-300 border border-purple-900/50",
  Education: "bg-blue-950/60 text-blue-300 border border-blue-900/50",
  Explainer: "bg-sky-950/60 text-sky-300 border border-sky-900/50",
  Learning: "bg-cyan-950/60 text-cyan-300 border border-cyan-900/50",
  Coding: "bg-green-950/60 text-green-300 border border-green-900/50",
  SQL: "bg-emerald-950/60 text-emerald-300 border border-emerald-900/50",
  Database: "bg-teal-950/60 text-teal-300 border border-teal-900/50",
  LinkedIn: "bg-indigo-950/60 text-indigo-300 border border-indigo-900/50",
  "Social Media": "bg-blue-950/60 text-blue-300 border border-blue-900/50",
  Research: "bg-amber-950/60 text-amber-300 border border-amber-900/50",
  Productivity: "bg-orange-950/60 text-orange-300 border border-orange-900/50",
  "Data Analysis":
    "bg-yellow-950/60 text-yellow-300 border border-yellow-900/50",
  Writing: "bg-rose-950/60 text-rose-300 border border-rose-900/50",
  SEO: "bg-lime-950/60 text-lime-300 border border-lime-900/50",
  Sales: "bg-red-950/60 text-red-300 border border-red-900/50",
  Design: "bg-fuchsia-950/60 text-fuchsia-300 border border-fuchsia-900/50",
  Engineering: "bg-slate-800/70 text-slate-300 border border-slate-700/50",
  AI: "bg-violet-950/60 text-violet-300 border border-violet-900/50",
};

const DEFAULT_COLOR = "bg-zinc-800/70 text-zinc-300 border border-zinc-700/50";

interface TagBadgeProps {
  tag: Tag;
  size?: "sm" | "md";
}

export default function TagBadge({ tag, size = "sm" }: TagBadgeProps) {
  const color = TAG_COLORS[tag] ?? DEFAULT_COLOR;
  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      } ${color}`}
    >
      {tag}
    </span>
  );
}
