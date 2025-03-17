import { create } from 'zustand';

const useStore = create((set) => ({
  selectedProperty: null,
  setProperty: (property) => set({ selectedProperty: property }),
}));

export default useStore;