import { create } from "zustand";

import { DEMO_CHOCOLATES } from "@/data/demo-chocolates";
import { createEmptyBox } from "@/lib/box-factory";
import { DEFAULT_BOX_SIZE } from "@/lib/constants";
import type { BoxSize, Chocolate, ChocolateId } from "@/types";
import { createDefaultCustomization } from "@/types";

interface BoxStoreState {
  boxSize: BoxSize;
  slots: ReturnType<typeof createEmptyBox>["slots"];
  quantity: number;
  catalog: Chocolate[];
  setBoxSize: (size: BoxSize) => void;
  setSlotChocolate: (slotIndex: number, chocolateId: ChocolateId | null) => void;
  setQuantity: (quantity: number) => void;
}

export const useBoxStore = create<BoxStoreState>((set) => ({
  boxSize: DEFAULT_BOX_SIZE,
  slots: createEmptyBox(DEFAULT_BOX_SIZE).slots,
  quantity: 1,
  catalog: DEMO_CHOCOLATES,

  setBoxSize: (size) =>
    set({
      boxSize: size,
      slots: createEmptyBox(size).slots,
    }),

  setSlotChocolate: (slotIndex, chocolateId) =>
    set((state) => ({
      slots: state.slots.map((slot) =>
        slot.index === slotIndex ? { ...slot, chocolateId } : slot,
      ),
    })),

  setQuantity: (quantity) => set({ quantity: Math.max(1, quantity) }),
}));

/** Convenience selector for the full configuration shape. */
export function getBoxConfigurationFromStore(state: BoxStoreState) {
  const box = createEmptyBox(state.boxSize);
  return {
    box: { ...box, slots: state.slots },
    customization: createDefaultCustomization(),
    quantity: state.quantity,
  };
}
