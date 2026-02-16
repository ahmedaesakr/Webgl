# Agent Skills Reference Guide

> **For Claude:** This guide documents all available skills and when to invoke them. The cardinal rule from `using-superpowers`: **If there is even a 1% chance a skill applies, you MUST invoke it.**

**Last updated:** 2026-02-16
**Total skills available:** 245

---

## Part 1: Core Workflow — The Obra Superpowers Chain

These are **process skills** — they determine HOW you approach work. Always invoke process skills before implementation skills.

### The Standard Workflow

```
User request
    |
    v
[using-superpowers] -- Check: does ANY skill apply? (even 1%)
    |
    v
[brainstorming] -- Explore idea, ask questions, propose approaches, get design approved
    |
    v
[writing-plans] -- Turn approved design into bite-sized implementation plan
    |
    v
[using-git-worktrees] -- Create isolated workspace for implementation
    |
    v
[subagent-driven-development] OR [executing-plans] -- Execute the plan
    |  (uses per-task: [test-driven-development], [requesting-code-review])
    |  (uses when blocked: [systematic-debugging], [dispatching-parallel-agents])
    |  (uses before completion claims: [verification-before-completion])
    v
[finishing-a-development-branch] -- Verify tests, merge/PR/keep/discard
```

---

### 1. `using-superpowers`
**When:** At the START of every task, before any response.
**What it does:** Establishes the rule that you must check for applicable skills before doing anything. Invoke relevant skills BEFORE even asking clarifying questions.
**Key rule:** If you think "this is too simple for a skill" — STOP. That's rationalization. Check anyway.

### 2. `brainstorming`
**When:** Before ANY creative work — creating features, building components, adding functionality, modifying behavior.
**What it does:** Collaborative dialogue to explore user intent, requirements, and design. Ask questions one at a time. Propose 2-3 approaches. Get design approved before touching code.
**Hard gate:** Do NOT write any code until design is approved.
**Output:** Design doc saved to `docs/plans/YYYY-MM-DD-<topic>-design.md`.
**Next step:** Always invokes `writing-plans`.

### 3. `writing-plans`
**When:** After brainstorming is complete and design is approved. You have a spec/requirements for a multi-step task.
**What it does:** Creates a comprehensive bite-sized implementation plan. Each step is one action (2-5 minutes). Includes exact file paths, complete code, exact commands with expected output.
**Output:** Plan saved to `docs/plans/YYYY-MM-DD-<feature-name>.md`.
**Principles:** DRY, YAGNI, TDD, frequent commits.
**Next step:** Offers choice between subagent-driven or parallel session execution.

### 4. `using-git-worktrees`
**When:** Before executing any implementation plan. Creates isolated workspace.
**What it does:** Creates git worktree with smart directory selection (checks `.worktrees/` > `worktrees/` > `CLAUDE.md` > ask user). Verifies directory is gitignored. Runs project setup. Verifies clean test baseline.
**Safety:** MUST verify worktree directory is in `.gitignore` before creating.

### 5. `executing-plans`
**When:** You have a written plan and want to execute it in batches with human review checkpoints.
**What it does:** Load plan, review critically, execute in batches of 3 tasks, report for review between batches.
**Flow:** Load plan → Execute batch → Report → Get feedback → Next batch → Finish with `finishing-a-development-branch`.
**Key rule:** Stop and ask when blocked. Don't guess.

### 6. `subagent-driven-development`
**When:** You have a plan with mostly independent tasks and want to execute in the current session with fresh subagents.
**What it does:** Dispatches one fresh subagent per task. Each task gets: implement → spec compliance review → code quality review. Two-stage review catches issues early.
**vs executing-plans:** Same session (no context switch), fresh subagent per task (no context pollution), faster iteration.
**Key rule:** Never dispatch multiple implementation subagents in parallel. Sequential tasks, parallel reviews forbidden.

### 7. `test-driven-development`
**When:** Implementing ANY feature or bugfix. Before writing implementation code.
**What it does:** Enforces RED-GREEN-REFACTOR cycle. Write failing test → verify it fails → write minimal code → verify it passes → refactor.
**Iron law:** No production code without a failing test first. Wrote code first? Delete it. Start over.

### 8. `systematic-debugging`
**When:** Encountering ANY bug, test failure, or unexpected behavior.
**What it does:** Four-phase systematic approach: Root Cause Investigation → Pattern Analysis → Hypothesis & Testing → Implementation.
**Iron law:** No fixes without root cause investigation first. If 3+ fixes fail, question the architecture.
**Key rule:** Random fixes waste time. Find root cause BEFORE attempting fixes.

