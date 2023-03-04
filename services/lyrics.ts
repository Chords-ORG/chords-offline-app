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

type ParseLyricsChordsReturnType = {
  chordsLines: ChordLineType[];
  chordsList: Chord[];
  stringChordList: string[];
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
  return new Promise<ParseLyricsChordsReturnType>((resolve, reject) => {
    try {
      setTimeout(() => {
        const lines = lyrics.split("\n");
        const chordsLines: ChordLineType[] = [];

        const toneDelta = getToneDelta(tone, originalTone, capo, originalCapo);

        for (let i = 0; i < lines.length; i += 2) {
          const chordsLine = addSemiTonesToChordLine(
            lines[i],
            toneDelta,
            chordType
          );
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

        const stringChordList = Array.from(chordsMap.values());

        const chordsList = stringChordList.map(
          (chordName) => new Chord(chordName)
        );

        resolve({ chordsLines, chordsList, stringChordList });
      }, 0);
    } catch (e) {
      reject(e);
    }
  });
};
