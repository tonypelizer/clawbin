import { Author, Prompt, PromptRun } from "@/types";

export const AUTHORS: Author[] = [
  {
    id: "u1",
    name: "Sara Kim",
    username: "sarakim",
    initials: "SK",
    avatarColor: "#7c3aed",
  },
  {
    id: "u2",
    name: "Alex Rivera",
    username: "alexr",
    initials: "AR",
    avatarColor: "#0891b2",
  },
  {
    id: "u3",
    name: "Mike D.",
    username: "miked",
    initials: "MD",
    avatarColor: "#059669",
  },
  {
    id: "u4",
    name: "Emma Liu",
    username: "emmaliu",
    initials: "EL",
    avatarColor: "#db2777",
  },
  {
    id: "u5",
    name: "Jordan Park",
    username: "jordanp",
    initials: "JP",
    avatarColor: "#d97706",
  },
  {
    id: "u6",
    name: "Priya Nair",
    username: "priyan",
    initials: "PN",
    avatarColor: "#0284c7",
  },
  {
    id: "u7",
    name: "Chris Weston",
    username: "chrisw",
    initials: "CW",
    avatarColor: "#dc2626",
  },
];

export const CURRENT_USER = AUTHORS[0];

const makeRun = (
  id: string,
  promptId: string,
  author: Author,
  model: PromptRun["model"],
  input: string,
  output: string,
  runAt: string,
): PromptRun => ({ id, promptId, runBy: author, model, input, output, runAt });