### 9. `dispatching-parallel-agents`
**When:** Facing 2+ independent tasks that can be worked on without shared state.
**What it does:** Dispatches one agent per independent problem domain. All work concurrently.
**Use for:** 3+ test files failing with different root causes, multiple independent subsystems broken.
**Don't use when:** Failures are related, need full system context, agents would edit same files.

### 10. `verification-before-completion`
**When:** About to claim ANY work is complete, fixed, or passing. Before committing or creating PRs.
**What it does:** Enforces evidence-before-claims. Run the verification command, read the output, THEN make the claim.
**Iron law:** No completion claims without fresh verification evidence. Using "should", "probably", "seems to" = red flag.

### 11. `requesting-code-review`
**When:** After completing tasks, implementing major features, or before merging.
**What it does:** Dispatches code-reviewer subagent with git SHAs to review changes. Fix Critical issues immediately, Important issues before proceeding.

### 12. `receiving-code-review`
**When:** Receiving code review feedback from reviewer subagents or humans.
**What it does:** Guides how to process and respond to review feedback constructively.

### 13. `finishing-a-development-branch`
**When:** Implementation is complete, all tests pass, ready to integrate.
**What it does:** Verify tests → Present 4 options (merge locally, create PR, keep as-is, discard) → Execute chosen workflow → Clean up worktree.
**Key rule:** Never proceed with failing tests. Always verify before offering options.

---

## Part 2: Skill Categories — When to Use What

### Three.js / WebGL (This Project)

| Skill | When to Use |
|-------|-------------|
| `threejs-fundamentals` | Scene setup, cameras, renderer, Object3D hierarchy, coordinate systems |
| `threejs-geometry` | Creating shapes — BoxGeometry, PlaneGeometry, CylinderGeometry, custom BufferGeometry |
| `threejs-materials` | PBR materials, MeshStandardMaterial properties, roughness, metalness, emissive |
| `threejs-lighting` | AmbientLight, PointLight, SpotLight, shadows, light helpers |
| `threejs-animation` | Keyframe animation, AnimationMixer, morph targets, skeletal animation |
| `threejs-interaction` | Raycasting, PointerLockControls, OrbitControls, drag controls |
| `threejs-shaders` | GLSL, ShaderMaterial, uniforms, vertex/fragment shaders |
| `threejs-postprocessing` | EffectComposer, bloom, SSAO, depth of field, custom passes |
| `threejs-textures` | Texture types, UV mapping, texture loading, repeat/wrap |
| `threejs-loaders` | GLTF/GLB loading, texture loading, asset management |

**For this museum project:** You'll commonly need `threejs-fundamentals`, `threejs-geometry`, `threejs-materials`, `threejs-lighting`, `threejs-shaders`, and `threejs-postprocessing`.

---

### Frontend Design & UI

| Skill | When to Use |
|-------|-------------|
| `frontend-design` | Creating distinctive, production-grade frontend designs |
| `ui-ux-pro-max` | UI/UX design intelligence — 50 styles, 21 patterns |
| `web-design-guidelines` | Reviewing UI code against Web Interface Guidelines |
| `tailwind-patterns` | Production-ready Tailwind CSS patterns |
| `tailwind-v4-shadcn` | Tailwind v4 with shadcn/ui setup |
| `motion` | React animations with Motion (Framer Motion) |
| `auto-animate` | Zero-config animations for React/Vue/Svelte |
| `responsive-images` | Performant responsive image implementation |
| `color-palette` | Generating complete, accessible color palettes |
| `icon-design` | Selecting semantically appropriate icons |
| `accessibility` | WCAG 2.1 AA compliant websites |
| `data-visualization` | Chart selection, D3, Recharts |

---

### React & State Management

| Skill | When to Use |
|-------|-------------|
| `zustand-state-management` | Type-safe global state in React |
| `react-hook-form-zod` | Type-safe validated forms |
| `tanstack-query` | Server state management |
| `tanstack-router` | Type-safe file-based routing |
| `tanstack-start` | Full-stack React apps |
| `tanstack-table` | Headless data tables |
| `vercel-composition-patterns` | React composition patterns that scale |
| `vercel-react-best-practices` | React/Next.js performance optimization |

---

