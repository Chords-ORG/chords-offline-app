import React from "react";
import { Chord, addSemiTonesToChordLine } from "../services/chords";
import { ChordLineType } from "../types";
import useLocalConfiguration from "./useLocalConfiguration";
import { parseLyricsChords } from "../services/lyrics";

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
  const [sharpChordList, setSharpChordList] = React.useState<string[]>([]);
  const [tone, setToneState] = React.useState<string>(originalTone);
  const [capo, setCapoState] = React.useState<number>(originalCapo);

  React.useEffect(() => {
    setToneState(originalTone);
  }, [originalTone]);

  React.useEffect(() => {
    setCapoState(originalCapo);
  }, [originalCapo]);

  React.useEffect(() => {
    const { chordsLines, chordsList, sharpChordList } = parseLyricsChords({
      lyrics,
      tone,
      originalTone,
      capo,
      originalCapo,
      chordType,
    });

    setChordsLines(chordsLines);
    setChordsList(chordsList);
    setSharpChordList(sharpChordList);
  }, [
    lyrics,
    tone,
    originalTone,
    capo,
    originalCapo,
    chordType,
    setChordsLines,
    setChordsList,
    setSharpChordList,
  ]);

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
    sharpChordList,
    chordsLines,
    chordsList,
    setCapo,
    setTone,
    capo,
    tone,
  };
}
