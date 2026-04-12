import { 
  CAGED_SHAPES, 
  CAGEDShape, 
  ChordExtension, 
  ChordNote, 
  ChordType, 
  NOTES 
} from '../constants';

export function getRootFret(key: string, shape: CAGEDShape): number {
  const keyIndex = NOTES.indexOf(key);
  
  // Standard tuning open strings: E(0), A(0), D(0), G(0), B(0), E(0)
  // Root string for each shape:
  // C: 5th string (A string)
  // A: 5th string (A string)
  // G: 6th string (E string)
  // E: 6th string (E string)
  // D: 4th string (D string)
  
  let rootStringIndex = 0;
  let openNoteIndex = 0;
  
  switch (shape) {
    case 'C':
    case 'A':
      rootStringIndex = 5; // A string
      openNoteIndex = NOTES.indexOf('A');
      break;
    case 'G':
    case 'E':
      rootStringIndex = 6; // E string
      openNoteIndex = NOTES.indexOf('E');
      break;
    case 'D':
      rootStringIndex = 4; // D string
      openNoteIndex = NOTES.indexOf('D');
      break;
  }
  
  let fret = keyIndex - openNoteIndex;
  if (fret < 0) fret += 12;
  
  // Adjust for specific CAGED shape root positions
  // C shape root is 3 frets above the "base" fret of the shape
  // A shape root is 0 frets above
  // G shape root is 3 frets above
  // E shape root is 0 frets above
  // D shape root is 0 frets above
  
  if (shape === 'C' || shape === 'G') {
    // For C and G, the root we calculated is the actual root fret.
    // But the shape starts lower.
    return fret;
  }
  
  return fret;
}

export function calculateChordNotes(
  key: string,
  type: ChordType,
  extension: ChordExtension,
  shape: CAGEDShape
): ChordNote[] {
  const baseNotes = JSON.parse(JSON.stringify(CAGED_SHAPES[shape][type][extension])) as ChordNote[];
  const rootFret = getRootFret(key, shape);
  
  // Offset to the correct key
  // For C shape, the root is at fret 3 of the shape.
  // For G shape, the root is at fret 3 of the shape.
  let offset = 0;
  if (shape === 'C' || shape === 'G') {
    offset = rootFret - 3;
  } else {
    offset = rootFret;
  }
  
  // Ensure we don't go below fret 0
  if (offset < 0) offset += 12;

  return baseNotes.map(note => {
    return { ...note, fret: note.fret + offset };
  });
}
