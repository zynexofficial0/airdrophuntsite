# Airdrop Hunt

A premium community-powered Web3 discovery platform for crypto airdrops, guides, and articles. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Features

- **Homepage** with hero, featured airdrops, latest articles, stats, ecosystem logos, and CTAs
- **Airdrops listing** with search, status/chain/category filters, and load-more pagination
- **Airdrop detail pages** with full info, participation steps, social links, related airdrops, and disclaimer
- **Articles listing** with search, category filters, and sorting
- **Article detail pages** with formatted content, share buttons, tags, and related articles
- **Submit Article form** with working image upload to Supabase Storage
- **Submit Airdrop form** with working logo upload to Supabase Storage
- **Premium 3D green-black theme** with glassmorphism, glow effects, floating 3D visuals, and tilt cards
- **Responsive** mobile-first design
- **Slug-based routing** with SEO metadata and Open Graph support

## Tech Stack

- Next.js 15 (App Router)
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Supabase (database + storage)
- React Hook Form + Zod
- Lucide icons

## Environment Variables

The following are pre-configured in `.env`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database Schema

### `submitted_articles`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| article_title | text | |
| excerpt | text | |
| author | text | |
| category | text | |
| article_content | text | |
| article_logo_url | text | |
| tags | text | nullable |
| status | text | pending / approved / rejected |
| featured | boolean | default false |
| slug | text | unique |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `submitted_airdrops`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| project_name | text | |
| short_description | text | |
| full_description | text | |
| participation_steps | text | |
| category | text | |
| chain | text | |
| reward_info | text | |
| start_date | date | nullable |
| end_date | date | nullable |
| website_url | text | nullable |
| twitter_url | text | nullable |
| telegram_url | text | nullable |
| discord_url | text | nullable |
| logo_url | text | |
| submitter_name | text | |
| status | text | live / upcoming / ended / pending |
| featured | boolean | default false |
| slug | text | unique |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `categories`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | text | unique |
| type | text | article / airdrop / both |
| created_at | timestamptz | |

## Storage Buckets

Two public buckets are created automatically via migration:
- `article-logos` — article thumbnails/logos
- `airdrop-logos` — airdrop project logos

Both accept PNG, JPG, JPEG, WEBP up to 4MB. Public read and insert policies are configured.

## RLS Policies

- **Articles**: public SELECT (pending + approved visible), public INSERT
- **Airdrops**: public SELECT (all statuses visible), public INSERT
- **Categories**: public SELECT, public INSERT
- **Storage**: public read + upload for both buckets

## Setup

1. Environment variables are pre-populated — no manual config needed.
2. Database schema, RLS policies, and storage buckets are applied via migration.
3. Sample data (5 airdrops, 4 articles, 10 categories) is seeded.

## What's Fully Implemented (v1)

- Homepage with dynamic featured/latest content from database
- Airdrops listing with client-side search and filters
- Airdrop detail pages with slug routing
- Articles listing with search, filters, and sorting
- Article detail pages with slug routing
- Submit article form with working image upload
- Submit airdrop form with working logo upload
- Supabase database persistence
- Supabase Storage integration with preview and validation
- Success/error toast notifications
- Responsive premium green-black 3D UI

## Admin-Ready (Future)

The schema supports future admin features via `status` and `featured` fields:
- Approve/reject article and airdrop submissions
- Mark content as featured
- Edit/delete content
- Moderation dashboard
- Supabase auth for user accounts, my submissions, and profiles