### Next.js & Vercel

| Skill | When to Use |
|-------|-------------|
| `nextjs` | Building Next.js 16 apps with App Router, Server Components |
| `next-best-practices` | File conventions, data fetching, caching |
| `next-cache-components` | PPR, `use cache`, dynamic IO |
| `next-upgrade` | Upgrading Next.js to latest version |
| `vercel-blob` | File uploads and storage |
| `vercel-kv` | Redis-compatible KV storage |

---

### React Native & Expo

| Skill | When to Use |
|-------|-------------|
| `react-native-expo` | React Native 0.76+ apps with Expo |
| `expo-api-routes` | API routes in Expo |
| `expo-cicd-workflows` | EAS workflow configurations |
| `expo-deployment` | Deploying to App Store/Play Store |
| `expo-dev-client` | Development client builds |
| `expo-tailwind-setup` | Tailwind CSS v4 in Expo |
| `upgrading-expo` | SDK version upgrades |
| `use-dom` | Expo DOM components for web code |
| `building-native-ui` | Beautiful native app UIs |
| `vercel-react-native-skills` | React Native best practices for Vercel |

---

### Authentication & Security

| Skill | When to Use |
|-------|-------------|
| `better-auth` | Self-hosted auth for TypeScript/Cloudflare |
| `better-auth-best-practices` | Better Auth integration patterns |
| `better-auth-security-best-practices` | Security hardening for Better Auth |
| `clerk-auth` | Clerk auth with API Keys |
| `firebase-auth` | Firebase Authentication |
| `azure-auth` | Microsoft Entra ID (Azure AD) |
| `oauth-integrations` | OAuth 2.0 flows |
| `create-auth-skill` | Creating auth layers in TypeScript |
| `email-and-password-best-practices` | Email/password auth security |
| `two-factor-authentication-best-practices` | 2FA implementation |
| `organization-best-practices` | Multi-tenant org management |

---

### Cloudflare

| Skill | When to Use |
|-------|-------------|
| `cloudflare-worker-base` | Setting up Workers with Hono routing |
| `cloudflare-agents` | AI agents with Cloudflare Agents SDK |
| `cloudflare-d1` | Serverless SQLite database |
| `cloudflare-durable-objects` | Stateful real-time objects |
| `cloudflare-kv` | Global key-value storage |
| `cloudflare-r2` | S3-compatible object storage |
| `cloudflare-queues` | Async message queues |
| `cloudflare-workflows` | Durable workflows |
| `cloudflare-vectorize` | Semantic search with embeddings |
| `cloudflare-workers-ai` | LLMs/AI on Cloudflare GPU |
| `cloudflare-images` | Image storage and transformation |
| `cloudflare-browser-rendering` | Headless Chrome with Puppeteer |
| `cloudflare-hyperdrive` | Connect Workers to PostgreSQL/MySQL |
| `cloudflare-turnstile` | Bot protection (CAPTCHA alternative) |
| `cloudflare-python-workers` | Python APIs on Workers |

---

### Backend & Databases

| Skill | When to Use |
|-------|-------------|
| `fastapi` | Python APIs with Pydantic validation |
| `flask` | Python web apps |
| `hono-routing` | Type-safe APIs on Cloudflare |
| `drizzle-orm-d1` | Type-safe D1 databases |
| `neon-vercel-postgres` | Serverless Postgres |
| `supabase-postgres-best-practices` | Postgres optimization |
| `django-cloud-sql-postgres` | Django on Google App Engine |
| `google-app-engine` | Python apps on GAE |
| `snowflake-platform` | Snowflake AI Data Cloud |
| `streamlit-snowflake` | Streamlit apps on Snowflake |
| `firebase-firestore` | Firestore NoSQL database |
| `firebase-storage` | Firebase Cloud Storage |

---

### AI & LLM Integration

| Skill | When to Use |
|-------|-------------|
| `ai-sdk-core` | Backend AI with Vercel AI SDK v6 |
| `ai-sdk-ui` | React chat interfaces with AI SDK |
| `claude-agent-sdk` | Autonomous AI agents with Claude |
| `claude-api` | Claude Messages API |
| `openai-api` | OpenAI stateless APIs |
| `openai-agents` | OpenAI Agents SDK |
| `openai-assistants` | Stateful chatbots with OpenAI |
| `openai-responses` | Agentic AI with Responses API |
| `openai-apps-mcp` | ChatGPT apps with MCP servers |
| `google-gemini-api` | Gemini API with @google/genai |
| `google-gemini-embeddings` | RAG with Gemini embeddings |
| `google-gemini-file-search` | Document Q&A with Gemini |
| `ai-rag-pipeline` | RAG pipelines |
| `ai-automation-workflows` | Multi-model AI workflows |
| `ai-content-pipeline` | Multi-step content creation |
| `llm-models` | Access 100+ AI models via inference.sh |
| `prompt-engineering` | Master prompt design |
| `elevenlabs-agents` | Conversational AI voice agents |

