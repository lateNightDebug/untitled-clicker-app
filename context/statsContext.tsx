import { user_clicker } from "@/lib/db";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import * as storage from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/storage";
import { useAuth } from "./AuthContext";

type StatsContextType = {
  // base_value: number | 1,
  // multiplier: number | 1.1,
  // luck: number |5,
  // score: number | 0,
  // refresh: number | 3000,
  // upgraded: boolean |false,
  // auto: {
  //   enabled: boolean | false,
  //   auto_refresh: number | 5000,
  //   unlocked: boolean | false, 
  // }
  playerStats: user_clicker | null;
  loadData: () => Promise<void>;
  setData: (playerStats: user_clicker) => Promise<void>;
};

const testStats: user_clicker = {
  base_value: 1,
  multiplier: 1.1,
  luck: 5,
  score: 0,
  refresh: 3000,
  upgraded: false,
  auto: {
    enabled: false,
    auto_refresh: 5000,
    unlocked: true,
    },
}

const StatsContext = createContext<StatsContextType | null>(
  {playerStats: testStats,
    loadData(),
    setData(playerStats)
  } 
);

export function AppProvider({ children }: {children: ReactNode}) {
  const [playerStats, setplayerStats] = useState<user_clicker | null>(null
    // {base_value: 1,
    // multiplier: 1.1,
    // luck: 5,
    // score: 100,
    // refresh: 3000,
    // upgraded: false,
    // auto: {
    //   enabled: false,
    //   auto_refresh: 5000,
    //   unlocked: true,
    // }},
  );

  useEffect(() => {
      
        storage.get<user_clicker>(STORAGE_KEYS.CLICKER_STATS)
        .then(( data) => {
        setplayerStats(data);
        console.log(data)
      })
      .catch(() => {
        setplayerStats(null);
      })
      .finally(() => {
        console.log("success! ", playerStats)
      });
     
      
    }, []);
  
  

    //functions
    async function loadData(id:string) {
      const saved = await storage.get<user_clicker>(STORAGE_KEYS.CLICKER_STATS);
      console.log(saved);
      setplayerStats(saved)
      }
    
    async function setData(playerStats: user_clicker) {
      const saved = await storage.set(STORAGE_KEYS.CLICKER_STATS, playerStats);
      console.log(saved);
      
      }
    
          
  return (
    <StatsContext.Provider 
    value={{
      playerStats: playerStats ?? null,
      loadData,
      setData,
    
      }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be called inside <StatsProvider>");
  }
  return context;
};
