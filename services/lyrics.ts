import { ChordType } from "../providers/LocalSettingsProvider";
import { ChordLineType } from "../types";
import { Chord, addSemiTonesToChordLine } from "./chords";

type ParseLyricsChordsProps = {
  lyrics: string;
  tone: string;
  originalTone: string;
  capo: number;
  originalCapo: number;
  chordType: ChordType;
};

const getToneDelta = (
  tone: string,
  originalTone: string,
  capo: number,
  originalCapo: number
) => {
  const toneBaseNote = new Chord(tone).base.base;
  const originalToneBaseNote = new Chord(originalTone).base.base;
  return originalToneBaseNote - toneBaseNote - (originalCapo - capo);
};

export const parseLyricsChords = ({
  lyrics,
  tone,
  originalTone,
  capo,
  originalCapo,
  chordType,
}: ParseLyricsChordsProps) => {
  const lines = lyrics.split("\n");
  const chordsLines: ChordLineType[] = [];

  const toneDelta = getToneDelta(tone, originalTone, capo, originalCapo);

  for (let i = 0; i < lines.length; i += 2) {
    const chordsLine = addSemiTonesToChordLine(lines[i], toneDelta, chordType);
    const lyricLine = lines[i + 1] || "";

    chordsLines.push({ chordsLine: chordsLine, musicLine: lyricLine });
  }

  const chordsMap = new Map<string, string>();
  for (let i = 0; i < chordsLines.length; i++) {
    const chords = chordsLines[i].chordsLine.split(" ");
    for (let j = 0; j < chords.length; ++j) {
      if (chords[j] == "") continue;
      const originalChordName = chords[j];
      const chordName = Chord.toChord(originalChordName, chordType);
      chordsMap.set(originalChordName, chordName);
    }
  }

  chordsLines.forEach((chordsLine) => {
    chordsMap.forEach((chordName, originalChordName) => {
      chordsLine.chordsLine = chordsLine.chordsLine.replace(
        originalChordName,
        chordName
      );
    });
  });

  const sharpChordList = Array.from(chordsMap.values()).map((chordName) =>
    new Chord(chordName).toSharp()
  );

  const chordsList = sharpChordList.map((chordName) => new Chord(chordName));

  return { chordsLines, chordsList, sharpChordList };
};
