import { user_clicker } from "@/lib/db";
import { createContext, useState } from "react";

//currentyly unused. created to assist in passing user stats between clicker page and upgrades.
//future devolpment includes using this to pull in user data from supabase
type StatsContext = {
  playerStats: user_clicker;
  setplayerStats: (playerStats: user_clicker) => Promise<void>;
};

export const StatsContext = createContext<StatsContext | null>(null);

export const AppProvider = ({ children }: any) => {
  const [playerStats, setplayerStats] = useState<user_clicker | undefined>({
    base_value: 1,
    multiplier: 1.1,
    luck: 5,
    score: 0,
    refresh: 3000,
    auto: {
      enabled: false,
      auto_refresh: 5000,
      unlocked: true,
    },
  });
  return (
    <StatsContext.Provider value={{ playerStats, setplayerStats }}>
      {children}
    </StatsContext.Provider>
  );
};
