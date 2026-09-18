import { create } from "zustand";

import { DEMO_CHOCOLATES } from "@/data/demo-chocolates";
import { createEmptyBox } from "@/lib/box-factory";
import { DEFAULT_BOX_SIZE } from "@/lib/constants";
import type {
  BoxSize,
  CardConfiguration,
  Chocolate,
  ChocolateId,
  Customization,
  LogoConfiguration,
  PackagingPreferences,
  RibbonConfiguration,
} from "@/types";
import { createDefaultCustomization } from "@/types";

interface BoxStoreState {
  boxSize: BoxSize;
  slots: ReturnType<typeof createEmptyBox>["slots"];
  quantity: number;
  catalog: Chocolate[];
  selectedChocolateId: ChocolateId | null;
  focusedSlotIndex: number | null;
  customization: Customization;
  setBoxSize: (size: BoxSize) => void;
  setSlotChocolate: (slotIndex: number, chocolateId: ChocolateId | null) => void;
  setQuantity: (quantity: number) => void;
  setSelectedChocolate: (id: ChocolateId | null) => void;
  setFocusedSlotIndex: (index: number | null) => void;
  clearSlot: (slotIndex: number) => void;
  updateLogo: (partial: Partial<LogoConfiguration>) => void;
  updateRibbon: (partial: Partial<RibbonConfiguration>) => void;
  updateCard: (partial: Partial<CardConfiguration>) => void;
  updatePackaging: (partial: Partial<PackagingPreferences>) => void;
  setLogoUrl: (url: string | null) => void;
}

export const useBoxStore = create<BoxStoreState>((set, get) => ({
  boxSize: DEFAULT_BOX_SIZE,
  slots: createEmptyBox(DEFAULT_BOX_SIZE).slots,
  quantity: 1,
  catalog: DEMO_CHOCOLATES,
  selectedChocolateId: null,
  focusedSlotIndex: null,
  customization: createDefaultCustomization(),

  setBoxSize: (size) =>
    set({
      boxSize: size,
      slots: createEmptyBox(size).slots,
      focusedSlotIndex: null,
    }),

  setSlotChocolate: (slotIndex, chocolateId) =>
    set((state) => ({
      slots: state.slots.map((slot) =>
        slot.index === slotIndex ? { ...slot, chocolateId } : slot,
      ),
    })),

  setQuantity: (quantity) => set({ quantity: Math.max(1, quantity) }),

  setSelectedChocolate: (id) => set({ selectedChocolateId: id }),

  setFocusedSlotIndex: (index) => set({ focusedSlotIndex: index }),

  clearSlot: (slotIndex) => {
    get().setSlotChocolate(slotIndex, null);
    set({ focusedSlotIndex: slotIndex });
  },

  updateLogo: (partial) =>
    set((state) => ({
      customization: {
        ...state.customization,
        logo: { ...state.customization.logo, ...partial },
      },
    })),

  updateRibbon: (partial) =>
    set((state) => ({
      customization: {
        ...state.customization,
        ribbon: { ...state.customization.ribbon, ...partial },
      },
    })),

  updateCard: (partial) =>
    set((state) => ({
      customization: {
        ...state.customization,
        card: { ...state.customization.card, ...partial },
      },
    })),

  updatePackaging: (partial) =>
    set((state) => ({
      customization: {
        ...state.customization,
        packaging: { ...state.customization.packaging, ...partial },
      },
    })),

  setLogoUrl: (url) => get().updateLogo({ url }),
}));

/** Convenience selector for the full configuration shape. */
export function getBoxConfigurationFromStore(state: BoxStoreState) {
  const box = createEmptyBox(state.boxSize);
  return {
    box: { ...box, slots: state.slots },
    customization: state.customization,
    quantity: state.quantity,
  };
}
