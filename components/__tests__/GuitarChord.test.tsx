import renderer from "react-test-renderer";
import React from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import {
  DarkColors,
  DarkStyle,
  LightColors,
  LightStyle,
} from "../../constants/Styles";
import GuitarChord from "../GuitarChord";
import { TouchableOpacity } from "react-native-gesture-handler";
import { act } from "react-dom/test-utils";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("<GuitarChordImage/>", () => {
  describe("Testing rendering on diferent capos", () => {
    [0, 4, 9].forEach((capo) => {
      it(`should render C on position 0 with capo ${capo} on light theme`, () => {
        const tree = renderer
          .create(
            <ThemeContext.Provider
              value={{
                styleSheet: LightStyle,
                colors: LightColors,
                theme: "light",
              }}
            >
              <GuitarChord chordName="C" capo={capo} />
            </ThemeContext.Provider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it(`should render C on position 0 with capo ${capo} on dark theme`, () => {
        const tree = renderer

          .create(
            <ThemeContext.Provider
              value={{
                styleSheet: DarkStyle,
                colors: DarkColors,
                theme: "dark",
              }}
            >
              <GuitarChord chordName="C" capo={capo} />
            </ThemeContext.Provider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe("Testing clicking and changing note", () => {
    const tree = renderer.create(
      <ThemeContext.Provider
        value={{
          styleSheet: LightStyle,
          colors: LightColors,
          theme: "light",
        }}
      >
        <GuitarChord chordName="C" capo={0} />
      </ThemeContext.Provider>
    );

    it("should render correcly after changing the chord form", () => {
      expect(tree.toJSON()).toMatchSnapshot();
      for (let i = 0; i < 10; i++) {
        act(() => {
          tree.root.findByType(TouchableOpacity).props.onPress();
        });
        expect(tree.toJSON()).toMatchSnapshot();
      }
    });
  });
});
