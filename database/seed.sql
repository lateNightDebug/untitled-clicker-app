-- ─────────────────────────────────────────────────────────────────────────────
-- 
-- What this seeds:
-- user data to stats table
-- 
-- What is NOT seeded here:
--     these require real auth.users UUIDs.
--     After signing in to the app, copy your user UUID from
--     
-- ─────────────────────────────────────────────────────────────────────────────

-- ── stats ────────────────────────────────────────────────────────────────


insert into stats (id, user_id, auto_id, base_value, multiplier, luck, score, refresh, auto_unlocked, auto_enabled, auto_refresh) values
  (
    'bbbbbbbb-0000-0000-0000-000000000001',
    'ceaddf80-7fdc-45fa-a056-124b51a4baa9',
    'aaaaaaaa-0000-0000-0000-000000000001',
    1.0,
    1.1,
    5,
    0,
    3000,
    false,
    false,
    5000
  ),
  (
    'bbbbbbbb-0000-0000-0000-000000000002',
    'd0e07623-2b6f-4cc6-bb7d-b633bd51fd6e',
    'aaaaaaaa-0000-0000-0000-000000000002',
    1.0,
    1.1,
    5,
    0,
    3000,
    false,
    false,
    5000
  )

on conflict (id) do nothing;