---

### MCP (Model Context Protocol)

| Skill | When to Use |
|-------|-------------|
| `mcp-builder` | Creating high-quality MCP servers |
| `mcp-cli-scripts` | CLI scripts alongside MCP servers |
| `mcp-oauth-cloudflare` | OAuth for MCP servers on Cloudflare |
| `typescript-mcp` | TypeScript MCP servers |
| `fastmcp` | Python MCP servers with FastMCP |

---

### Testing

| Skill | When to Use |
|-------|-------------|
| `test-driven-development` | ANY feature or bugfix (RED-GREEN-REFACTOR) |
| `vitest` | Fast unit/integration tests |
| `testing-library` | React component testing |
| `testing-patterns` | Agent-based declarative testing with YAML |
| `webapp-testing` | Interacting with and testing web apps |
| `playwright-local` | Browser automation and web scraping |

---

### AI Media Generation

| Skill | When to Use |
|-------|-------------|
| `ai-image-generation` | FLUX, Gemini, Grok image generation |
| `flux-image` | FLUX models (Black Forest Labs) |
| `image-gen` | Website images with Gemini 3 |
| `image-to-video` | Still-to-video conversion |
| `image-upscaling` | Real-ESRGAN upscaling |
| `background-removal` | BiRefNet background removal |
| `ai-video-generation` | Google Veo, Seed videos |
| `ai-avatar-video` | AI avatar/talking head videos |
| `ai-marketing-videos` | Marketing video creation |
| `google-veo` | Google Veo video generation |
| `ai-music-generation` | Diffrythm music generation |
| `ai-podcast-creation` | AI-powered podcasts |
| `ai-voice-cloning` | Voice generation and TTS |
| `text-to-speech` | DIA text-to-speech |
| `speech-to-text` | Whisper transcription |
| `dialogue-audio` | Multi-speaker dialogue audio |
| `remotion-best-practices` | Programmatic video with Remotion |

---

### Document Generation

| Skill | When to Use |
|-------|-------------|
| `docx` | Generate/edit Word documents |
| `xlsx` | Generate/edit Excel spreadsheets |
| `pptx` | Generate/edit PowerPoint presentations |
| `pdf` | Generate/edit PDF files |
| `office` | General Office document generation |

---

### Marketing & Content

| Skill | When to Use |
|-------|-------------|
| `copywriting` | Writing/rewriting marketing copy |
| `copy-editing` | Editing and reviewing text |
| `content-strategy` | Planning content strategy |
| `content-repurposing` | Atomizing content across formats |
| `marketing-ideas` | Marketing inspiration |
| `marketing-psychology` | Psychological persuasion in marketing |
| `landing-page-design` | Conversion-optimized landing pages |
| `email-design` | Email marketing layouts |
| `email-sequence` | Email sequence optimization |
| `email-gateway` | Multi-provider email sending |
| `linkedin-content` | LinkedIn post writing |
| `social-content` | Social media content |
| `social-media-carousel` | Instagram/LinkedIn carousels |
| `twitter-automation` | Twitter/X automation |
| `twitter-thread-creation` | Twitter thread writing |
| `newsletter-curation` | Newsletter content sourcing |
| `product-marketing-context` | Product marketing docs |
| `product-hunt-launch` | Product Hunt launch strategy |
| `launch-strategy` | Product launch planning |
| `pricing-strategy` | Pricing decisions |
| `paid-ads` | Paid advertising |
| `referral-program` | Referral program design |
| `free-tool-strategy` | Free tool marketing |
| `product-changelog` | Release notes writing |
| `press-release-writing` | AP style press releases |
| `case-study-writing` | B2B case studies |
| `technical-blog-writing` | Technical blog posts |
| `internal-comms` | Internal communications |

---

### SEO & Analytics

