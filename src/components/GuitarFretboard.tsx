import React from 'react';
import { ChordNote } from '../constants';
import { motion } from 'motion/react';

interface GuitarFretboardProps {
  notes: ChordNote[];
  chordName: string;
}

const GuitarFretboard: React.FC<GuitarFretboardProps> = ({ notes, chordName }) => {
  const minFret = Math.min(...notes.map(n => n.fret));
  const maxFret = Math.max(...notes.map(n => n.fret));
  
  // We want to show at least 5 frets, starting from at least fret 1
  const startFret = Math.max(1, minFret === 0 ? 1 : minFret);
  const fretCount = Math.max(5, maxFret - startFret + 1);
  const frets = Array.from({ length: fretCount }, (_, i) => startFret + i);
  const strings = [1, 2, 3, 4, 5, 6];

  return (
    <div id="chord-diagram" className="p-8 rounded-xl border overflow-hidden" style={{ backgroundColor: '#18181b', borderColor: '#27272a', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight" style={{ color: '#fafafa' }}>{chordName}</h2>
      </div>

      <div className="relative flex justify-center">
        {/* Fretboard Container */}
        <div className="relative flex flex-col items-center">
          
          {/* Fret Numbers */}
          <div className="flex w-full mb-2">
            {frets.map((fret) => (
              <div key={fret} className="flex-1 text-center text-xs font-mono" style={{ color: '#71717a' }}>
                {fret}
              </div>
            ))}
          </div>

          {/* The Grid */}
          <div className="relative flex">
            {/* Frets */}
            <div className="flex border-r" style={{ borderColor: '#3f3f46' }}>
              {frets.map((fret) => (
                <div 
                  key={fret} 
                  className="w-16 h-48 border-l relative flex items-center justify-center"
                  style={{ borderColor: '#3f3f46' }}
                >
                  {/* Fret Markers */}
                  {[3, 5, 7, 9, 12, 15, 17, 19, 21].includes(fret) && (
                    <div className="absolute w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: '#27272a' }} />
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
                    opacity: 0.8,
                    backgroundColor: '#a1a1aa',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {/* String Label (optional) */}
                  {/* <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 uppercase">
                    {['E', 'B', 'G', 'D', 'A', 'E'][str-1]}
                  </div> */}
                </div>
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
                  className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-xs font-bold z-20`}
                  style={{ 
                    left: `${left}px`, 
                    top: `${top}px`,
                    backgroundColor: note.isRoot ? '#f97316' : '#fafafa',
                    color: note.isRoot ? '#ffffff' : '#18181b',
                    border: note.isRoot ? '2px solid white' : (note.fret === 0 ? '2px solid #71717a' : 'none'),
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {note.interval}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex justify-center gap-6 text-xs" style={{ color: '#a1a1aa' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: '#f97316' }} />
          <span>Tônica (Root)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#fafafa' }} />
          <span>Outras Notas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border-2 border-zinc-500" style={{ backgroundColor: '#fafafa' }} />
          <span>Corda Solta</span>
        </div>
      </div>
    </div>
  );
};

export default GuitarFretboard;
