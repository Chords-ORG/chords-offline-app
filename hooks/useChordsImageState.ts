import React from "react";
import { ScrollView } from "react-native";
import { Chord } from "../services/chords";
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
export default function useChordsImageState(
  chordsList: string[]
): ChordsImageStateProps {
  const [visible, setVisible] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState("");
  const { chordType, instrument } = useLocalConfiguration();
  const [scrollRef, _] = React.useState<React.RefObject<ScrollView>>(
    React.createRef<ScrollView>()
  );

  const scrollToChord = React.useCallback(
    (chordName: string) => {
      if (!visible) setVisible(true);
      setSelectedNote(Chord.toChord(chordName, chordType));
      const pos = chordsList.indexOf(Chord.toChord(chordName, chordType));
      const width = instrument == "guitar" ? 100 : 150;

      scrollRef.current?.scrollTo({ x: width * pos });
    },
    [
      chordType,
      instrument,
      chordsList,
      selectedNote,
      setSelectedNote,
      visible,
      setVisible,
    ]
  );

  const close = React.useCallback(() => {
    setVisible(false);
  }, [setVisible, visible]);

  const open = React.useCallback(() => {
    setVisible(true);
  }, [setVisible, visible]);

  return {
    chordsList,
    selectedNote,
    scrollToChord,
    scrollRef,
    visible,
    close,
    open,
  };
}
