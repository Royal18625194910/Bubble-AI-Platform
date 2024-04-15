import { getApiLimit } from "@/lib/api-limit";
import { create } from "zustand";

interface freeCounterStoreProps {
  apiLimitCount: number;
  isPro: boolean;
  getApiLimit: () => void;
  setApiLimitCount: (count: number) => void;
  setIsPro: (isPro: boolean) => void;
}

export default create<freeCounterStoreProps>((set) => ({
  apiLimitCount: 0,
  isPro: false,
  getApiLimit: async () => {
    const res = await getApiLimit();
    console.log("getApiLimit", res);
  },
  setApiLimitCount: (apiLimitCount) => {
    set({ apiLimitCount });
  },
  setIsPro: (isPro) => set({ isPro }),
}));
