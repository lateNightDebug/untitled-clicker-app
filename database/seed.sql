--seed data for supabase users

insert into stats (id, user_id, base_value, multiplier, luck, score, refresh, auto_unlocked, auto_enabled, auto_refresh) values
  (
    'bbbbbbbb-0000-0000-0000-000000000001',
    'ceaddf80-7fdc-45fa-a056-124b51a4baa9',
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