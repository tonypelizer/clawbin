"use client";
import { useState, useMemo, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import PromptFeed from "@/components/PromptFeed";
import PromptDetail from "@/components/PromptDetail";
import BottomNav from "@/components/BottomNav";
import { PROMPTS } from "@/data/mock";
import { Prompt, PromptRun } from "@/types";
import { generateMockRun } from "@/lib/mockRun";
import { clsx } from "clsx";

type FilterTab = "trending" | "latest" | "top-rated";
type NavSection = "explore" | "my-prompts" | "bookmarks" | "my-runs";

// Per-prompt mutable state lifted here so card + detail stay in sync
export interface PromptState {
  upvotes: number;
  upvoted: boolean;
  bookmarked: boolean;
  runs: PromptRun[];
  runsCount: number;
}
type PromptStateMap = Record<string, PromptState>;

export default function Home() {
  const [activeNav, setActiveNav] = useState<NavSection>("explore");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState<FilterTab>("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(PROMPTS[0].id);
  // Mobile: show the detail panel instead of the feed
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialise per-prompt state once from mock data
  const [promptStates, setPromptStates] = useState<PromptStateMap>(() =>
    Object.fromEntries(
      PROMPTS.map((p) => [
        p.id,
        {
          upvotes: p.upvotes,
          upvoted: false,
          bookmarked: p.isBookmarked ?? false,
          runs: p.runs,
          runsCount: p.runsCount,
        } satisfies PromptState,
      ]),
    ),
  );

  function patchPrompt(id: string, patch: Partial<PromptState>) {
    setPromptStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }));
  }

  function handleUpvote(id: string) {
    const s = promptStates[id];
    patchPrompt(id, {
      upvoted: !s.upvoted,
      upvotes: s.upvoted ? s.upvotes - 1 : s.upvotes + 1,
    });
  }

  function handleBookmark(id: string) {
    patchPrompt(id, { bookmarked: !promptStates[id].bookmarked });
  }

  function handleRun(id: string) {
    const prompt = PROMPTS.find((p) => p.id === id);
    if (!prompt) return;
    const newRun = generateMockRun(prompt);
    const s = promptStates[id];
    patchPrompt(id, {
      runs: [newRun, ...s.runs],
      runsCount: s.runsCount + 1,
    });
  }

  // On mobile, selecting a card navigates to the detail view
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

    if (activeNav === "bookmarks") {
      list = list.filter((p) => promptStates[p.id]?.bookmarked);
    } else if (activeNav === "my-prompts") {
      list = list.filter((p) => p.author.id === "u1");
    }

    if (activeTag) {
      list = list.filter((p) => p.tags.includes(activeTag));
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.author.name.toLowerCase().includes(q),
      );
    }

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
  }, [activeNav, activeTag, filterTab, searchQuery, promptStates]);

  const navMeta: Record<NavSection, { title: string; subtitle: string }> = {
    explore: {
      title: "Explore Prompts",
      subtitle: "Discover and run the best prompts, shared by the community.",
    },
    "my-prompts": {
      title: "My Prompts",
      subtitle: "Prompts you have created and published.",
    },
    bookmarks: {
      title: "Bookmarks",
      subtitle: "Prompts you have saved for quick access.",
    },
    "my-runs": {
      title: "My Runs",
      subtitle: "Your recent AI prompt executions.",
    },
  };

  return (
    <div className="flex h-full bg-bg-base overflow-hidden">
      {/* Sidebar — desktop only */}
      <Sidebar
        className="hidden lg:flex"
        activeNav={activeNav}
        onNavChange={(nav) => setActiveNav(nav as NavSection)}
        activeTag={activeTag}
        onTagChange={setActiveTag}
      />

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          inputRef={searchInputRef}
        />

        {/* Content split */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
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
              activeTag={activeTag}
              title={navMeta[activeNav].title}
              subtitle={navMeta[activeNav].subtitle}
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

        {/* Bottom navigation — mobile only */}
        <BottomNav
          activeNav={activeNav}
          onNavChange={(nav) => {
            setActiveNav(nav);
            setMobileShowDetail(false);
          }}
          onSearch={() => {
            setMobileShowDetail(false);
            // Give the feed a tick to mount before focusing
            setTimeout(() => searchInputRef.current?.focus(), 50);
          }}
          onCreate={() => {}}
        />
      </div>
    </div>
  );
}
