import { Chord } from "../chords";
import { GuitarChordPosition } from "../../components/GuitarChord";

const getAllDatabaseChords = () => {
  const guitarChords: Record<
    string,
    GuitarChordPosition[]
  > = require("../../assets/data/guitar_chords.json");

  const pianoChords: Record<
    string,
    string[][]
  > = require("../../assets/data/piano_chords.json");

  const validChords = new Set<string>();
  for (const chord in guitarChords) {
    validChords.add(chord);
  }
  for (const chord in pianoChords) {
    validChords.add(chord);
  }
  return validChords;
};

describe("Chord", () => {
  describe("Inputing valid chords", () => {
    it("Major simple chord", () => {
      const chord = new Chord("C");
      expect(chord.base.base).toEqual(0);
    });
  });

  describe("All chords in database", () => {
    const validChords = getAllDatabaseChords();
    for (const chord of validChords) {
      it(`Chord ${chord}`, () => {
        const chordObj = new Chord(chord);
        expect(chordObj.valid).toBeTruthy();
      });
    }
  });
});
