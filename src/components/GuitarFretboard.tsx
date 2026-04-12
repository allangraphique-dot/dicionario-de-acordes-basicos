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
  
  const showNut = minFret <= 2;
  const startFret = showNut ? 1 : minFret;
  const fretCount = Math.max(5, maxFret - startFret + 1);
  const frets = Array.from({ length: fretCount }, (_, i) => startFret + i);
  const strings = [1, 2, 3, 4, 5, 6];

  const getNoteName = (fret: number, string: number) => {
    const stringBaseNotes: Record<number, number> = {
      1: 4, 2: 11, 3: 7, 4: 2, 5: 9, 6: 4,
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
    <div id="chord-diagram" className="p-4 md:p-8 rounded-2xl border bg-[#0a0a0a] border-[#1a1a1a] shadow-2xl">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-lg md:text-3xl font-bold tracking-tight text-[#e0e0e0] uppercase font-mono">{chordName}</h2>
      </div>

      {/* Horizontal Fretboard (Desktop/Landscape) */}
      <div className="hidden md:block relative overflow-x-auto pb-6 scrollbar-hide">
        <div className="min-w-max flex justify-center px-8">
          <div className="relative flex flex-col items-center">
            <div className="flex w-full mb-3">
              {frets.map((fret) => (
                <div key={fret} className="text-center text-[9px] font-mono uppercase tracking-widest text-[#444] w-[64px]">
                  {fret}
                </div>
              ))}
            </div>
            <div className="relative flex">
              {showNut && (
                <div className="absolute left-0 z-10 bg-[#333] rounded-sm shadow-[2px_0_5px_rgba(0,0,0,0.5)] w-[4px] h-[192px] -translateX-1/2" style={{ transform: 'translateX(-2px)' }} />
              )}
              <div className="flex border-r border-[#1a1a1a]">
                {frets.map((fret) => (
                  <div key={fret} className="border-l border-[#1a1a1a] relative flex items-center justify-center w-[64px] h-[192px]">
                    {[3, 5, 7, 9, 15, 17, 19, 21].includes(fret) && <div className="absolute w-2 h-2 rounded-full bg-[#1a1a1a]" />}
                    {fret === 12 && (
                      <div className="absolute flex flex-col gap-8">
                        <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
                        <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col justify-between py-0 pointer-events-none">
                {strings.map((str) => (
                  <div key={str} className="w-full relative opacity-80 shadow-[0_1px_2px_rgba(0,0,0,0.8)]" style={{ height: `${1 + (6 - str) * 0.4}px`, background: 'linear-gradient(to bottom, #333, #555, #333)' }} />
                ))}
              </div>
              {notes.map((note, idx) => {
                const fretIndex = note.fret - startFret;
                const left = note.fret === 0 ? -16 : (fretIndex * 64) + 32;
                const top = (note.string - 1) * (192 / 5);
                return (
                  <motion.div
                    key={`${note.string}-${note.fret}-${idx}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25, delay: idx * 0.03 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[11px] font-mono font-bold z-20 shadow-lg"
                    style={{ 
                      width: '32px', height: '32px', left: `${left}px`, top: `${top}px`,
                      backgroundColor: note.isRoot ? '#ff4444' : '#222',
                      color: note.isRoot ? '#fff' : '#aaa',
                      border: note.isRoot ? '2px solid rgba(255,255,255,0.3)' : '1px solid #333',
                      boxShadow: note.isRoot ? '0 0 15px rgba(255, 68, 68, 0.4)' : '0 4px 10px rgba(0, 0, 0, 0.6)'
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

      {/* Vertical Fretboard (Mobile Portrait) */}
      <div className="md:hidden flex justify-center py-4">
        <div className="relative flex">
          {/* Fret Numbers (Left side) */}
          <div className="flex flex-col mr-4">
            <div className="h-4" /> {/* Spacer for nut */}
            {frets.map((fret) => (
              <div key={fret} className="h-[50px] flex items-center justify-end text-[10px] font-mono text-[#444] uppercase tracking-tighter">
                {fret}
              </div>
            ))}
          </div>

          {/* The Grid */}
          <div className="relative flex flex-col">
            {/* Nut */}
            {showNut && (
              <div className="w-[150px] h-[6px] bg-[#333] rounded-sm shadow-[0_2px_5px_rgba(0,0,0,0.5)] mb-[-3px] z-10" />
            )}
            
            <div className="flex border-b border-[#1a1a1a]">
              {strings.map((str) => (
                <div key={str} className="w-[30px] border-l border-[#1a1a1a] relative flex flex-col">
                  {frets.map((fret) => (
                    <div key={fret} className="h-[50px] border-b border-[#1a1a1a] relative flex items-center justify-center">
                      {str === 3 && [3, 5, 7, 9, 15, 17, 19, 21].includes(fret) && <div className="absolute w-2 h-2 rounded-full bg-[#1a1a1a]" />}
                      {(str === 2 || str === 5) && fret === 12 && <div className="absolute w-2 h-2 rounded-full bg-[#1a1a1a]" />}
                    </div>
                  ))}
                </div>
              ))}
              <div className="w-0 border-r border-[#1a1a1a]" />
            </div>

            {/* Strings (Vertical) */}
            <div className="absolute inset-0 flex justify-between px-0 pointer-events-none">
              {strings.map((str) => (
                <div key={str} className="h-full relative opacity-80 shadow-[1px_0_2px_rgba(0,0,0,0.8)]" style={{ width: `${1 + (6 - str) * 0.4}px`, background: 'linear-gradient(to right, #333, #555, #333)', marginLeft: '14px' }} />
              ))}
            </div>

            {/* Notes (Vertical) */}
            {notes.map((note, idx) => {
              const fretIndex = note.fret - startFret;
              const left = (note.string - 1) * 30 + 15;
              const top = note.fret === 0 ? -12 : (fretIndex * 50) + 25 + (showNut ? 3 : 0);
              return (
                <motion.div
                  key={`${note.string}-${note.fret}-${idx}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25, delay: idx * 0.03 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[10px] font-mono font-bold z-20 shadow-lg"
                  style={{ 
                    width: '26px', height: '26px', left: `${left}px`, top: `${top}px`,
                    backgroundColor: note.isRoot ? '#ff4444' : '#222',
                    color: note.isRoot ? '#fff' : '#aaa',
                    border: note.isRoot ? '2px solid rgba(255,255,255,0.3)' : '1px solid #333',
                    boxShadow: note.isRoot ? '0 0 15px rgba(255, 68, 68, 0.4)' : '0 4px 10px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  {getNoteLabel(note)}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-x-6 md:gap-x-8 gap-y-3 text-[8px] md:text-[9px] font-mono uppercase tracking-[0.2em] text-[#444]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#ff4444] shadow-[0_0_8px_rgba(255,68,68,0.4)]" />
          <span>Tônica</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#222] border border-[#333]" />
          <span>{viewMode === 'notes' ? 'Nota' : 'Intervalo'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#222] border-2 border-[#444]" />
          <span>Corda Solta</span>
        </div>
      </div>
    </div>
  );
};

export default GuitarFretboard;
