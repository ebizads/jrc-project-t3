import { create } from "zustand";

type CommercialPowerState = {
    commercialPower: string | null
    setCommercialPower: (commercialPower: string) => void
}

export const useCommercialPowerStore = create<CommercialPowerState>((set) => ({
    commercialPower: null,
    setCommercialPower: (commercialPowerValue: string) => set({ commercialPower: commercialPowerValue }),
}))

type FuelLevelState = {
    fuelLevel: string | null
    setFuelLevel: (fuelLevel: string) => void
}

export const useFuelLevelStore = create<FuelLevelState>((set) => ({
    fuelLevel: null,
    setFuelLevel: (fuelLevelValue: string) => set({ fuelLevel: fuelLevelValue }),
}))
// type LoadState = {
//     loadState: string;
//     degState: string;
//     setLoadState: React.Dispatch<React.SetStateAction<string>>;
//     setDegState: React.Dispatch<React.SetStateAction<string>>;
// };

// export const useMinimizeStore = create<LoadState>((set) => ({
//     loadState: "COMMERCIAL POWER",
//     degState: "GENERATING",
//     setLoadState: () => set((state) => ({ loadState: "" + state })),
//     setDegState: () => set((state) => ({ degState: "" + state })),
// }));
