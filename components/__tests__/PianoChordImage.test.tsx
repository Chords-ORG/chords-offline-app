import renderer from "react-test-renderer";
import React from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import {
  DarkColors,
  DarkStyle,
  LightColors,
  LightStyle,
} from "../../constants/Styles";
import PianoChordImage from "../PianoChordImage";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("<PianoChordImage/>", () => {
  describe("Testing sample chords positions on database", () => {
    const pianoChords: Record<
      string,
      string[][]
    > = require("../../assets/data/piano_chords.json");

    const sample = Object.keys(pianoChords).slice(0, 5);

    sample.forEach((chordName) => {
      const fingersPositionsList = pianoChords[chordName];
      fingersPositionsList.forEach((fingers, idx) => {
        it(`should render ${chordName} on position ${idx} on light theme`, () => {
          const tree = renderer
            .create(
              <ThemeContext.Provider
                value={{
                  styleSheet: LightStyle,
                  colors: LightColors,
                  theme: "light",
                }}
              >
                <PianoChordImage fingers={fingers} />
              </ThemeContext.Provider>
            )
            .toJSON();
          expect(tree).toMatchSnapshot();
        });

        it(`should render ${chordName} on position ${idx} on dark theme`, () => {
          const tree = renderer
            .create(
              <ThemeContext.Provider
                value={{
                  styleSheet: DarkStyle,
                  colors: DarkColors,
                  theme: "dark",
                }}
              >
                <PianoChordImage fingers={fingers} />
              </ThemeContext.Provider>
            )
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });
  });
});
