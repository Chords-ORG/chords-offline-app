import React from "react";
import { ScrollView } from "react-native";
import { Chord } from "../functions/chords";
import useLocalConfiguration from "./useLocalConfiguration";

export interface ChordsImageStateProps {
    chordsList: string[];
    selectedNote: string;
    scrollToChord: (chordName: string) => void;
    scrollRef: React.RefObject<ScrollView>;
    visible: boolean;
    close: () => void;
    open: () => void;
}
export default function useChordsImageState(rawChordsList: string[]): ChordsImageStateProps {
    const chordsList = rawChordsList.map((chord) => Chord.toChord(chord, chordType));
    const [visible, setVisible] = React.useState(false);
    const [selectedNote, setSelectedNote] = React.useState("");
    const { chordType, instrument } = useLocalConfiguration();
    const scrollRef = React.createRef<ScrollView>();
  

    const scrollToChord = React.useCallback((chordName: string) => {
        if (!visible) setVisible(true);
        setSelectedNote(Chord.toChord(chordName, chordType));
        var pos = chordsList.indexOf(chordName);
        var width = 0;
        if (instrument == "guitar") width = 100;
        if (instrument == "piano") width = 200;
        scrollRef.current?.scrollTo({ x: width * pos });
    }, [])

    const close = React.useCallback(() => {
        setVisible(false);
    }, [])

    const open = React.useCallback(() => {
        setVisible(true);
    }, [])
    

  return { chordsList, selectedNote, scrollToChord, scrollRef, visible, close, open }
}
