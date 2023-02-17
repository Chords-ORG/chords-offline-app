import React from "react";
import { Chord, addSemiTonesToChordLine } from "../functions/chords";
import { ChordLineType } from "../types";
import useLocalConfiguration from "./useLocalConfiguration";

export interface ChordStateProps {
  lyrics?: string;
  originalTone?: string;
  originalCapo?: number;
}
export default function useChordsState({
  lyrics = "",
  originalTone = "C",
  originalCapo = 0,
}: ChordStateProps) {
  const { chordType } = useLocalConfiguration();
  const [chordsLines, setChordsLines] = React.useState<ChordLineType[]>([]);
  const [chordsList, setChordsList] = React.useState<Chord[]>([]);
  const [rawChordList, setRawChordList] = React.useState<string[]>([]);
  const [tone, setToneState] = React.useState<string>(originalTone);
  const [capo, setCapoState] = React.useState<number>(originalCapo);

  React.useEffect(() => {
    const lines = lyrics.split("\n");
    const chordsLines: ChordLineType[] = [];
    const chordsList: Chord[] = [];
    let rawChordsList: string[] = [];
    // Aggregate from 2 lines
    for (let i = 0; i < lines.length; i += 2) {
      const toneBaseNote = new Chord(tone).base.base;
      const originalToneBaseNote = new Chord(originalTone).base.base;
      const toneDelta = originalToneBaseNote - toneBaseNote;
      const capoDelta = originalCapo - capo;
      const chords_line = addSemiTonesToChordLine(
        lines[i],
        capoDelta - toneDelta,
        chordType
      );

      const music_line = lines[i + 1] || "";
      chordsLines.push({ chords_line, music_line });
    }
    for (let i = 0; i < chordsLines.length; i++) {
      const chords = chordsLines[i].chords_line.split(" ");
      for (let j = 0; j < chords.length; ++j) {
        if (chords[j] == "") continue;
        let originalChordName = chords[j];
        let chordName = Chord.toChord(originalChordName, chordType);
        chords[j].replace(originalChordName, chordName);
        rawChordsList.push(chordName);
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
  }, [lyrics, chordType, tone, capo]);

  const setCapo = React.useCallback(
    (newCapo: number) => {
      setCapoState(newCapo);
    },
    [setCapoState]
  );

  const setTone = React.useCallback(
    (newTone: string) => {
      setToneState(newTone);
    },
    [setToneState]
  );

  return {
    rawChordList,
    chordsLines,
    chordsList,
    setCapo,
    setTone,
    capo,
    tone,
  };
}
