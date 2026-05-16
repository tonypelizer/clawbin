"use client";
import { Search, Bell, Plus, Command } from "lucide-react";
import Avatar from "./Avatar";
import { CURRENT_USER } from "@/data/mock";

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function TopBar({
  searchQuery,
  onSearchChange,
  inputRef,
}: TopBarProps) {
  return (
    <header className="h-14 flex-shrink-0 flex items-center gap-3 px-4 border-b border-border-subtle bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-20">
      {/* Clawbin logo — mobile only (sidebar hidden on mobile) */}
      <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.4)]">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M3 2C3 1.4 3.4 1 4 1H11C11.6 1 12 1.4 12 2V4L13.5 5.5C13.8 5.8 14 6.2 14 6.6V12C14 12.6 13.6 13 13 13H2C1.4 13 1 12.6 1 12V6.6C1 6.2 1.2 5.8 1.5 5.5L3 4V2Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </div>
      </div>

      {/* Search input */}
      <div className="flex-1 relative group">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-text-secondary transition-colors pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search prompts, tags, or use cases..."
          className="w-full h-10 lg:h-9 pl-8 pr-3 lg:pr-16 rounded-lg bg-bg-elevated border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:bg-bg-hover transition-all"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-0.5 pointer-events-none">
          <kbd className="flex items-center gap-0.5 px-1 py-0.5 rounded bg-bg-hover border border-border-default text-[10px] text-text-muted font-mono">
            <Command size={9} />K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* New Prompt button: icon only on mobile, text+icon on desktop */}
        <button className="flex items-center justify-center gap-1.5 h-10 lg:h-9 w-10 lg:w-auto lg:px-4 rounded-lg bg-accent hover:bg-accent-hover active:scale-95 transition-all text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.45)]">
          <Plus size={18} strokeWidth={2.5} />
          <span className="hidden lg:inline">New Prompt</span>
        </button>

        {/* Notifications — desktop only */}
        <button className="hidden lg:flex relative w-9 h-9 rounded-lg items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-hover border border-border-subtle transition-all">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
        </button>

        {/* Avatar — desktop only */}
        <button className="hidden lg:flex rounded-full hover:ring-2 hover:ring-accent/40 transition-all">
          <Avatar author={CURRENT_USER} size="md" />
        </button>
      </div>
    </header>
  );
}