| Skill | When to Use |
|-------|-------------|
| `seo-audit` | Website SEO audit |
| `seo-content-brief` | SEO content briefs |
| `seo-meta` | Meta tags for every page |
| `schema-markup` | Structured data markup |
| `programmatic-seo` | SEO-driven page generation |
| `analytics-tracking` | Analytics setup |
| `audit-website` | Full website audit (SEO, perf, security) |
| `ab-test-setup` | A/B test planning |

---

### CRO (Conversion Rate Optimization)

| Skill | When to Use |
|-------|-------------|
| `form-cro` | Form optimization |
| `page-cro` | Page conversion optimization |
| `popup-cro` | Popup optimization |
| `onboarding-cro` | Post-signup optimization |
| `signup-flow-cro` | Signup flow optimization |
| `paywall-upgrade-cro` | Paywall/upgrade optimization |

---

### Design & Branding

| Skill | When to Use |
|-------|-------------|
| `brand-guidelines` | Anthropic brand colors/typography |
| `logo-design-guide` | Logo design with AI generation |
| `og-image-design` | Open Graph / social sharing images |
| `favicon-gen` | Favicon generation |
| `canvas-design` | Visual art in .png/.svg |
| `book-cover-design` | Book cover design |
| `character-design-sheet` | Character consistency sheets |
| `pitch-deck-visuals` | Investor pitch deck slides |
| `app-store-screenshots` | App Store screenshot design |
| `youtube-thumbnail-design` | YouTube thumbnail design |
| `product-photography` | AI product photography |
| `ai-product-photography` | Professional product photos |
| `video-ad-specs` | Platform-specific video ad specs |
| `video-prompting-guide` | Video generation prompting |
| `explainer-video-guide` | Explainer video production |
| `storyboard-creation` | Film/video storyboarding |
| `talking-head-production` | Talking head video production |
| `slack-gif-creator` | Animated GIF creation |
| `algorithmic-art` | p5.js algorithmic art |

---

### Agent Development

| Skill | When to Use |
|-------|-------------|
| `agent-development` | Custom Claude Code agents |
| `agent-browser` | Browser automation for AI agents |
| `agent-tools` | 150+ AI apps via inference.sh |
| `ts-agent-sdk` | Typed TypeScript SDKs for agents |
| `sub-agent-patterns` | Sub-agent patterns in Claude Code |

---

### Skills Meta (Creating & Managing Skills)

| Skill | When to Use |
|-------|-------------|
| `skill-creator` | Designing new Claude Code skills |
| `skill-development` | Creating, auditing, maintaining skills |
| `skill-review` | Systematic 9-phase skill audit |
| `writing-skills` | Creating/editing skill files |
| `related-skill` | Discovering related skills to install |
| `template-skill` | Template for new skills |

---

### Project Management

| Skill | When to Use |
|-------|-------------|
| `project-planning` | Structured planning docs |
| `project-health` | AI-agent readiness auditing |
| `project-session-management` | Session progress tracking |
| `project-workflow` | Nine integrated slash commands |
| `dependency-audit` | Dependency health auditing |
| `open-source-contributions` | Maintainer-friendly PRs |
| `developer-toolbox` | Essential dev workflow agents |
| `deep-debug` | Multi-agent investigation for stubborn bugs |

---

### CMS & Content Management

| Skill | When to Use |
|-------|-------------|
| `tinacms` | Git-backed headless CMS |
| `sveltia-cms` | Lightweight Git-backed CMS |
| `tiptap` | Rich text editors |

---

### Google Services

| Skill | When to Use |
|-------|-------------|
| `google-workspace` | Google Workspace integrations |
| `google-chat-api` | Google Chat bots/webhooks |
| `google-spaces-updates` | Google Chat Spaces updates |
| `google-veo` | Google Veo video generation |

---

### Misc Tools

| Skill | When to Use |
|-------|-------------|
| `firecrawl-scraper` | Website → LLM-ready data |
| `web-search` | Web search and content extraction |
| `web-artifacts-builder` | Elaborate web artifacts |
| `wordpress-plugin-core` | WordPress plugins |
| `electron-base` | Desktop apps with Electron |
| `jquery-4` | jQuery 3.x → 4.0 migration |
| `smtp2go-api` | Transactional email/SMS |
| `rocket-net-api` | Rocket.net WordPress hosting |
| `context-mate` | Context Mate toolkit |
| `competitor-alternatives` | Competitor alternative pages |
| `competitor-teardown` | Competitive analysis |
| `customer-persona` | Research-backed personas |
| `doc-coauthoring` | Structured writing workflow |
| `docs-workflow` | Documentation lifecycle |
| `javascript-sdk` | inference.sh JavaScript SDK |
| `python-sdk` | inference.sh Python SDK |
| `python-executor` | Sandboxed Python execution |
| `superpowers` | Entry point to superpowers system |
| `native-data-fetching` | Native data fetching patterns |

