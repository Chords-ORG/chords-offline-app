import renderer from "react-test-renderer";
import React from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import {
  DarkColors,
  DarkStyle,
  LightColors,
  LightStyle,
} from "../../constants/Styles";
import PianoChord from "../PianoChord";
import { TouchableOpacity } from "react-native-gesture-handler";
import { act } from "react-dom/test-utils";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("<PianoChord />", () => {
  describe("Testing rendering", () => {
    it(`should render C on light theme`, () => {
      const tree = renderer
        .create(
          <ThemeContext.Provider
            value={{
              styleSheet: LightStyle,
              colors: LightColors,
              theme: "light",
            }}
          >
            <PianoChord chordName="C" />
          </ThemeContext.Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it(`should render C on dark theme`, () => {
      const tree = renderer

        .create(
          <ThemeContext.Provider
            value={{
              styleSheet: DarkStyle,
              colors: DarkColors,
              theme: "dark",
            }}
          >
            <PianoChord chordName="C" />
          </ThemeContext.Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
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
        <PianoChord chordName="C" />
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

  describe("Testing chord not found", () => {
    it("should render correctly when the chord is not found", () => {
      const tree = renderer
        .create(
          <ThemeContext.Provider
            value={{
              styleSheet: LightStyle,
              colors: LightColors,
              theme: "light",
            }}
          >
            <PianoChord chordName="a#dajsklkj" />
          </ThemeContext.Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
