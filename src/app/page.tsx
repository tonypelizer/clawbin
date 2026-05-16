"use client";
import { useState, useMemo } from "react";
import PromptFeed from "@/components/PromptFeed";
import PromptDetail from "@/components/PromptDetail";
import { PROMPTS } from "@/data/mock";
import { Prompt } from "@/types";
import { usePromptStore } from "@/context/PromptStore";
import { clsx } from "clsx";

type FilterTab = "trending" | "latest" | "top-rated";

export default function HomePage() {
  const { promptStates, handleUpvote, handleBookmark, handleRun } =
    usePromptStore();

  const [filterTab, setFilterTab] = useState<FilterTab>("trending");
  const [selectedId, setSelectedId] = useState<string>(PROMPTS[0].id);
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  function handleCardSelect(id: string) {
    setSelectedId(id);
    setMobileShowDetail(true);
  }

  const selectedPrompt = useMemo(
    () => PROMPTS.find((p) => p.id === selectedId) ?? PROMPTS[0],
    [selectedId],
  );

  const filteredPrompts = useMemo(() => {
    let list: Prompt[] = [...PROMPTS];

    if (filterTab === "trending") {
      list.sort(
        (a, b) =>
          (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) ||
          (promptStates[b.id]?.upvotes ?? b.upvotes) -
            (promptStates[a.id]?.upvotes ?? a.upvotes),
      );
    } else if (filterTab === "top-rated") {
      list.sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount);
    }

    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTab, promptStates]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Feed panel:
          Mobile — full width, hidden when detail is open
          Desktop — fixed 420px column with right border */}
      <div
        className={clsx(
          "overflow-hidden flex-col",
          "lg:flex lg:w-[420px] lg:flex-shrink-0 lg:border-r lg:border-border-subtle",
          mobileShowDetail ? "hidden" : "flex w-full",
        )}
      >
        <PromptFeed
          prompts={filteredPrompts}
          promptStates={promptStates}
          selectedId={selectedId}
          onSelect={handleCardSelect}
          onUpvote={handleUpvote}
          onBookmark={handleBookmark}
          filterTab={filterTab}
          onFilterChange={(tab) => setFilterTab(tab as FilterTab)}
          activeTag={null}
          title="Explore Prompts"
          subtitle="Discover and run the best prompts, shared by the community."
        />
      </div>

      {/* Detail panel:
          Mobile — full width, only visible when a card is selected
          Desktop — fills remaining space */}
      <div
        className={clsx(
          "flex-col flex-1 min-w-0 overflow-hidden",
          mobileShowDetail ? "flex" : "hidden lg:flex",
        )}
      >
        <PromptDetail
          key={selectedId}
          prompt={selectedPrompt}
          state={promptStates[selectedId]}
          onUpvote={() => handleUpvote(selectedId)}
          onBookmark={() => handleBookmark(selectedId)}
          onRun={() => handleRun(selectedId)}
          onBack={() => setMobileShowDetail(false)}
        />
      </div>
    </div>
  );
}
