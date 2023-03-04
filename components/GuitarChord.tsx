import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useGuitarChordImages from "../hooks/useGuitarChordImages";
import { ThemeContext } from "../providers/ThemeProvider";
import { Chord } from "../services/chords";

type DictStyle = Record<
  number,
  { height?: number; width?: number; top?: number; right?: number }
>;
const houseDict: DictStyle = {
  0: { height: 0, width: 0 },
  1: { top: 30 },
  2: { top: 47 },
  3: { top: 63 },
  4: { top: 80 },
  5: { top: 97 },
};

const stringDict: DictStyle = {
  0: { height: 0, width: 0 },
  1: { right: 1 },
  2: { right: 15 },
  3: { right: 28 },
  4: { right: 41 },
  5: { right: 55 },
  6: { right: 68 },
};

export interface GuitarChordProps {
  capo: number;
  chordName: string;
}
export type GuitarFinger = {
  house: number;
  string: number;
  size: number;
};

export type GuitarChordPosition = {
  startHouse: number;
  fingers: GuitarFinger[];
  strings: string[];
};

export default function GuitarChord({ capo, chordName }: GuitarChordProps) {
  const {
    guitar_base,
    guitar_capo,
    guitar_front,
    bass_string,
    none_string,
    normal_string,
    slash_2,
    slash_3,
    slash_4,
    slash_5,
    slash_6,
    finger_1,
    finger_2,
    finger_3,
    finger_4,
    finger_p,
  } = useGuitarChordImages();
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);

  const guitarChords: Record<
    string,
    GuitarChordPosition[]
  > = require("../assets/data/guitar_chords.json");

  const sharpChordName = Chord.toChord(chordName, "sharp");
  const chords = guitarChords[sharpChordName];
  const [idx, setIdx] = useState(0);
  if (!chords || chords.length == 0) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={[styles.message, themeStyle.primary_color]}>
          {" "}
          Acorde Indisponível{" "}
        </Text>
      </View>
    );
  } else {
    const tam = guitarChords[chordName].length;
    let slash_house_style = styles.slash_house_1;
    if (chords[idx].fingers[0].house == 2)
      slash_house_style = styles.slash_house_2;
    else if (chords[idx].fingers[0].house == 3)
      slash_house_style = styles.slash_house_3;
    else if (chords[idx].fingers[0].house == 4)
      slash_house_style = styles.slash_house_4;
    const startHouse = chords[idx].startHouse + (capo != 0 ? capo + 1 : 0);

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIdx((idx + 1) % tam)}
      >
        <Text style={[styles.houseText, themeStyle.primary_color]}>
          {startHouse != 0 ? `${startHouse}ª` : "   "}
        </Text>
        <View>
          <Image
            source={
              capo != 0
                ? guitar_capo
                : chords[idx].startHouse != 0
                ? guitar_front
                : guitar_base
            }
            style={styles.back_image}
          />

          <Image
            source={finger_1}
            style={[
              chords[idx].fingers[0].size == 1
                ? styles.finger
                : styles.unactive,
              houseDict[chords[idx].fingers[0].house],
              stringDict[chords[idx].fingers[0].string],
            ]}
          />
          <Image
            source={slash_2}
            style={[
              styles.slash_2,
              chords[idx].fingers[0].size == 2
                ? slash_house_style
                : styles.unactive,
            ]}
          />
          <Image
            source={slash_3}
            style={[
              styles.slash_3,
              chords[idx].fingers[0].size == 3
                ? slash_house_style
                : styles.unactive,
            ]}
          />
          <Image
            source={slash_4}
            style={[
              styles.slash_4,
              chords[idx].fingers[0].size == 4
                ? slash_house_style
                : styles.unactive,
            ]}
          />
          <Image
            source={slash_5}
            style={[
              styles.slash_5,
              chords[idx].fingers[0].size == 5
                ? slash_house_style
                : styles.unactive,
            ]}
          />
          <Image
            source={slash_6}
            style={[
              styles.slash_6,
              chords[idx].fingers[0].size == 6
                ? slash_house_style
                : styles.unactive,
            ]}
          />

          <Image
            source={finger_2}
            style={[
              styles.finger,
              houseDict[chords[idx].fingers[1].house],
              stringDict[chords[idx].fingers[1].string],
            ]}
          />
          <Image
            source={finger_3}
            style={[
              styles.finger,
              houseDict[chords[idx].fingers[2].house],
              stringDict[chords[idx].fingers[2].string],
            ]}
          />
          <Image
            source={finger_4}
            style={[
              styles.finger,
              houseDict[chords[idx].fingers[3].house],
              stringDict[chords[idx].fingers[3].string],
            ]}
          />
          <Image
            source={finger_p}
            style={[
              styles.finger,
              houseDict[chords[idx].fingers[4].house],
              stringDict[chords[idx].fingers[4].string],
            ]}
          />
          <Image
            source={
              chords[idx].strings[0] == "b"
                ? bass_string
                : chords[idx].strings[0] == "x"
                ? none_string
                : normal_string
            }
            style={styles.string_1}
          />
          <Image
            source={
              chords[idx].strings[1] == "b"
                ? bass_string
                : chords[idx].strings[1] == "x"
                ? none_string
                : normal_string
            }
            style={styles.string_2}
          />
          <Image
            source={
              chords[idx].strings[2] == "b"
                ? bass_string
                : chords[idx].strings[2] == "x"
                ? none_string
                : normal_string
            }
            style={styles.string_3}
          />
          <Image
            source={
              chords[idx].strings[3] == "b"
                ? bass_string
                : chords[idx].strings[3] == "x"
                ? none_string
                : normal_string
            }
            style={styles.string_4}
          />
          <Image
            source={
              chords[idx].strings[4] == "b"
                ? bass_string
                : chords[idx].strings[4] == "x"
                ? none_string
                : normal_string
            }
            style={styles.string_5}
          />
          <Image
            source={
              chords[idx].strings[5] == "b"
                ? bass_string
                : chords[idx].strings[5] == "x"
                ? none_string
                : normal_string
            }
            style={styles.string_6}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 100,
    height: 120,
    justifyContent: "space-between",
    paddingRight: 10,
  },
  message: {
    fontFamily: "roboto-bold",
    fontSize: 12,
    textAlign: "center",
  },
  houseText: {
    marginTop: 25,
    fontFamily: "roboto-bold",
    fontSize: 12,
  },
  back_image: {
    height: 110,
    width: 80,
  },
  unactive: {
    height: 0,
    width: 0,
  },
  slash_2: {
    position: "absolute",
    height: 7,
    width: 22,
  },
  slash_3: {
    position: "absolute",
    height: 7,
    width: 36,
  },
  slash_4: {
    position: "absolute",
    height: 7,
    width: 49,
  },
  slash_5: {
    position: "absolute",
    height: 7,
    width: 63,
  },
  slash_6: {
    position: "absolute",
    height: 7,
    width: 79,
  },
  finger: {
    position: "absolute",
    height: 12,
    width: 12,
  },
  string_1: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 2,
  },
  string_2: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 15,
  },
  string_3: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 29,
  },
  string_4: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 42,
  },
  string_5: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 56,
  },
  string_6: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 70,
  },
  slash_house_1: {
    position: "absolute",
    right: 1,
    top: 32,
  },
  slash_house_2: {
    position: "absolute",
    right: 1,
    top: 49,
  },
  slash_house_3: {
    position: "absolute",
    right: 1,
    top: 65,
  },
  slash_house_4: {
    position: "absolute",
    right: 1,
    top: 82,
  },
  up_touch: {
    zIndex: 1,
    position: "absolute",
    width: "50%",
    height: "100%",
    borderWidth: 1,
  },
  down_touch: {
    position: "absolute",

    right: 0,
    bottom: 0,
    width: "100%",
    height: "50%",
  },
});
