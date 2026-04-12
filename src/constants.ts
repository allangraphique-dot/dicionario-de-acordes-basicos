export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export type ChordType = 'Major' | 'Minor' | 'Dominant';
export type ChordExtension = 'Triad' | 'Tetrad';
export type CAGEDShape = 'C' | 'A' | 'G' | 'E' | 'D';

export interface ChordNote {
  string: number; // 1-6 (1 is high E)
  fret: number;
  interval: string;
  isRoot: boolean;
}

export interface ChordDefinition {
  name: string;
  shape: CAGEDShape;
  notes: ChordNote[];
}

// Relative positions for CAGED shapes (Major)
// These are offsets from the root note's fret
// String 1: High E, String 6: Low E
export const CAGED_MAJOR_SHAPES: Record<CAGEDShape, ChordNote[]> = {
  C: [
    { string: 5, fret: 3, interval: '1', isRoot: true },
    { string: 4, fret: 2, interval: '3', isRoot: false },
    { string: 3, fret: 0, interval: '5', isRoot: false },
    { string: 2, fret: 1, interval: '1', isRoot: true },
    { string: 1, fret: 0, interval: '3', isRoot: false },
  ],
  A: [
    { string: 5, fret: 0, interval: '1', isRoot: true },
    { string: 4, fret: 2, interval: '5', isRoot: false },
    { string: 3, fret: 2, interval: '1', isRoot: true },
    { string: 2, fret: 2, interval: '3', isRoot: false },
    { string: 1, fret: 0, interval: '5', isRoot: false },
  ],
  G: [
    { string: 6, fret: 3, interval: '1', isRoot: true },
    { string: 5, fret: 2, interval: '3', isRoot: false },
    { string: 4, fret: 0, interval: '5', isRoot: false },
    { string: 3, fret: 0, interval: '1', isRoot: true },
    { string: 2, fret: 0, interval: '3', isRoot: false },
    { string: 1, fret: 3, interval: '1', isRoot: true },
  ],
  E: [
    { string: 6, fret: 0, interval: '1', isRoot: true },
    { string: 5, fret: 2, interval: '5', isRoot: false },
    { string: 4, fret: 2, interval: '1', isRoot: true },
    { string: 3, fret: 1, interval: '3', isRoot: false },
    { string: 2, fret: 0, interval: '5', isRoot: false },
    { string: 1, fret: 0, interval: '1', isRoot: true },
  ],
  D: [
    { string: 4, fret: 0, interval: '1', isRoot: true },
    { string: 3, fret: 2, interval: '5', isRoot: false },
    { string: 2, fret: 3, interval: '1', isRoot: true },
    { string: 1, fret: 2, interval: '3', isRoot: false },
  ],
};

// We will calculate the other types (Minor, Dominant, Tetrads) by modifying the Major shapes
// b3: -1 fret from 3
// b7: -2 frets from 1 (or -1 from 7, but we start from Major)
// 7: -1 fret from 1
