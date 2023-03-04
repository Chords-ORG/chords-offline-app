import React from "react";
import { Chord } from "../services/chords";
import Picker from "./Picker";
import { LocalSettingsContext } from "../providers/LocalSettingsProvider";

export interface CapoDialogProps {
  selectedCapo: number;
  tone: string;
  onSelect: (value: number) => void;
}

export default function CapoDialog({
  selectedCapo,
  tone,
  onSelect,
}: CapoDialogProps) {
  const { chordType } = React.useContext(LocalSettingsContext);

  const pickerItems = React.useMemo(() => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      const label = i === 0 ? "Sem capotraste\n" : `${i}ª casa\n`;

      const newChordsForm = new Chord(tone);
      newChordsForm.add(-i);
      const helpText = `Forma de ${Chord.toChord(
        newChordsForm.toSharp(),
        chordType
      )}`;

      items.push({
        value: i,
        label: label,
        helpText: helpText,
      });
    }
    return items;
  }, [tone]);

  return (
    <Picker
      items={pickerItems}
      label="Capotraste"
      selectedValue={selectedCapo}
      onValueChange={onSelect}
      columns={2}
      buttonWidth={150}
      style={{
        flex: 1,
      }}
    />
  );
}
