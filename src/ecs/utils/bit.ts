export class BitUtils {
  static isBitSet(value: number, bit: number): boolean {
    return (value & bit) !== 0;
  }
  static setBit(value: number, bit: number): number {
    return value | bit;
  }
  static clearBit(value: number, bit: number): number {
    return value & ~bit;
  }
  static toggleBit(value: number, bit: number): number {
    return value ^ bit;
  }
  static areAllBitsSet(value: number, mask: number): boolean {
    return (value & mask) === mask;
  }
  static areAnyBitsSet(value: number, mask: number): boolean {
    return (value & mask) !== 0;
  }
}
