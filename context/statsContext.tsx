import { user_clicker } from "@/lib/db";
import { createContext, useState } from "react";

type StatsContext = {
  base_value: number;
  multiplier: number;
  luck: number;
  score: number;
  refresh: number;
  auto: {
    enabled: boolean;
    auto_refresh: number;
    unlocked: boolean;
  };
};

export const StatsContext = createContext({
  base_value: 1,
  multiplier: 1.1,
  luck: 5,
  score: 0,
  refresh: 3000,
  auto: {
    enabled: false,
    auto_refresh: 5000,
    unlocked: true,
    setStats: (stats: user_clicker) => Promise<Void>;
  },
});

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
