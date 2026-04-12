/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  NOTES, 
  ChordType, 
  ChordExtension, 
  CAGEDShape 
} from './constants';
import { calculateChordNotes } from './lib/chordUtils';
import GuitarFretboard from './components/GuitarFretboard';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { Label } from './components/ui/label';
import { Separator } from './components/ui/separator';
import { Music, Guitar, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [key, setKey] = useState<string>('C');
  const [type, setType] = useState<ChordType>('Major');
  const [extension, setExtension] = useState<ChordExtension>('Triad');
  const [shape, setShape] = useState<CAGEDShape>('C');
  const [viewMode, setViewMode] = useState<'notes' | 'intervals'>('notes');

  const chordNotes = useMemo(() => {
    return calculateChordNotes(key, type, extension, shape);
  }, [key, type, extension, shape]);

  const chordName = useMemo(() => {
    let name = key;
    if (type === 'Minor') name += 'm';
    if (extension === 'Tetrad') {
      if (type === 'Major') name += 'maj7';
      else if (type === 'Minor') name += '7';
      else if (type === 'Dominant') name += '7';
    }
    return `${name} (Formato ${shape})`;
  }, [key, type, extension, shape]);

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans selection:bg-[#ff4444]/30">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ff4444] flex items-center justify-center shadow-[0_0_20px_rgba(255,68,68,0.4)]">
              <Guitar className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">CAGED Master</h1>
              <p className="text-xs text-[#888] font-mono uppercase tracking-widest">by Allan Krainski</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">
          {/* Controls */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <Card className="bg-[#111] rounded-2xl border-[#1a1a1a] text-[#e0e0e0] shadow-inner overflow-hidden">
              <CardHeader className="pb-4 border-b border-[#1a1a1a]/50">
                <CardTitle className="text-sm font-mono uppercase tracking-widest text-[#888] flex items-center gap-2">
                  <Music className="h-4 w-4 text-[#ff4444]" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                {/* Key Selection */}
                <div className="space-y-3">
                  <Label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555]">Tonalidade</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {NOTES.map((n) => (
                      <Button
                        key={n}
                        variant="outline"
                        size="sm"
                        onClick={() => setKey(n)}
                        className={`h-9 font-mono transition-all duration-200 ${
                          key === n 
                            ? 'bg-[#ff4444] border-[#ff4444] text-white shadow-[0_0_15px_rgba(255,68,68,0.3)] scale-105' 
                            : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-white hover:scale-105'
                        }`}
                      >
                        {n}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-[#1a1a1a]" />

                {/* Type Selection */}
                <div className="space-y-3">
                  <Label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555]">Tipo de Acorde</Label>
                  <Tabs 
                    value={type} 
                    onValueChange={(v) => {
                      const newType = v as ChordType;
                      setType(newType);
                      if (newType === 'Dominant') {
                        setExtension('Tetrad');
                      }
                    }} 
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-3 bg-[#0a0a0a] border border-[#1a1a1a] p-1 h-11">
                      <TabsTrigger value="Major" className="text-xs font-mono uppercase data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#ff4444]">Maior</TabsTrigger>
                      <TabsTrigger value="Minor" className="text-xs font-mono uppercase data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#ff4444]">Menor</TabsTrigger>
                      <TabsTrigger value="Dominant" className="text-xs font-mono uppercase data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#ff4444]">Dominante</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Extension Selection */}
                <div className="space-y-3">
                  <Label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555]">Estrutura</Label>
                  <Tabs value={extension} onValueChange={(v) => setExtension(v as ChordExtension)} className="w-full">
                    <TabsList className={`grid ${type === 'Dominant' ? 'grid-cols-1' : 'grid-cols-2'} bg-[#0a0a0a] border border-[#1a1a1a] p-1 h-11 transition-all duration-300`}>
                      {type !== 'Dominant' && (
                        <TabsTrigger value="Triad" className="text-xs font-mono uppercase data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#ff4444]">Tríade</TabsTrigger>
                      )}
                      <TabsTrigger value="Tetrad" className="text-xs font-mono uppercase data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#ff4444]">Tétrade</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <Separator className="bg-[#1a1a1a]" />

                {/* CAGED Shape Selection */}
                <div className="space-y-3">
                  <Label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555] flex items-center gap-2">
                    Formato CAGED
                  </Label>
                  <div className="grid grid-cols-5 gap-2">
                    {(['C', 'A', 'G', 'E', 'D'] as CAGEDShape[]).map((s) => (
                      <Button
                        key={s}
                        variant="outline"
                        size="sm"
                        onClick={() => setShape(s)}
                        className={`h-11 font-mono transition-all duration-200 ${
                          shape === s 
                            ? 'bg-[#ff4444] border-[#ff4444] text-white shadow-[0_0_15px_rgba(255,68,68,0.3)] scale-105' 
                            : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#888] hover:border-[#444] hover:text-white hover:scale-105'
                        }`}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-[#111] border-[#1a1a1a] text-[#888] rounded-2xl shadow-inner">
              <CardContent className="p-5 flex gap-4 text-xs leading-relaxed font-mono uppercase tracking-tight">
                <Info className="h-4 w-4 text-[#ff4444] shrink-0 mt-0.5" />
                <p>
                  O sistema <span className="text-[#e0e0e0]">CAGED</span> permite tocar qualquer acorde em 5 regiões diferentes do braço. 
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Visualization */}
          <div className="md:col-span-7 lg:col-span-8 space-y-4">
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setViewMode(prev => prev === 'notes' ? 'intervals' : 'notes')}
                className="bg-[#111] border-[#2a2a2a] text-[#888] hover:text-[#ff4444] hover:bg-[#1a1a1a] font-mono text-[10px] uppercase tracking-widest h-8 px-4"
              >
                Modo: <span className="text-[#e0e0e0] ml-1">{viewMode === 'notes' ? 'Notas' : 'Intervalos'}</span>
              </Button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${key}-${type}-${extension}-${shape}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <GuitarFretboard notes={chordNotes} chordName={chordName} viewMode={viewMode} />
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-[#111] border-[#1a1a1a] text-[#e0e0e0] rounded-2xl shadow-inner">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555]">Fórmula</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-mono text-[#ff4444] tracking-tighter">
                    {type === 'Major' && extension === 'Triad' && '1 - 3 - 5'}
                    {type === 'Major' && extension === 'Tetrad' && '1 - 3 - 5 - 7M'}
                    {type === 'Minor' && extension === 'Triad' && '1 - b3 - 5'}
                    {type === 'Minor' && extension === 'Tetrad' && '1 - b3 - 5 - b7'}
                    {type === 'Dominant' && '1 - 3 - 5 - b7'}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#111] border-[#1a1a1a] text-[#e0e0e0] rounded-2xl shadow-inner">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555]">Dica Técnica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-[#888] font-mono uppercase leading-relaxed">
                    {shape === 'E' && 'Formato E: Pestana na 6ª corda.'}
                    {shape === 'A' && 'Formato A: Pestana na 5ª corda.'}
                    {shape === 'C' && 'Formato C: Voicings agudos.'}
                    {shape === 'G' && 'Formato G: Sonoridades ricas.'}
                    {shape === 'D' && 'Formato D: Cordas agudas.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-12 pb-6 border-t border-[#1a1a1a] flex flex-col items-center gap-3">
          <p className="text-[#555] text-[10px] font-mono tracking-[0.3em] uppercase">
            Technical Hardware Interface — <span className="text-[#888]">Allan Krainski</span>
          </p>
          <div className="flex items-center gap-4 text-[#444] text-[9px] font-mono uppercase tracking-widest">
            <span>© {new Date().getFullYear()}</span>
            <span className="w-1 h-1 rounded-full bg-[#222]" />
            <span>All Rights Reserved</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

