import { create } from "zustand";
import { createZusSelector } from "../createZusSelector";

type State = {
  show: boolean;
  show2: boolean;
  show3: boolean;
  show4: boolean;
};

type Actions = {
  showModal: () => void;
  hideModal: () => void;
  showModal2: () => void;
  hideModal2: () => void;
  showModal3: () => void;
  hideModal3: () => void;
  showModal4: () => void;
  hideModal4: () => void;
};

const useModalBase = create<State & Actions>((set) => ({
  show: false,
  show2: false,
  show3: false,
  show4: false,
  showModal: () => set(() => ({ show: true })),
  hideModal: () => set(() => ({ show: false })),
  showModal2: () => set(() => ({ show2: true })),
  hideModal2: () => set(() => ({ show2: false })),
  showModal3: () => set(() => ({ show3: true })),
  hideModal3: () => set(() => ({ show3: false })),
  showModal4: () => set(() => ({ show4: true })),
  hideModal4: () => set(() => ({ show4: false })),
}));

export const useModal = createZusSelector(useModalBase);
