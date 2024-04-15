import { create } from 'zustand';

interface useProModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProModalStore = create<useProModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProModalStore
