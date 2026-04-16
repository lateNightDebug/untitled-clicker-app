
// outdated version of db callers. newer version on another branch, to be implemented at a later date.
// ─────────────────────────────────────────────────────────────────────────────
// db.ts — All Supabase database queries for untitled clicker app
//
// Tables queried here:
//   stats         — the user's score and clicker modifiers
//   auto_clicker  — the user's auto-clicker status
// ─────────────────────────────────────────────────────────────────────────────
import { supabase } from "./supabase";

// ── Types ─────────────────────────────────────────────────────────────────────

// A row from the stats table
type stats = {
  //stats_id: string;
  //value of each button click
  base_value: number;
  //how much that base value gets multiplied if the click is "lucky"
  multiplier: number;
  //determines if a click is lucky by setting a percentage and compairing a random gen number against the users stat
  luck: number;
  //score stores users score, can be spent on upgrades page.
  score: number;
  //how long a user has to wait before the button can be clicked again (this can be upgraded).
  refresh: number;
};

// A row from the auto clicker table
type auto_clicker = {
  //auto_id: string;
  //is it unlocked?
  unlocked: boolean;
  //is auto Click turned on or off
  enabled: boolean;
  //time between auto clicker clicks.
  auto_refresh: number;
};

// what the clicker receives as user data, stats and joined auto-clicker row
export type user_clicker = {
  //stats_id: string,
  base_value: number;
  multiplier: number;
  luck: number;
  score: number;
  refresh: number;
  auto: auto_clicker;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

// currently none

// ── Query Functions ───────────────────────────────────────────────────────────

/**
 * getUserClicker
 * Fetches user stats and auto-clicker status
 *
 * Used by:
 */
export const getUserClicker = async (
  user_id: string,
): Promise<user_clicker[]> => {
  const { data, error } = await supabase
    // "enrollments" → the name of the TABLE we are querying
    .from("stats")
    // .select() → choose which columns to return (like SELECT in SQL)
    // Columns listed at the top level come from the enrollments table.
    // "courses ( ... )" is a nested select — Supabase sees that enrollments.course_id
    // is a foreign key pointing to courses.id and automatically JOINs the two tables.
    // Columns listed inside courses ( ... ) come from the courses table.
    .select(
      `
      id,
      base_value,
      multiplier,
      luck,
      score,
      refresh,
      auto (
        id,
        unlocked,
        enabled,
        refresh
      )
    `,
    )
    // .eq() → WHERE user_id = userId  (only return rows that belong to this user)
    // RLS also enforces this at the database level — this is belt-and-suspenders.
    .eq("user_id", user_id)
    // .order() → ORDER BY created_at ASC  (show courses in the order they were enrolled)
    .order("created_at");

  if (error) throw error;

  // Supabase returns enrollments with a nested courses object.
  // We flatten both into one object so screens don't have to dig into row.courses.title.
  console.log("db connect", data);
  return (data as unknown as user_clicker[]).map((row) => ({
    //stats_id: row.stats_id,           // from stats table
    base_value: row.base_value, // from stats table
    multiplier: row.multiplier, // from stats table
    luck: row.luck, // from stats table
    score: row.score, // from stats table
    refresh: row.refresh, // from stats table
    auto: row.auto, // spreads id, unlocked, enabled, auto_refresh from auto_clicker table
  }));
};
