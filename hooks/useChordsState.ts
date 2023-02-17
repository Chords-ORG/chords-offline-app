import React from "react";
import { Chord } from "../functions/chords";
import { ChordLineType } from "../types";
import useLocalConfiguration from "./useLocalConfiguration";


export interface ChordStateProps {
  lyrics?: string;
  originalTone?: string;
  tone?: string;
  capo?: number;
}
export default function useChordsState({
  lyrics = "",
  originalTone = "C",
  tone = "C",
  capo = 0,
}: ChordStateProps) {
  const { chordType, instrument } = useLocalConfiguration();
  const [chordsLines, setChordsLines] = React.useState<ChordLineType[]>([]);
  const [chordsList, setChordsList] = React.useState<Chord[]>([]);
  const [rawChordList, setRawChordList] = React.useState<string[]>([]);

  React.useEffect(() => {
    const lines = lyrics.split("\n");
    const chordsLines: ChordLineType[] = [];
    const chordsList: Chord[] = [];
    let rawChordsList: string[] = [];
    // Aggregate from 2 lines
    for (let i = 0; i < lines.length; i += 2) {
      const chords_line = lines[i];
      const music_line = lines[i + 1] || "";
      chordsLines.push({ chords_line, music_line });
    }
    for (let i = 0; i < chordsLines.length; i++) {
      const chords = chordsLines[i].chords_line.split(" ");
      for (let j = 0; j < chords.length; ++j) {
        if (chords[j] == "") continue;
        let chord_name = chords[j];
        rawChordsList.push(chord_name);
      }
    }
    // Remove duplicates
    rawChordsList = rawChordsList.filter(
      (chord, index) => rawChordsList.indexOf(chord) === index
    );
    setRawChordList(rawChordsList);

    // Create Chord objects
    for (let i = 0; i < rawChordsList.length; i++) {
      const chord_name = rawChordsList[i];
      const chord = new Chord(chord_name);
      chordsList.push(chord);
    }

    setChordsList(chordsList);
    setChordsLines(chordsLines);

  }, [lyrics]);
  return { rawChordList, chordsLines, chordsList };
}
