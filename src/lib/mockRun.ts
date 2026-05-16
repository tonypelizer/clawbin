import { Prompt, PromptRun, Model } from "@/types";
import { CURRENT_USER } from "@/data/mock";

const MODELS: Model[] = [
  "GPT-4o",
  "Claude 3.5",
  "GPT-4o Mini",
  "Gemini 1.5 Pro",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Per-tag input samples ────────────────────────────────────────────────────
const INPUTS: Record<string, string[]> = {
  Marketing: [
    `product: "Spark AI — writing tool for busy founders"`,
    `product: "Plumo — smart expense tracking for freelancers"`,
    `product: "Draftly — email templates that actually convert"`,
  ],
  Email: [
    `product: "Nexus CRM — unified customer data platform"`,
    `product: "Beacon — onboarding analytics for SaaS teams"`,
  ],
  Coding: [
    `language: "TypeScript"\ncontext: "React hook with data fetching and error handling"`,
    `language: "Python"\ncontext: "FastAPI route handler with JWT auth"`,
  ],
  SQL: [
    `schema: "users(id, name, email), orders(id, user_id, total, status, created_at), products(id, name, category)"\nquestion: "Monthly revenue by product category for last 6 months"`,
    `schema: "sessions(id, user_id, started_at, ended_at), events(id, session_id, name)"\nquestion: "Average session duration per user cohort"`,
  ],
  Education: [
    `topic: "How do neural networks learn?"`,
    `topic: "What is compound interest and why does it matter?"`,
    `topic: "How does DNA replication work?"`,
  ],
  LinkedIn: [
    `topic: "Why I left a big company for a 5-person startup"`,
    `topic: "3 things I learned from shipping a product nobody wanted"`,
  ],
  SEO: [
    `page_title: "Best Budgeting App for Students"\nkeyword: "budgeting app for students"\nsecondary: "free, money management, college"`,
  ],
  Sales: [
    `prospect_name: "Lisa Tran", company: "Notion", role: "VP Product", trigger: "Just closed Series B"`,
    `prospect_name: "James Wu", company: "Linear", role: "Head of Growth", trigger: "Launched new API"`,
  ],
  Productivity: [
    `notes: "Q3 sync: shipped v2, eng retro Thu, hire 2 designers by Aug, pricing TBD, Chris on social"`,
    `notes: "Standup: blocked on design review, API rate limits hit, deploy target Friday, sync with Sara re: docs"`,
  ],
};

// ─── Per-tag output samples ───────────────────────────────────────────────────
const OUTPUTS: Record<string, string[]> = {
  Marketing: [
    `Subject: What 300 users did in their first week

Hi there,

When we launched Spark AI's early access last month, we expected writers.

We got founders, marketers, engineers, and even a novelist.

Here's what surprised us: the #1 use case wasn't writing new content — it was editing what already existed.

Spark doesn't make you write faster. It makes what you've written say more.

We're opening 200 founding-member spots this week.
50% off. Locked forever.

→ Claim yours: spark.ai/founding

Write better,
The Spark Team`,
    `Subject: You've been doing this wrong (we did too)

Hi,

We spent 6 months building Plumo before we noticed our biggest mistake.

We were optimising for speed. Our users wanted clarity.

Not "track expenses fast" — but "understand where my money actually goes."

So we rebuilt the dashboard around insight, not data entry.

Result: average time-to-understanding dropped from 14 minutes to 2.

See the new Plumo → plumo.app/new

Yours in clarity,
Mia & the Plumo team`,
  ],
  Email: [
    `Subject: Your first 7 days with Nexus

Hi {{first_name}},

Welcome — you're now connected to every customer touchpoint in one place.

Here's what to do this week:

1. **Import your contacts** (takes 2 min) → nexus.app/import
2. **Set up your first pipeline** — we have a template for your industry
3. **Invite your team** — the magic multiplies with more context

If you get stuck, reply to this email. A human reads every response.

Talk soon,
The Nexus team

P.S. Your first 30 days are on us. No credit card needed.`,
  ],
  Coding: [
    `## Summary
Well-structured component with a clear separation of concerns. One critical bug that will cause subtle stale-data issues in production.

## Critical Issues
- **Stale closure in useEffect**: Empty dependency array \`[]\` means the effect captures \`userId\` at mount time only. If the prop changes, the fetch won't re-run. Fix: add \`[userId]\` as the dependency array.
- **No abort on unmount**: If the component unmounts before the fetch resolves, you'll get a "state update on unmounted component" warning. Use \`AbortController\`.

## Suggestions
- Extract into a \`useUser(id)\` custom hook for reuse across features
- Add explicit \`error\` state and surface it in the UI — silent failures are worse than visible ones
- Consider \`React.Suspense\` + data-fetching library (SWR/TanStack Query) for cleaner patterns

## Nitpicks
- Rename \`data\` → \`user\` throughout for clarity
- \`isLoading\` can be derived: \`!user && !error\`

## What's Great
- TypeScript types are tight — no \`any\` escapes anywhere
- Conditional rendering is readable and easy to scan at a glance`,
  ],
  SQL: [
    `-- Monthly revenue by product category (last 6 months)
-- Assumption: includes only 'completed' orders
SELECT
  p.category,
  DATE_TRUNC('month', o.created_at)  AS month,
  SUM(o.total)                        AS revenue,
  COUNT(DISTINCT o.id)                AS orders,
  COUNT(DISTINCT o.user_id)           AS unique_buyers
FROM orders o
INNER JOIN products p ON p.id = o.product_id
WHERE
  o.status     = 'completed'
  AND o.created_at >= NOW() - INTERVAL '6 months'
GROUP BY p.category, DATE_TRUNC('month', o.created_at)
ORDER BY month DESC, revenue DESC;`,
  ],
  Education: [
    `Great question! Let me explain with a simple analogy.

Imagine your brain is a huge library. When you learn something, a librarian writes it on a sticky note and places it on a shelf. The problem? The library is enormous and sticky notes fall off.

Neural networks work the same way — but they learn by being *wrong* first.

You show the network a picture of a cat 🐱 and it guesses "dog." 
So it adjusts thousands of tiny dials (called "weights") to make that wrong answer less likely next time.

Repeat a million times. It gets very good at cats.

The process of adjusting those dials is called **backpropagation** — or just "learning from your mistakes, really fast."

**Did you know?** The human brain has ~86 billion neurons. GPT-4 has ~1.7 trillion parameters — roughly 20× more connection points than your brain! 🤯`,
  ],
  LinkedIn: [
    `I left a 200-person company with a great salary last year.

Everyone thought I was crazy. Here's what changed my mind:

**1. I stopped learning.**
Big company roles get narrow fast. I was great at one thing and quietly forgetting everything else.

**2. I had no real ownership.**
I shipped features that 3 people used. The feedback loop was broken.

**3. Small teams move like water.**
Five people with full context can out-manoeuvre a 50-person team on any given Tuesday.

Was it risky? Yes.
Pay cut? Yes.

But I've learned more in the last 6 months than in the previous 3 years — and I wake up caring about what I build.

What made you take (or avoid) a bet on a small team?

#Startups #Career #BuildInPublic`,
  ],
  SEO: [
    `**Variation 1** (149 chars)
The best budgeting app for students — track spending, set goals, and finally stick to them. Free to start, powerful from day one.

**Variation 2** (153 chars)
Struggling to budget on a student income? Our app makes money management simple, visual, and actually useful. Download free today.

**Variation 3** (141 chars)
Built for students, not accountants. The budgeting app that speaks your language and helps you graduate financially aware.`,
  ],
  Sales: [
    `Subject: The drop-off Notion's new users hit at day 3

Hi Lisa,

Congratulations on the Series B — the traction you've built in the enterprise segment is impressive.

Here's a pattern that tends to emerge right after rounds like this: product-led growth acquires users brilliantly, and then something breaks in week one.

We've mapped that exact inflection point for teams like Figma and Loom — users who activate but don't convert to paid because the value moment takes too long to reach.

We help product and growth teams identify and compress that gap.

Worth 20 minutes this week if the timing is right?

Jordan Park`,
  ],
  Productivity: [
    `## Action Items
| # | Task | Owner | Due Date | Priority |
|---|------|-------|----------|----------|
| 1 | Publish v2 release notes to all users | Marketing | This Friday | High |
| 2 | Schedule engineering retrospective | Lead Eng | Thursday | Medium |
| 3 | Post 2× designer roles on LinkedIn + Greenhouse | HR | Monday | High |
| 4 | Resolve pricing structure — loop in Finance | PM | TBD | High |
| 5 | Hand off social media scheduling to Chris | Chris | TBD | Medium |

## Key Decisions
- v2 shipped ✓ — full-team announcement pending release notes
- Designer headcount approved: 2 hires, targeting August start

## Open Questions
- Retro format: async Notion doc or live session?
- Are designer roles IC or do they include a lead position?`,
  ],
};

function getFallbackOutput(prompt: Prompt): string {
  return `✓ Prompt executed successfully for: "${prompt.title}"

Based on the provided context and variables, here is the structured response:

The AI model analysed the prompt template, substituted the provided variables, and generated the following output tailored to your specific use case.

Key points addressed:
• Primary objective met with high confidence
• Output formatted according to the specified structure
• Variables ${
    prompt.body
      .match(/\{\{[^}]+\}\}/g)
      ?.slice(0, 3)
      .join(", ") ?? "provided"
  } were incorporated naturally

This response demonstrates how the model handles your prompt in a real execution context.

[Full production output would appear here]`;
}

export function generateMockRun(prompt: Prompt): PromptRun {
  const firstTag = prompt.tags[0] ?? "";
  const inputPool = INPUTS[firstTag] ?? [`topic: "${prompt.title}"`];
  const outputPool = OUTPUTS[firstTag];

  return {
    id: `run-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    promptId: prompt.id,
    runBy: CURRENT_USER,
    model: pick(MODELS),
    input: pick(inputPool),
    output: outputPool ? pick(outputPool) : getFallbackOutput(prompt),
    runAt: "just now",
  };
}
