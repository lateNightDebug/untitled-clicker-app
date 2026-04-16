-- ─────────────────────────────────────────────────────────────────────────────
-- untitled clicker app: Supabase Database Schema
-- ─────────────────────────────────────────────────────────────────────────────
--
-- Tables:
--    stats: user clicker score and clicker modifiers
--
-- RLS:
--   All tables require authentication.
--   All tables: users only see their own rows (user_id = auth.uid())
-- ─────────────────────────────────────────────────────────────────────────────


-- ── 1. stats ────────────────────────────────────────────────────────────────
-- one row per user
-- stores user score and modifiers

create table if not exists stats (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  base_value  float not null default 1.0,           
  multiplier  float not null default 1.1,           
  luck        float not null default 5,
  score       float not null default 0,           
  refresh     float not null default 3000,   
  auto_unlocked      boolean default false,
  auto_enabled       boolean default false,
  auto_refresh       float not null default 5000,        
  created_at  timestamptz not null default now()
);



-- ─────────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable RLS on every table
alter table stats         enable row level security;



-- stats: users can only read their own stats rows
create policy "Users can read own stats"
  on stats
  for select
  to authenticated
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- Real-Time
-- Supabase requires explicit publication for real-time to work on a table.
-- Run this after creating the tables.
-- Currently disabled during development to avoid excessive calls
-- ─────────────────────────────────────────────────────────────────────────────

-- Allow real-time events on stats and auto-click changes propagate live
-- alter publication supabase_realtime add table stats;
-- alter publication supabase_realtime add table auto_click;
