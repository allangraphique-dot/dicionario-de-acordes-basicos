import React from 'react';
import { ChordNote, NOTES } from '../constants';
import { motion } from 'motion/react';

interface GuitarFretboardProps {
  notes: ChordNote[];
  chordName: string;
  viewMode: 'notes' | 'intervals';
}

const GuitarFretboard: React.FC<GuitarFretboardProps> = ({ notes, chordName, viewMode }) => {
  const minFret = Math.min(...notes.map(n => n.fret));
  const maxFret = Math.max(...notes.map(n => n.fret));
  
  // We want to show at least 5 frets, starting from at least fret 1
  const startFret = Math.max(1, minFret === 0 ? 1 : minFret);
  const fretCount = Math.max(5, maxFret - startFret + 1);
  const frets = Array.from({ length: fretCount }, (_, i) => startFret + i);
  const strings = [1, 2, 3, 4, 5, 6];

  const getNoteName = (fret: number, string: number) => {
    // String base notes (0-indexed in NOTES): E=4, B=11, G=7, D=2, A=9, E=4
    const stringBaseNotes: Record<number, number> = {
      1: 4, // E
      2: 11, // B
      3: 7, // G
      4: 2, // D
      5: 9, // A
      6: 4, // E
    };
    const baseNoteIndex = stringBaseNotes[string];
    const noteIndex = (baseNoteIndex + fret) % 12;
    return NOTES[noteIndex];
  };

  const getNoteLabel = (note: ChordNote) => {
    if (viewMode === 'intervals') return note.interval;
    return getNoteName(note.fret, note.string);
  };

  return (
    <div id="chord-diagram" className="p-4 md:p-8 rounded-xl border overflow-hidden" style={{ backgroundColor: '#151515', borderColor: '#222', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#e0e0e0' }}>{chordName}</h2>
      </div>

      <div className="relative overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent">
        <div className="min-w-max flex justify-center px-4">
          {/* Fretboard Container */}
          <div className="relative flex flex-col items-center">
            
            {/* Fret Numbers */}
            <div className="flex w-full mb-2">
              {frets.map((fret) => (
                <div key={fret} className="flex-1 text-center text-[10px] font-mono uppercase tracking-tighter" style={{ color: '#888' }}>
                  Fret {fret}
                </div>
              ))}
            </div>

            {/* The Grid */}
            <div className="relative flex">
              {/* Nut (Pestana) */}
              {startFret === 1 && (
                <div 
                  className="absolute left-0 z-10" 
                  style={{ 
                    width: '6px', 
                    height: '192px', 
                    backgroundColor: '#444',
                    borderRadius: '2px',
                    transform: 'translateX(-3px)',
                    boxShadow: '2px 0 5px rgba(0,0,0,0.5)'
                  }} 
                />
              )}

              {/* Frets */}
              <div className="flex border-r" style={{ borderColor: '#444' }}>
                {frets.map((fret) => (
                  <div 
                    key={fret} 
                    className="w-16 h-48 border-l relative flex items-center justify-center"
                    style={{ borderColor: '#444' }}
                  >
                    {/* Fret Markers */}
                    {[3, 5, 7, 9, 12, 15, 17, 19, 21].includes(fret) && (
                      <div className="absolute w-3 h-3 rounded-full opacity-40" style={{ backgroundColor: '#666' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Strings */}
              <div className="absolute inset-0 flex flex-col justify-between py-0">
                {strings.map((str) => (
                  <div 
                    key={str} 
                    className="w-full relative"
                    style={{ 
                      height: `${1 + (6 - str) * 0.5}px`,
                      opacity: 1,
                      background: 'linear-gradient(to right, #444, #888, #444)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.9)'
                    }}
                  />
                ))}
              </div>

              {/* Notes */}
              {notes.map((note, idx) => {
                const fretIndex = note.fret - startFret;
                
                // Position calculation
                // Each fret is 64px wide (w-16)
                // Each string is spaced equally in h-48
                let left = 0;
                if (note.fret === 0) {
                  // Position open strings to the left of the first fret line
                  left = -24;
                } else {
                  left = (fretIndex * 64) + 32;
                }
                
                const top = (note.string - 1) * (192 / 5);

                return (
                  <motion.div
                    key={`${note.string}-${note.fret}-${idx}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: idx * 0.05 }}
                    className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[11px] font-mono font-bold z-20 transition-transform hover:scale-110`}
                    style={{ 
                      left: `${left}px`, 
                      top: `${top}px`,
                      backgroundColor: note.isRoot ? '#ff4444' : '#2a2a2a',
                      color: note.isRoot ? '#ffffff' : '#ccc',
                      border: note.isRoot ? '1px solid rgba(255,255,255,0.4)' : '1px solid #333',
                      boxShadow: note.isRoot ? '0 0 15px rgba(255, 68, 68, 0.5)' : '0 4px 10px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {getNoteLabel(note)}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-10 flex justify-center gap-8 text-[10px] font-mono uppercase tracking-widest" style={{ color: '#888' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: '#ff4444', boxShadow: '0 0 10px rgba(255, 68, 68, 0.4)' }} />
          <span>Tônica</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-[#333]" style={{ backgroundColor: '#2a2a2a' }} />
          <span>{viewMode === 'notes' ? 'Nota' : 'Intervalo'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-[#444]" style={{ backgroundColor: '#2a2a2a' }} />
          <span>Solta</span>
        </div>
      </div>
    </div>
  );
};

export default GuitarFretboard;
