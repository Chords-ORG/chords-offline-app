import { Chord } from "../chords";

describe("Chord", () => {
  describe("Inputing valid chords", () => {
    it("Major simple chord", () => {
      const chord = new Chord("C");
      expect(chord.base.base).toEqual(0);
    });
  });
});