---

## Part 3: Decision Trees — Which Skill Do I Need?

### "I need to build something new"
```
brainstorming → writing-plans → [subagent-driven-development | executing-plans]
```

### "Something is broken"
```
systematic-debugging → (if root cause found) → test-driven-development → verification-before-completion
```

### "I have multiple independent problems"
```
dispatching-parallel-agents → (one agent per domain) → integrate results
```

### "I'm about to say 'done'"
```
verification-before-completion → (run command, read output) → THEN claim done
```

### "I need to work on a Three.js scene"
```
threejs-fundamentals (always) + specific skill:
  - Adding shapes? → threejs-geometry
  - PBR look? → threejs-materials
  - Lights/shadows? → threejs-lighting
  - Movement/transitions? → threejs-animation
  - Click/hover/controls? → threejs-interaction
  - Custom effects? → threejs-shaders
  - Bloom/SSAO/DOF? → threejs-postprocessing
  - Loading models? → threejs-loaders
  - UV mapping? → threejs-textures
```

### "I need authentication"
```
Self-hosted TypeScript? → better-auth
Managed service? → clerk-auth
Firebase? → firebase-auth
Microsoft/Azure? → azure-auth
OAuth flow? → oauth-integrations
Adding 2FA? → two-factor-authentication-best-practices
```

### "I need to deploy"
```
Cloudflare Workers? → cloudflare-worker-base
Vercel/Next.js? → nextjs + next-best-practices
Expo mobile? → expo-deployment
Google Cloud? → google-app-engine
```

---

## Part 4: Priority Rules

### Skill Invocation Order
1. **Process skills first** (brainstorming, systematic-debugging) — these determine HOW to approach
2. **Implementation skills second** (threejs-fundamentals, frontend-design) — these guide execution

### Red Flag Thoughts (from `using-superpowers`)
If you catch yourself thinking any of these, STOP — you're rationalizing:

- "This is just a simple question" — Questions are tasks. Check for skills.
- "I need more context first" — Skill check comes BEFORE clarifying questions.
- "Let me explore the codebase first" — Skills tell you HOW to explore.
- "This doesn't need a formal skill" — If a skill exists, use it.
- "I remember this skill" — Skills evolve. Read current version.
- "The skill is overkill" — Simple things become complex. Use it.
- "I'll just do this one thing first" — Check BEFORE doing anything.

### Skill Types
- **Rigid** (TDD, debugging, verification): Follow exactly. Don't adapt away discipline.
- **Flexible** (design patterns, frontend): Adapt principles to context.

The skill itself tells you which type it is.

---

## Part 5: Skills Relevant to This Museum Project

For the WebGL 3D Museum Portfolio, these skills are most commonly needed:

**Always active:**
- `using-superpowers` — skill invocation discipline
- `verification-before-completion` — evidence before claims

**Architecture & Planning:**
- `brainstorming` — before new rooms/features
- `writing-plans` — turning designs into implementation steps
- `executing-plans` or `subagent-driven-development` — executing those steps

**Three.js Implementation:**
- `threejs-fundamentals` — scene structure, coordinate system
- `threejs-geometry` — room walls, floors, display pedestals
- `threejs-materials` — PBR dark museum aesthetic
- `threejs-lighting` — ambient, point lights, spotlights for artwork
- `threejs-shaders` — portal effect, custom materials
- `threejs-postprocessing` — bloom, vignette, SSAO
- `threejs-animation` — door transitions, floating objects
- `threejs-interaction` — pointer lock, raycasting for clickable items
- `threejs-textures` — floor/wall textures, artwork images

**Frontend:**
- `frontend-design` — HUD overlay, glass-card panels
- `motion` — CSS/React animations for UI elements
- `zustand-state-management` — if state complexity grows

**Quality:**
- `test-driven-development` — for utility functions, collision logic
- `systematic-debugging` — when things go wrong
- `dispatching-parallel-agents` — parallel room implementation

**Deployment:**
- `nextjs` or relevant deploy skill when ready to ship
