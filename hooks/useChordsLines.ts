import { ChordLineType } from "../types";

export default function useChordsLines(chords: string): ChordLineType[] {
    const lines = chords.split('\n');
    const chords_lines: ChordLineType[] = [];
    // Aggregate from 2 lines
    for (let i = 0; i < lines.length; i += 2) {
      const chords_line = lines[i];
      const music_line = lines[i + 1] || "";
      chords_lines.push({ chords_line, music_line });
    }
    return chords_lines;
}