export const PROMPTS: Prompt[] = [
  {
    id: "p1",
    title: "Write a high-converting product launch email 🔥",
    description:
      "Creates a compelling product launch email that builds curiosity, highlights benefits, and drives action.",
    body: `You are an expert email copywriter.
Write a high-converting product launch email for {{product}}.

The email should:
- Build curiosity around the core value proposition
- Highlight key benefits (not just features)
- Create a sense of urgency or scarcity
- Include a clear, single call-to-action
- Use a conversational, human tone
- Be under 300 words

Product context: {{product_context}}
Target audience: {{target_audience}}
Primary CTA link: {{cta_url}}`,
    tags: ["Marketing", "Email", "Copywriting"],
    author: AUTHORS[0],
    createdAt: "3 days ago",
    upvotes: 342,
    runsCount: 1200,
    rating: 4.8,
    ratingCount: 32,
    isPublic: true,
    isTrending: true,
    isBookmarked: false,
    runs: [
      makeRun(
        "r1",
        "p1",
        AUTHORS[1],
        "GPT-4o",
        `product: "Focusflow — AI productivity app"`,
        `Subject: Finally, focus that clicks.\n\nHi there,\n\nWe built Focusflow because staying focused in a noisy world is hard.\n\nMost productivity apps give you more lists. We give you fewer distractions.\n\nFocusflow uses AI to learn when you do your best work, then quietly clears your path — silencing noise, blocking apps, and surfacing only what matters.\n\nEarly users are reporting 2–3 extra hours of deep work every single day.\n\nWe're opening 500 early-access spots this week.\n\n→ Claim yours before they're gone: focusflow.app/early\n\nLet's build something great,\nThe Focusflow Team`,
        "2 days ago",
      ),
      makeRun(
        "r2",
        "p1",
        AUTHORS[3],
        "GPT-4o",
        `product: "Linktree Pro — link-in-bio for creators"`,
        `Subject: Your audience is waiting. Let's not keep them.\n\nHey,\n\nYour audience scrolls past dozens of links every day. But only one link lives in your bio.\n\nLinktree Pro turns that single link into your digital headquarters — one beautiful page that holds your store, newsletter, videos, social profiles, and more.\n\nOver 40 million creators already trust Linktree. Now the Pro tier gives you custom domains, analytics that actually make sense, and payment integrations built right in.\n\nFor less than a coffee per week.\n\n→ Start your free 14-day trial: linktree.com/pro\n\nYour story deserves more than one link,\nThe Linktree Team`,
        "1 day ago",
      ),
    ],
  },
  {
    id: "p2",
    title: "Explain complex topics like I'm 10 🧠",
    description:
      "Breaks down any complex topic into simple terms a 10 year old can understand.",
    body: `You are a brilliant teacher who specializes in making complex ideas simple.

Explain the following topic as if you're talking to a curious, smart 10-year-old:

Topic: {{topic}}

Rules:
- Use everyday analogies and comparisons
- Avoid jargon — if you must use a technical term, define it immediately
- Keep sentences short
- Use a friendly, enthusiastic tone
- Include 1-2 concrete examples
- End with a fun "did you know?" fact related to the topic`,
    tags: ["Education", "Explainer", "Learning"],
    author: AUTHORS[1],
    createdAt: "5 days ago",
    upvotes: 278,
    runsCount: 890,
    rating: 4.9,
    ratingCount: 47,
    isPublic: true,
    isTrending: true,
    isBookmarked: true,
    runs: [
      makeRun(
        "r3",
        "p2",
        AUTHORS[4],
        "Claude 3.5",
        `topic: "How does the internet work?"`,
        `Imagine you want to send a letter to your friend across town. You write it, seal it, and hand it to the post office. They figure out the best route and deliver it.\n\nThe internet works the same way! When you visit a website, your computer sends a tiny digital "letter" (called a request) to another computer somewhere in the world (called a server). That server sends back the webpage you wanted.\n\nThose letters travel through tubes called cables — some underground, some under the ocean — plus invisible wireless signals.\n\nHere's the cool part: each letter gets a unique address (an "IP address"), so it always gets to the right place, just like a home address.\n\nDid you know? There are over 1 billion websites on the internet today — that's more than 1 website for every 8 people on Earth! 🌍`,
        "4 days ago",
      ),
      makeRun(
        "r4",
        "p2",
        AUTHORS[2],
        "Claude 3.5",
        `topic: "Quantum entanglement"`,
        `Okay, imagine you have two magic coins. They're best friends. You flip one and it lands on heads — instantly, no matter where the other coin is (even if it's on Mars!), it lands on tails.\n\nThat's basically quantum entanglement! Two tiny particles become "linked." When you look at one and find out its state, the other one instantly knows what to be — even if they're far apart.\n\nScientists use this to build super-secure communication channels where no sneaky spy can intercept messages without being caught.\n\nDid you know? Einstein called entanglement "spooky action at a distance" because it seemed so impossible — but experiments have proven it's completely real! 👻`,
        "3 days ago",
      ),
    ],
  },
  {
    id: "p3",
    title: "Generate SQL query from plain English 🗄️",
    description:
      "Converts natural language questions into accurate SQL queries for any database schema.",
    body: `You are an expert database engineer. Convert the following natural language question into a correct, optimized SQL query.

Database schema:
{{schema}}

Question: {{question}}

Requirements:
- Write clean, readable SQL with proper formatting
- Use aliases for clarity
- Add a brief comment explaining the query logic
- If the question is ambiguous, state your assumption
- Prefer CTEs over nested subqueries for complex logic`,
    tags: ["Coding", "SQL", "Database"],
    author: AUTHORS[2],
    createdAt: "1 week ago",
    upvotes: 189,
    runsCount: 732,
    rating: 4.7,
    ratingCount: 28,
    isPublic: true,
    isTrending: false,
    isBookmarked: false,
    runs: [
      makeRun(
        "r5",
        "p3",
        AUTHORS[5],
        "GPT-4o",
        `schema: users(id, name, email, created_at), orders(id, user_id, total, status, created_at)\nquestion: "Show me the top 10 customers by total spend in the last 30 days"`,
        `-- Top 10 customers by total spend in the last 30 days\n-- Assumption: we include only completed orders\nSELECT\n  u.id,\n  u.name,\n  u.email,\n  SUM(o.total) AS total_spend,\n  COUNT(o.id)  AS order_count\nFROM users u\nINNER JOIN orders o\n  ON o.user_id = u.id\nWHERE\n  o.status     = 'completed'\n  AND o.created_at >= NOW() - INTERVAL '30 days'\nGROUP BY u.id, u.name, u.email\nORDER BY total_spend DESC\nLIMIT 10;`,
        "5 days ago",
      ),
    ],
  },
  {
    id: "p4",
    title: "LinkedIn post that gets engagement 🚀",
    description:
      "Crafts high-performing LinkedIn posts optimized for reach, saves, and comments.",
    body: `You are a LinkedIn growth strategist who has written posts with millions of impressions.

Write a high-engagement LinkedIn post about: {{topic}}

Tone: {{tone}} (default: professional but conversational)
Target audience: {{audience}}

Post structure:
1. Hook (first line must stop the scroll — use a bold claim, question, or surprising stat)
2. Story or insight (3–5 short paragraphs, 1–2 sentences each)
3. Actionable takeaway
4. Engagement CTA (ask a question to drive comments)

Format rules:
- No hashtag stuffing — 2–3 relevant hashtags max
- Short paragraphs with line breaks
- Under 300 words`,
    tags: ["Marketing", "LinkedIn", "Social Media"],
    author: AUTHORS[3],
    createdAt: "4 days ago",
    upvotes: 165,
    runsCount: 612,
    rating: 4.6,
    ratingCount: 19,
    isPublic: true,
    isTrending: false,
    isBookmarked: false,
    runs: [
      makeRun(
        "r6",
        "p4",
        AUTHORS[6],
        "GPT-4o Mini",
        `topic: "Lessons from shipping an AI product in 6 weeks"`,
        `I shipped an AI product in 6 weeks. Here's what nobody tells you:\n\nPerfect prompts don't exist on day one.\n\nYou'll spend 80% of your time not building the product, but building the thing that evaluates the product. Evals first, features second.\n\nWe had a beautiful demo by week two. Users didn't care. They wanted reliability over novelty.\n\nSo we deleted half our features and doubled down on the one thing users kept coming back to.\n\nThe lesson: AI products die from hallucination anxiety, not lack of features. Ship trust, not demos.\n\nIf you're building in AI right now — what's the hardest part: the tech, the trust, or the positioning?\n\n#AI #ProductBuilding #Startups`,
        "3 days ago",
      ),
    ],
  },
  {
    id: "p5",
    title: "Cold outreach email that actually gets replies 📬",
    description:
      "Writes personalized cold outreach emails using proven frameworks that drive responses.",
    body: `You are a seasoned sales consultant who has trained teams at Fortune 500 companies.

Write a cold outreach email using the Problem-Agitate-Solve framework.

Prospect details:
- Name: {{prospect_name}}
- Company: {{company}}
- Role: {{role}}
- Trigger / reason for reaching out: {{trigger}}

Sender context:
- Sender name: {{sender_name}}
- Product/service: {{product}}
- Key differentiator: {{differentiator}}

Email rules:
- Subject line: under 8 words, curiosity-driven
- Body: under 150 words
- One CTA — soft ask (e.g., quick call, reply with interest)
- No buzzwords like "synergy" or "circle back"`,
    tags: ["Sales", "Email", "Copywriting"],
    author: AUTHORS[4],
    createdAt: "2 days ago",
    upvotes: 143,
    runsCount: 489,
    rating: 4.5,
    ratingCount: 14,
    isPublic: true,
    isTrending: false,
    isBookmarked: true,
    runs: [
      makeRun(
        "r7",
        "p5",
        AUTHORS[0],
        "GPT-4o",
        `prospect_name: "David Chen", company: "Stripe", role: "Head of Growth", trigger: "They just launched a new payments SDK"`,
        `Subject: The onboarding drop-off after your new SDK\n\nHi David,\n\nCongratulations on the new Stripe SDK launch — the developer response looks strong.\n\nBut here's a pattern we see every time a fintech product expands its API surface: onboarding drop-off spikes 30–40% in the first 60 days as new use cases create new friction points.\n\nWe help growth teams at companies like Plaid and Brex map exactly where developers abandon the funnel — and fix it before it compounds.\n\nWorth a 20-minute conversation this week?\n\nBest,\nJordan`,
        "1 day ago",
      ),
    ],
  },
  {
    id: "p6",
    title: "Code review feedback like a senior engineer 👨‍💻",
    description:
      "Provides thorough, constructive code review feedback with clear reasoning and suggested improvements.",
    body: `You are a senior software engineer at a top-tier tech company. Provide a thorough code review of the following code.

Language/framework: {{language}}
Context: {{context}}

Code:
\`\`\`
{{code}}
\`\`\`

Review format:
## Summary
Brief overall assessment (2–3 sentences)

## Critical Issues
Problems that must be fixed before merge (bugs, security issues, performance blockers)

## Suggestions
Improvements worth making (readability, maintainability, best practices)

## Nitpicks
Minor style or preference notes

## What's Great
Genuinely positive observations — don't skip this section`,
    tags: ["Coding", "Engineering", "AI"],
    author: AUTHORS[5],
    createdAt: "6 days ago",
    upvotes: 127,
    runsCount: 441,
    rating: 4.9,
    ratingCount: 38,
    isPublic: true,
    isTrending: false,
    isBookmarked: false,
    runs: [
      makeRun(
        "r8",
        "p6",
        AUTHORS[1],
        "Claude 3.5",
        `language: "TypeScript / React"\ncode: "useEffect(() => { fetchUser(userId) }, [])"`,
        `## Summary\nThe hook setup is functional but has a notable staleness bug that will cause subtle issues in production. The core logic is sound and readable.\n\n## Critical Issues\n- **Stale closure on \`userId\`**: The empty dependency array \`[]\` means this effect only runs once — but \`fetchUser\` captures whatever \`userId\` was at mount time. If \`userId\` changes, the effect won't re-run. Fix: \`[userId]\` as the dependency array.\n- **No cleanup / abort controller**: If the component unmounts before the fetch resolves, you'll get a state-update-on-unmounted-component warning. Use an AbortController.\n\n## Suggestions\n- Extract the fetch logic into a custom \`useUser(userId)\` hook for reusability\n- Handle loading and error states explicitly\n\n## Nitpicks\n- \`fetchUser\` should probably be named \`loadUser\` to signal it triggers a side effect\n\n## What's Great\n- Clean, minimal — easy to scan at a glance`,
        "5 days ago",
      ),
    ],
  },
  {
    id: "p7",
    title: "Turn meeting notes into action items ✅",
    description:
      "Extracts clear, assigned action items from messy meeting notes with owners and deadlines.",
    body: `You are a professional executive assistant. Extract all action items from the following meeting notes.

Meeting notes:
{{notes}}

Output format:
## Action Items
| # | Task | Owner | Due Date | Priority |
|---|------|-------|----------|----------|

## Key Decisions
Bullet list of decisions made

## Open Questions
Items that need follow-up or more information

Rules:
- Be specific — vague tasks like "follow up" must include what to follow up on
- If no owner is mentioned, tag as [Unassigned]
- If no deadline is mentioned, tag as [TBD]
- Priority: High / Medium / Low based on context`,
    tags: ["Productivity", "Writing", "AI"],
    author: AUTHORS[6],
    createdAt: "1 week ago",
    upvotes: 98,
    runsCount: 377,
    rating: 4.4,
    ratingCount: 11,
    isPublic: true,
    isTrending: false,
    isBookmarked: false,
    runs: [
      makeRun(
        "r9",
        "p7",
        AUTHORS[3],
        "GPT-4o Mini",
        `notes: "Sync with marketing. Sara to write launch copy by Friday. Alex needs to finish the landing page, probably next week. Still deciding on pricing — need to loop in finance. Chris is handling social media scheduling."`,
        `## Action Items\n| # | Task | Owner | Due Date | Priority |\n|---|------|-------|----------|----------|\n| 1 | Write launch email and landing page copy | Sara | Friday | High |\n| 2 | Complete landing page build | Alex | Next week | High |\n| 3 | Schedule social media posts for launch | Chris | TBD | Medium |\n| 4 | Finalize pricing tiers — loop in Finance team | Unassigned | TBD | High |\n\n## Key Decisions\n- Launch copy and landing page are parallel workstreams\n- Social media scheduling assigned to Chris\n\n## Open Questions\n- What is the final pricing structure? Finance needs to be consulted.\n- What is the official launch date to lock in all deadlines?`,
        "6 days ago",
      ),
    ],
  },
  {
    id: "p8",
    title: "SEO meta description generator 🔍",
    description:
      "Writes click-worthy, keyword-optimized meta descriptions under 160 characters for any page.",
    body: `You are an SEO specialist and conversion copywriter.

Write 3 variations of an SEO meta description for the following page.

Page title: {{page_title}}
Primary keyword: {{keyword}}
Secondary keywords: {{secondary_keywords}}
Page purpose: {{purpose}}

Requirements for each variation:
- Under 160 characters
- Include the primary keyword naturally
- Has a clear value proposition or hook
- Ends with an implicit or explicit CTA
- Avoid keyword stuffing or robotic phrasing

Output each variation on a new line with its character count.`,
    tags: ["SEO", "Marketing", "Copywriting"],
    author: AUTHORS[0],
    createdAt: "3 days ago",
    upvotes: 87,
    runsCount: 298,
    rating: 4.3,
    ratingCount: 9,
    isPublic: true,
    isTrending: false,
    isBookmarked: false,
    runs: [
      makeRun(
        "r10",
        "p8",
        AUTHORS[2],
        "GPT-4o Mini",
        `page_title: "Best Project Management Software for Remote Teams"\nkeyword: "project management software"\npurpose: "SaaS landing page"`,
        `**Variation 1** (142 chars)\nThe best project management software for remote teams. Real-time collaboration, smart deadlines, and zero micromanagement. Try it free.\n\n**Variation 2** (138 chars)\nTired of missed deadlines? Our project management software keeps remote teams aligned without the chaos. Start your free trial today.\n\n**Variation 3** (155 chars)\nRemote teams run smoother with the right project management software. Assign tasks, track progress, and ship faster — free for 14 days.`,
        "2 days ago",
      ),
    ],
  },
];

export const TOP_TAGS = [
  { label: "Coding", count: "1.2k" },
  { label: "Writing", count: "987" },
  { label: "Marketing", count: "743" },
  { label: "Research", count: "612" },
  { label: "Productivity", count: "521" },
  { label: "Data Analysis", count: "421" },
  { label: "Education", count: "312" },
  { label: "Other", count: "201" },
];
