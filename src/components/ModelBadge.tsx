"use client";
import { Model } from "@/types";

const MODEL_STYLES: Record<Model, string> = {
  "GPT-4o": "bg-emerald-950/60 text-emerald-400 border border-emerald-900/40",
  "GPT-4o Mini":
    "bg-emerald-950/40 text-emerald-500 border border-emerald-900/30",
  "Claude 3.5": "bg-amber-950/60 text-amber-400 border border-amber-900/40",
  "Claude 3 Opus": "bg-amber-950/60 text-amber-300 border border-amber-900/40",
  "Gemini 1.5 Pro": "bg-blue-950/60 text-blue-400 border border-blue-900/40",
  "Mistral Large":
    "bg-purple-950/60 text-purple-400 border border-purple-900/40",
};

export default function ModelBadge({ model }: { model: Model }) {
  const style =
    MODEL_STYLES[model] ??
    "bg-zinc-800/60 text-zinc-400 border border-zinc-700/40";
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-mono font-medium ${style}`}
    >
      {model}
    </span>
  );
}
