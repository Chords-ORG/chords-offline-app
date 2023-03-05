import React from "react";
import { Chord } from "../services/chords";
import { ChordLineType } from "../types";
import { parseLyricsChords } from "../services/lyrics";
import { debounce } from "lodash";
import { LocalSettingsContext } from "../providers/LocalSettingsProvider";

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
  const { chordType, capoConfig, instrument } =
    React.useContext(LocalSettingsContext);
  const [chordsLines, setChordsLines] = React.useState<ChordLineType[]>([]);
  const [chordsList, setChordsList] = React.useState<Chord[]>([]);
  const [stringChordList, setStringChordList] = React.useState<string[]>([]);
  const [tone, setToneState] = React.useState<string>(originalTone);
  const [capo, setCapoState] = React.useState<number>(originalCapo);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setToneState(originalTone);
  }, [originalTone]);

  React.useEffect(() => {
    if (capoConfig === "auto" || instrument === "guitar") {
      setCapoState(originalCapo);
    } else {
      setCapoState(0);
    }
  }, [originalCapo, capoConfig]);

  const debounceSaveChords = React.useCallback(
    debounce(
      async ({ lyrics, tone, originalTone, capo, originalCapo, chordType }) => {
        setLoading(true);
        try {
          const { chordsLines, chordsList, stringChordList } =
            await parseLyricsChords({
              lyrics,
              tone,
              originalTone,
              capo,
              originalCapo,
              chordType,
            });
          setChordsLines(chordsLines);
          setChordsList(chordsList);
          setStringChordList(stringChordList);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          throw e;
        }
      },
      100
    ),
    []
  );

  React.useEffect(() => {
    debounceSaveChords({
      lyrics,
      tone,
      originalTone,
      capo,
      originalCapo,
      chordType,
    });
  }, [
    lyrics,
    tone,
    originalTone,
    capo,
    originalCapo,
    chordType,
    setChordsLines,
    setChordsList,
    setStringChordList,
    setLoading,
  ]);

  const setCapo = React.useCallback(
    (newCapo: number) => {
      setLoading(true);
      setCapoState(newCapo);
    },
    [setCapoState]
  );

  const setTone = React.useCallback(
    (newTone: string) => {
      setLoading(true);
      setToneState(newTone);
    },
    [setToneState]
  );

  return {
    loading,
    stringChordList,
    chordsLines,
    chordsList,
    setCapo,
    setTone,
    capo,
    tone,
  };
}
