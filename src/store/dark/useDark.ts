import { create } from "zustand";
import { createZusSelector } from "../createZusSelector";

type State = {
  dark: boolean;
};

type Actions = {
  toggleTheme: () => void;
};

const useDarkBase = create<State & Actions>((set) => ({
  dark: false,
  toggleTheme: () => set((state) => ({ dark: !state.dark })),
}));

export const useDark = createZusSelector(useDarkBase);
