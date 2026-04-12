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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Dicionário de acordes básicos
            </h1>
            <p className="text-zinc-500 text-sm">Allan Krainski — Mapeamento CAGED interativo</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Music className="h-5 w-5 text-orange-500" />
                  Configurações
                </CardTitle>
                <CardDescription className="text-zinc-500">
                  Escolha a tonalidade e o tipo do acorde
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Selection */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-zinc-500">Tonalidade</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {NOTES.map((n) => (
                      <Button
                        key={n}
                        variant={key === n ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setKey(n)}
                        className={`h-9 ${key === n ? 'bg-orange-600 hover:bg-orange-700' : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800'}`}
                      >
                        {n}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                {/* Type Selection */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-zinc-500">Tipo de Acorde</Label>
                  <Tabs value={type} onValueChange={(v) => setType(v as ChordType)} className="w-full">
                    <TabsList className="grid grid-cols-3 bg-zinc-950 border border-zinc-800 p-1">
                      <TabsTrigger value="Major" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-orange-400">Maior</TabsTrigger>
                      <TabsTrigger value="Minor" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-orange-400">Menor</TabsTrigger>
                      <TabsTrigger value="Dominant" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-orange-400">7</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Extension Selection */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-zinc-500">Estrutura</Label>
                  <Tabs value={extension} onValueChange={(v) => setExtension(v as ChordExtension)} className="w-full">
                    <TabsList className="grid grid-cols-2 bg-zinc-950 border border-zinc-800 p-1">
                      <TabsTrigger value="Triad" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-orange-400">Tríade</TabsTrigger>
                      <TabsTrigger value="Tetrad" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-orange-400">Tétrade</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <Separator className="bg-zinc-800" />

                {/* CAGED Shape Selection */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                    <Guitar className="h-3 w-3" />
                    Formato CAGED
                  </Label>
                  <div className="grid grid-cols-5 gap-2">
                    {(['C', 'A', 'G', 'E', 'D'] as CAGEDShape[]).map((s) => (
                      <Button
                        key={s}
                        variant={shape === s ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setShape(s)}
                        className={`h-10 ${shape === s ? 'bg-orange-600 hover:bg-orange-700' : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800'}`}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-zinc-900/50 border-zinc-800 text-zinc-400">
              <CardContent className="p-4 flex gap-3 text-xs leading-relaxed">
                <Info className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                <p>
                  O sistema **CAGED** permite tocar qualquer acorde em 5 regiões diferentes do braço. 
                  Cada letra representa um formato básico de acorde aberto.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${key}-${type}-${extension}-${shape}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GuitarFretboard notes={chordNotes} chordName={chordName} />
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">Fórmula do Acorde</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-mono text-orange-400">
                    {type === 'Major' && extension === 'Triad' && '1 - 3 - 5'}
                    {type === 'Major' && extension === 'Tetrad' && '1 - 3 - 5 - 7M'}
                    {type === 'Minor' && extension === 'Triad' && '1 - b3 - 5'}
                    {type === 'Minor' && extension === 'Tetrad' && '1 - b3 - 5 - b7'}
                    {type === 'Dominant' && '1 - 3 - 5 - b7'}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">Dica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-300">
                    {shape === 'E' && 'Formato de Mi: Ótimo para acordes com pestana na 6ª corda.'}
                    {shape === 'A' && 'Formato de Lá: Ótimo para acordes com pestana na 5ª corda.'}
                    {shape === 'C' && 'Formato de Dó: Útil para voicings mais agudos e melodias.'}
                    {shape === 'G' && 'Formato de Sol: Desafiador, mas oferece sonoridades ricas.'}
                    {shape === 'D' && 'Formato de Ré: Focado nas cordas mais agudas.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

