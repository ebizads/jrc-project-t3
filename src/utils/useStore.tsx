import { create } from "zustand";

type LoadState = {
    loadState: string;
    degState: string;
    setLoadState: React.Dispatch<React.SetStateAction<string>>;
    setDegState: React.Dispatch<React.SetStateAction<string>>;
};

export const useMinimizeStore = create<LoadState>((set) => ({
    loadState: "COMMERCIAL POWER",
    degState: "GENERATING",
    setLoadState: () => set((state) => ({ loadState: "" + state })),
    setDegState: () => set((state) => ({ degState: "" + state })),
}));
