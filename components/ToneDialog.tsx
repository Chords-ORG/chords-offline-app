import React from "react";
import { bemolDict, sharpDict } from "../services/chords";
import Picker from "./Picker";
import { LocalSettingsContext } from "../providers/LocalSettingsProvider";

export interface ToneDialogProps {
  onSelectTone?: (tone: string) => void;
  selectedTone?: string;
  minor?: boolean;
}

export default function ToneDialog({
  onSelectTone = () => {},
  selectedTone = "C",
  minor = false,
}: ToneDialogProps) {
  const { chordType } = React.useContext(LocalSettingsContext);
  const toneDict = chordType === "sharp" ? sharpDict : bemolDict;
  const pickerItems = Object.values(toneDict).map((tone) => ({
    label: tone + (minor ? "m" : ""),
    value: tone + (minor ? "m" : ""),
  }));

  return (
    <Picker
      label="Tom"
      items={pickerItems}
      selectedValue={selectedTone}
      onValueChange={onSelectTone}
      columns={2}
      buttonWidth={100}
      style={{
        flex: 1,
      }}
    />
  );
}
