"use client";
import { notFound } from "next/navigation";
import { use } from "react";
import { useRouter } from "next/navigation";
import { PROMPTS } from "@/data/mock";
import { usePromptStore } from "@/context/PromptStore";
import PromptDetail from "@/components/PromptDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default function PromptPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const prompt = PROMPTS.find((p) => p.id === id);

  if (!prompt) notFound();

  const { promptStates, handleUpvote, handleBookmark, handleRun } =
    usePromptStore();

  const state = promptStates[prompt.id];

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full">
      <PromptDetail
        prompt={prompt}
        state={state}
        onUpvote={() => handleUpvote(prompt.id)}
        onBookmark={() => handleBookmark(prompt.id)}
        onRun={() => handleRun(prompt.id)}
        onBack={() => router.back()}
      />
    </div>
  );
}
