
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
  id: string;
  //link to auto_clicker
  auto_id: string;
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
  //is auto-click unlocked?
  unlocked: boolean;
  //is auto-click turned on or off
  enabled: boolean;
  //time between auto clicker clicks.
  auto_refresh: number;
}

// what the clicker receives as user data, stats and joined auto-clicker row
export type user_clicker =  {
  base_value: number;
  multiplier: number;
  luck: number;
  score: number;
  refresh: number;
  auto_unlocked: boolean;
  auto_enabled: boolean;
  auto_refresh: number;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * addNewUser
 * @param user_id
 * inserts a new row into tables on user creation
 * 
 */
// export const addNewUser = async (user_id: string) => {
  
//   const { error } = await supabase
//   .from('stats')
//   .insert(use)

//   if (error) throw error;
//}

// ── Query Functions ───────────────────────────────────────────────────────────

/**
 * 
 * @param u
 * @returns 
 */

/**
 * getUserClicker
 * Fetches user stats and auto-clicker status
 *
 * Used by: 
 */
export const getUserClicker = async (user_id: string): Promise<user_clicker> => {
  const { data, error } = await supabase
    // "enrollments" → the name of the TABLE we are querying
    .from("stats")
    // .select() → choose which columns to return (like SELECT in SQL)
    // Columns listed at the top level come from the stats table.
    // "auto ( ... )" is a nested select — Supabase sees that enrollments.course_id
    // is a foreign key pointing to courses.id and automatically JOINs the two tables.
    // Columns listed inside courses ( ... ) come from the courses table.
    .select(`
      id,
      base_value,
      multiplier,
      luck,
      score,
      refresh,
      auto_unlocked,
      auto_enabled,
      auto_refresh
      )
    `)
    // .eq() → WHERE user_id = userId  (only return rows that belong to this user)
    // RLS also enforces this at the database level — this is belt-and-suspenders.
    .eq("user_id", user_id)
    
    // .order() → ORDER BY created_at ASC  (show courses in the order they were enrolled)
    .order("created_at");

  if (error) throw error;
  const dataArray = (data as unknown as user_clicker[]).map((row)=>({
    base_value: row.base_value,     // from stats table
    multiplier: row.multiplier,     // from stats table
    luck: row.luck,                 // from stats table
    score: row.score,               // from stats table
    refresh: row.refresh,           // from stats table
    auto_enabled: row.auto_enabled, // spreads id, unlocked, enabled, auto_refresh from auto_clicker table
    auto_unlocked: row.auto_unlocked,
    auto_refresh: row.auto_refresh
  }));
  console.log("data is: ",data)
  const clicker: user_clicker = {
    base_value: dataArray[0].base_value,
    multiplier: dataArray[0].multiplier,
    luck: dataArray[0].luck,
    score: dataArray[0].score,
    refresh: dataArray[0].refresh,
    auto_unlocked: dataArray[0].auto_unlocked,
    auto_enabled: dataArray[0].auto_enabled,
    auto_refresh: dataArray[0].auto_refresh
  }
  console.log(" clicker: ", clicker)
  return(clicker)
  // Supabase returns enrollments with a nested auto-clicker object.
  // We flatten both into one object so screens don't have to dig into row.courses.title.
  // return (data as unknown as user_clicker).map((row) => ({
  //   //stats_id: row.stats_id,           // from stats table
  
  // }));
};

