import renderer from "react-test-renderer";
import React from "react";
import GuitarChordImage, { GuitarChordPosition } from "../GuitarChordImage";
import { ThemeContext } from "../../providers/ThemeProvider";
import {
  DarkColors,
  DarkStyle,
  LightColors,
  LightStyle,
} from "../../constants/Styles";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("<GuitarChordImage/>", () => {
  describe("Testing sample chords positions on database", () => {
    const guitarChords: Record<
      string,
      GuitarChordPosition[]
    > = require("../../assets/data/guitar_chords.json");

    const sample = Object.keys(guitarChords).slice(0, 5);

    sample.forEach((chordName) => {
      const chordsPositions = guitarChords[chordName];
      chordsPositions.forEach((chordPosition, idx) => {
        for (let capo = 0; capo < 11; capo++) {
          it(`should render ${chordName} on position ${idx} with capo ${capo} on light theme`, () => {
            const tree = renderer
              .create(
                <ThemeContext.Provider
                  value={{
                    styleSheet: LightStyle,
                    colors: LightColors,
                    theme: "light",
                  }}
                >
                  <GuitarChordImage chordPosition={chordPosition} capo={capo} />
                </ThemeContext.Provider>
              )
              .toJSON();
            expect(tree).toMatchSnapshot();
          });

          it(`should render ${chordName} on position ${idx} with capo ${capo} on dark theme`, () => {
            const tree = renderer
              .create(
                <ThemeContext.Provider
                  value={{
                    styleSheet: DarkStyle,
                    colors: DarkColors,
                    theme: "dark",
                  }}
                >
                  <GuitarChordImage chordPosition={chordPosition} capo={capo} />
                </ThemeContext.Provider>
              )
              .toJSON();
            expect(tree).toMatchSnapshot();
          });
        }
      });
    });
  });
});
