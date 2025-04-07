export const bitUtils = {
  isBitSet: (value: number, bit: number): boolean => {
    return (value & bit) !== 0;
  },
  setBit: (value: number, bit: number): number => {
    return value | bit;
  },
  clearBit: (value: number, bit: number): number => {
    return value & ~bit;
  },
  toggleBit: (value: number, bit: number): number => {
    return value ^ bit;
  },
  areAllBitsSet: (value: number, mask: number): boolean => {
    return (value & mask) === mask;
  },
  areAnyBitsSet: (value: number, mask: number): boolean => {
    return (value & mask) !== 0;
  },
};
