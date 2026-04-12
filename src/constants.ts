export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export type ChordType = 'Major' | 'Minor' | 'Dominant';
export type ChordExtension = 'Triad' | 'Tetrad';
export type CAGEDShape = 'C' | 'A' | 'G' | 'E' | 'D';

export interface ChordNote {
  string: number; // 1-6 (1 is high E)
  fret: number;
  interval: string;
  isRoot: boolean;
  finger?: number; // 1-4
}

export interface ChordDefinition {
  name: string;
  shape: CAGEDShape;
  notes: ChordNote[];
}

// Chord definitions for CAGED shapes
// Each shape has a specific set of notes for each chord type and extension
export const CAGED_SHAPES: Record<CAGEDShape, Record<ChordType, Record<ChordExtension, ChordNote[]>>> = {
  C: {
    Major: {
      Triad: [
        { string: 5, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 4, fret: 2, interval: '3', isRoot: false, finger: 2 },
        { string: 3, fret: 0, interval: '5', isRoot: false },
        { string: 2, fret: 1, interval: '1', isRoot: true, finger: 1 },
        { string: 1, fret: 0, interval: '3', isRoot: false },
      ],
      Tetrad: [
        { string: 5, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 4, fret: 2, interval: '3', isRoot: false, finger: 2 },
        { string: 3, fret: 0, interval: '5', isRoot: false },
        { string: 2, fret: 0, interval: '7', isRoot: false },
        { string: 1, fret: 0, interval: '3', isRoot: false },
      ],
    },
    Minor: {
      Triad: [
        { string: 5, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 4, fret: 1, interval: 'b3', isRoot: false, finger: 1 },
        { string: 3, fret: 0, interval: '5', isRoot: false },
        { string: 2, fret: 1, interval: '1', isRoot: true, finger: 1 },
      ],
      Tetrad: [
        { string: 5, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 4, fret: 1, interval: 'b3', isRoot: false, finger: 1 },
        { string: 3, fret: 3, interval: 'b7', isRoot: false, finger: 4 },
        { string: 2, fret: 1, interval: '1', isRoot: true, finger: 1 },
      ],
    },
    Dominant: {
      Triad: [ // Dominant triad is just Major triad
        { string: 5, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 4, fret: 2, interval: '3', isRoot: false, finger: 2 },
        { string: 3, fret: 0, interval: '5', isRoot: false },
        { string: 2, fret: 1, interval: '1', isRoot: true, finger: 1 },
      ],
      Tetrad: [
        { string: 5, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 4, fret: 2, interval: '3', isRoot: false, finger: 2 },
        { string: 3, fret: 3, interval: 'b7', isRoot: false, finger: 4 },
        { string: 2, fret: 1, interval: '1', isRoot: true, finger: 1 },
      ],
    },
  },
  A: {
    Major: {
      Triad: [
        { string: 5, fret: 0, interval: '1', isRoot: true },
        { string: 4, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 3, fret: 2, interval: '1', isRoot: true, finger: 3 },
        { string: 2, fret: 2, interval: '3', isRoot: false, finger: 4 },
        { string: 1, fret: 0, interval: '5', isRoot: false },
      ],
      Tetrad: [
        { string: 5, fret: 0, interval: '1', isRoot: true },
        { string: 4, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 3, fret: 1, interval: '7', isRoot: false, finger: 1 },
        { string: 2, fret: 2, interval: '3', isRoot: false, finger: 3 },
        { string: 1, fret: 0, interval: '5', isRoot: false },
      ],
    },
    Minor: {
      Triad: [
        { string: 5, fret: 0, interval: '1', isRoot: true },
        { string: 4, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 3, fret: 2, interval: '1', isRoot: true, finger: 3 },
        { string: 2, fret: 1, interval: 'b3', isRoot: false, finger: 1 },
        { string: 1, fret: 0, interval: '5', isRoot: false },
      ],
      Tetrad: [
        { string: 5, fret: 0, interval: '1', isRoot: true },
        { string: 4, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 3, fret: 0, interval: 'b7', isRoot: false },
        { string: 2, fret: 1, interval: 'b3', isRoot: false, finger: 1 },
        { string: 1, fret: 0, interval: '5', isRoot: false },
      ],
    },
    Dominant: {
      Triad: [
        { string: 5, fret: 0, interval: '1', isRoot: true },
        { string: 4, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 3, fret: 2, interval: '1', isRoot: true, finger: 3 },
        { string: 2, fret: 2, interval: '3', isRoot: false, finger: 4 },
        { string: 1, fret: 0, interval: '5', isRoot: false },
      ],
      Tetrad: [
        { string: 5, fret: 0, interval: '1', isRoot: true },
        { string: 4, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 3, fret: 0, interval: 'b7', isRoot: false },
        { string: 2, fret: 2, interval: '3', isRoot: false, finger: 3 },
        { string: 1, fret: 0, interval: '5', isRoot: false },
      ],
    },
  },
  G: {
    Major: {
      Triad: [
        { string: 6, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 5, fret: 2, interval: '3', isRoot: false, finger: 2 },
        { string: 4, fret: 0, interval: '5', isRoot: false },
        { string: 3, fret: 0, interval: '1', isRoot: true },
        { string: 2, fret: 0, interval: '3', isRoot: false },
        { string: 1, fret: 3, interval: '1', isRoot: true, finger: 4 },
      ],
      Tetrad: [
        { string: 6, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 5, fret: 2, interval: '3', isRoot: false, finger: 2 },
        { string: 4, fret: 0, interval: '5', isRoot: false },
        { string: 3, fret: 0, interval: '1', isRoot: true },
        { string: 2, fret: 0, interval: '3', isRoot: false },
        { string: 1, fret: 2, interval: '7', isRoot: false, finger: 1 },
      ],
    },
    Minor: {
      Triad: [
        { string: 6, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 5, fret: 1, interval: 'b3', isRoot: false, finger: 1 },
        { string: 4, fret: 0, interval: '5', isRoot: false },
        { string: 3, fret: 0, interval: '1', isRoot: true },
        { string: 2, fret: 3, interval: '5', isRoot: false, finger: 4 },
        { string: 1, fret: 3, interval: '1', isRoot: true, finger: 4 },
      ],
      Tetrad: [
        { string: 6, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 5, fret: 1, interval: 'b3', isRoot: false, finger: 1 },
        { string: 4, fret: 3, interval: 'b7', isRoot: false, finger: 4 },
        { string: 3, fret: 0, interval: '1', isRoot: true },
        { string: 2, fret: 3, interval: '5', isRoot: false, finger: 4 },
        { string: 1, fret: 3, interval: '1', isRoot: true, finger: 4 },
      ],
    },
    Dominant: {
      Triad: [
        { string: 6, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 5, fret: 2, interval: '3', isRoot: false, finger: 2 },
        { string: 4, fret: 0, interval: '5', isRoot: false },
        { string: 3, fret: 0, interval: '1', isRoot: true },
        { string: 2, fret: 0, interval: '3', isRoot: false },
        { string: 1, fret: 3, interval: '1', isRoot: true, finger: 4 },
      ],
      Tetrad: [
        { string: 6, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 5, fret: 2, interval: '3', isRoot: false, finger: 2 },
        { string: 4, fret: 0, interval: '5', isRoot: false },
        { string: 3, fret: 0, interval: '1', isRoot: true },
        { string: 2, fret: 0, interval: '3', isRoot: false },
        { string: 1, fret: 1, interval: 'b7', isRoot: false, finger: 1 },
      ],
    },
  },
  E: {
    Major: {
      Triad: [
        { string: 6, fret: 0, interval: '1', isRoot: true },
        { string: 5, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 4, fret: 2, interval: '1', isRoot: true, finger: 3 },
        { string: 3, fret: 1, interval: '3', isRoot: false, finger: 1 },
        { string: 2, fret: 0, interval: '5', isRoot: false },
        { string: 1, fret: 0, interval: '1', isRoot: true },
      ],
      Tetrad: [
        { string: 6, fret: 0, interval: '1', isRoot: true },
        { string: 5, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 4, fret: 1, interval: '7', isRoot: false, finger: 1 },
        { string: 3, fret: 1, interval: '3', isRoot: false, finger: 1 },
        { string: 2, fret: 0, interval: '5', isRoot: false },
        { string: 1, fret: 0, interval: '1', isRoot: true },
      ],
    },
    Minor: {
      Triad: [
        { string: 6, fret: 0, interval: '1', isRoot: true },
        { string: 5, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 4, fret: 2, interval: '1', isRoot: true, finger: 3 },
        { string: 3, fret: 0, interval: 'b3', isRoot: false },
        { string: 2, fret: 0, interval: '5', isRoot: false },
        { string: 1, fret: 0, interval: '1', isRoot: true },
      ],
      Tetrad: [
        { string: 6, fret: 0, interval: '1', isRoot: true },
        { string: 5, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 4, fret: 0, interval: 'b7', isRoot: false },
        { string: 3, fret: 0, interval: 'b3', isRoot: false },
        { string: 2, fret: 0, interval: '5', isRoot: false },
        { string: 1, fret: 0, interval: '1', isRoot: true },
      ],
    },
    Dominant: {
      Triad: [
        { string: 6, fret: 0, interval: '1', isRoot: true },
        { string: 5, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 4, fret: 2, interval: '1', isRoot: true, finger: 3 },
        { string: 3, fret: 1, interval: '3', isRoot: false, finger: 1 },
        { string: 2, fret: 0, interval: '5', isRoot: false },
        { string: 1, fret: 0, interval: '1', isRoot: true },
      ],
      Tetrad: [
        { string: 6, fret: 0, interval: '1', isRoot: true },
        { string: 5, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 4, fret: 0, interval: 'b7', isRoot: false },
        { string: 3, fret: 1, interval: '3', isRoot: false, finger: 1 },
        { string: 2, fret: 0, interval: '5', isRoot: false },
        { string: 1, fret: 0, interval: '1', isRoot: true },
      ],
    },
  },
  D: {
    Major: {
      Triad: [
        { string: 4, fret: 0, interval: '1', isRoot: true },
        { string: 3, fret: 2, interval: '5', isRoot: false, finger: 1 },
        { string: 2, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 1, fret: 2, interval: '3', isRoot: false, finger: 2 },
      ],
      Tetrad: [
        { string: 4, fret: 0, interval: '1', isRoot: true },
        { string: 3, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 2, fret: 2, interval: '7', isRoot: false, finger: 2 },
        { string: 1, fret: 2, interval: '3', isRoot: false, finger: 2 },
      ],
    },
    Minor: {
      Triad: [
        { string: 4, fret: 0, interval: '1', isRoot: true },
        { string: 3, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 2, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 1, fret: 1, interval: 'b3', isRoot: false, finger: 1 },
      ],
      Tetrad: [
        { string: 4, fret: 0, interval: '1', isRoot: true },
        { string: 3, fret: 2, interval: '5', isRoot: false, finger: 3 },
        { string: 2, fret: 1, interval: 'b7', isRoot: false, finger: 1 },
        { string: 1, fret: 1, interval: 'b3', isRoot: false, finger: 1 },
      ],
    },
    Dominant: {
      Triad: [
        { string: 4, fret: 0, interval: '1', isRoot: true },
        { string: 3, fret: 2, interval: '5', isRoot: false, finger: 1 },
        { string: 2, fret: 3, interval: '1', isRoot: true, finger: 3 },
        { string: 1, fret: 2, interval: '3', isRoot: false, finger: 2 },
      ],
      Tetrad: [
        { string: 4, fret: 0, interval: '1', isRoot: true },
        { string: 3, fret: 2, interval: '5', isRoot: false, finger: 2 },
        { string: 2, fret: 1, interval: 'b7', isRoot: false, finger: 1 },
        { string: 1, fret: 2, interval: '3', isRoot: false, finger: 3 },
      ],
    },
  },
};
