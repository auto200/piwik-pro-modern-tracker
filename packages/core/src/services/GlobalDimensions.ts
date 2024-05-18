import { Dimensions } from '../types';

export type GlobalDimensions = {
  setCustomDimensionValue: (customDimensionId: number, value: string) => void;

  deleteCustomDimension: (customDimensionId: number) => void;

  getCustomDimensionValue: (customDimensionId: number) => string | undefined;

  getAll: () => Dimensions;

  clearAll: () => void;
};

export function GlobalDimensions(): GlobalDimensions {
  let dimensions: Dimensions = {};

  return {
    setCustomDimensionValue: (customDimensionId, value) => {
      // NOTE: maybe throw an error?
      if (customDimensionId < 1) return;

      dimensions[customDimensionId] = value;
    },

    deleteCustomDimension: (customDimensionId) => {
      delete dimensions[customDimensionId];
    },

    getCustomDimensionValue: (customDimensionId) => {
      return dimensions[customDimensionId];
    },

    getAll: () => ({ ...dimensions }),

    clearAll: () => {
      dimensions = {};
    },
  };
}
