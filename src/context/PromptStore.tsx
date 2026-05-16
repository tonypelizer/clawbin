"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { PROMPTS } from "@/data/mock";
import { Prompt, PromptState } from "@/types";
import { generateMockRun } from "@/lib/mockRun";

interface PromptStoreValue {
  prompts: Prompt[];
  promptStates: Record<string, PromptState>;
  handleUpvote: (id: string) => void;
  handleBookmark: (id: string) => void;
  handleRun: (id: string) => void;
}

const PromptStoreContext = createContext<PromptStoreValue | null>(null);

export function PromptStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [promptStates, setPromptStates] = useState<Record<string, PromptState>>(
    () =>
      Object.fromEntries(
        PROMPTS.map((p) => [
          p.id,
          {
            upvotes: p.upvotes,
            upvoted: false,
            bookmarked: p.isBookmarked ?? false,
            runs: p.runs,
            runsCount: p.runsCount,
          },
        ]),
      ),
  );

  const handleUpvote = useCallback((id: string) => {
    setPromptStates((prev) => {
      const s = prev[id];
      return {
        ...prev,
        [id]: {
          ...s,
          upvoted: !s.upvoted,
          upvotes: s.upvoted ? s.upvotes - 1 : s.upvotes + 1,
        },
      };
    });
  }, []);

  const handleBookmark = useCallback((id: string) => {
    setPromptStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], bookmarked: !prev[id].bookmarked },
    }));
  }, []);

  const handleRun = useCallback((id: string) => {
    const prompt = PROMPTS.find((p) => p.id === id);
    if (!prompt) return;
    const newRun = generateMockRun(prompt);
    setPromptStates((prev) => {
      const s = prev[id];
      return {
        ...prev,
        [id]: { ...s, runs: [newRun, ...s.runs], runsCount: s.runsCount + 1 },
      };
    });
  }, []);

  return (
    <PromptStoreContext.Provider
      value={{
        prompts: PROMPTS,
        promptStates,
        handleUpvote,
        handleBookmark,
        handleRun,
      }}
    >
      {children}
    </PromptStoreContext.Provider>
  );
}

export function usePromptStore() {
  const ctx = useContext(PromptStoreContext);
  if (!ctx)
    throw new Error("usePromptStore must be used inside PromptStoreProvider");
  return ctx;
}
