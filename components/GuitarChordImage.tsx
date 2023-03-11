import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import useGuitarChordImages from "../hooks/useGuitarChordImages";
import { ThemeContext } from "../providers/ThemeProvider";

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

export interface GuitarChordImage {
  chordPosition: GuitarChordPosition;
  capo: number;
}

export default function GuitarChordImage({ chordPosition, capo }: GuitarChordImage) {
  const {
    guitarBase,
    guitarCapo,
    guitarFront,
    bassString,
    noneString,
    normalString,
    slash2,
    slash3,
    slash4,
    slash5,
    slash6,
    finger1,
    finger2,
    finger3,
    finger4,
    fingerP,
  } = useGuitarChordImages();
  const { colors: themeColors } = React.useContext(ThemeContext);

  let slashHouseStyle = styles.slashHouse1;
  if (chordPosition.fingers[0].house == 2) slashHouseStyle = styles.slashHouse2;
  else if (chordPosition.fingers[0].house == 3)
    slashHouseStyle = styles.slashHouse3;
  else if (chordPosition.fingers[0].house == 4)
    slashHouseStyle = styles.slashHouse4;
  const startHouse = chordPosition.startHouse + (capo != 0 ? capo + 1 : 0);

  return (
    <View style={styles.container}>
      <Text style={[styles.houseText, { color: themeColors.textPrimary }]}>
        {startHouse != 0 ? `${startHouse}ª` : "   "}
      </Text>
      <View>
        <Image
          source={
            capo != 0
              ? guitarCapo
              : chordPosition.startHouse != 0
              ? guitarFront
              : guitarBase
          }
          style={styles.backImage}
        />

        <Image
          source={finger1}
          style={[
            chordPosition.fingers[0].size == 1
              ? styles.finger
              : styles.unactive,
            houseDict[chordPosition.fingers[0].house],
            stringDict[chordPosition.fingers[0].string],
          ]}
        />
        <Image
          source={slash2}
          style={[
            styles.slash2,
            chordPosition.fingers[0].size == 2
              ? slashHouseStyle
              : styles.unactive,
          ]}
        />
        <Image
          source={slash3}
          style={[
            styles.slash3,
            chordPosition.fingers[0].size == 3
              ? slashHouseStyle
              : styles.unactive,
          ]}
        />
        <Image
          source={slash4}
          style={[
            styles.slash4,
            chordPosition.fingers[0].size == 4
              ? slashHouseStyle
              : styles.unactive,
          ]}
        />
        <Image
          source={slash5}
          style={[
            styles.slash5,
            chordPosition.fingers[0].size == 5
              ? slashHouseStyle
              : styles.unactive,
          ]}
        />
        <Image
          source={slash6}
          style={[
            styles.slash6,
            chordPosition.fingers[0].size == 6
              ? slashHouseStyle
              : styles.unactive,
          ]}
        />

        <Image
          source={finger2}
          style={[
            styles.finger,
            houseDict[chordPosition.fingers[1].house],
            stringDict[chordPosition.fingers[1].string],
          ]}
        />
        <Image
          source={finger3}
          style={[
            styles.finger,
            houseDict[chordPosition.fingers[2].house],
            stringDict[chordPosition.fingers[2].string],
          ]}
        />
        <Image
          source={finger4}
          style={[
            styles.finger,
            houseDict[chordPosition.fingers[3].house],
            stringDict[chordPosition.fingers[3].string],
          ]}
        />
        <Image
          source={fingerP}
          style={[
            styles.finger,
            houseDict[chordPosition.fingers[4].house],
            stringDict[chordPosition.fingers[4].string],
          ]}
        />
        <Image
          source={
            chordPosition.strings[0] == "b"
              ? bassString
              : chordPosition.strings[0] == "x"
              ? noneString
              : normalString
          }
          style={styles.string1}
        />
        <Image
          source={
            chordPosition.strings[1] == "b"
              ? bassString
              : chordPosition.strings[1] == "x"
              ? noneString
              : normalString
          }
          style={styles.string2}
        />
        <Image
          source={
            chordPosition.strings[2] == "b"
              ? bassString
              : chordPosition.strings[2] == "x"
              ? noneString
              : normalString
          }
          style={styles.string3}
        />
        <Image
          source={
            chordPosition.strings[3] == "b"
              ? bassString
              : chordPosition.strings[3] == "x"
              ? noneString
              : normalString
          }
          style={styles.string4}
        />
        <Image
          source={
            chordPosition.strings[4] == "b"
              ? bassString
              : chordPosition.strings[4] == "x"
              ? noneString
              : normalString
          }
          style={styles.string5}
        />
        <Image
          source={
            chordPosition.strings[5] == "b"
              ? bassString
              : chordPosition.strings[5] == "x"
              ? noneString
              : normalString
          }
          style={styles.string6}
        />
      </View>
    </View>
  );
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
  backImage: {
    height: 110,
    width: 80,
  },
  unactive: {
    height: 0,
    width: 0,
  },
  slash2: {
    position: "absolute",
    height: 7,
    width: 22,
  },
  slash3: {
    position: "absolute",
    height: 7,
    width: 36,
  },
  slash4: {
    position: "absolute",
    height: 7,
    width: 49,
  },
  slash5: {
    position: "absolute",
    height: 7,
    width: 63,
  },
  slash6: {
    position: "absolute",
    height: 7,
    width: 79,
  },
  finger: {
    position: "absolute",
    height: 12,
    width: 12,
  },
  string1: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 2,
  },
  string2: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 15,
  },
  string3: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 29,
  },
  string4: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 42,
  },
  string5: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 56,
  },
  string6: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 0,
    right: 70,
  },
  slashHouse1: {
    position: "absolute",
    right: 1,
    top: 32,
  },
  slashHouse2: {
    position: "absolute",
    right: 1,
    top: 49,
  },
  slashHouse3: {
    position: "absolute",
    right: 1,
    top: 65,
  },
  slashHouse4: {
    position: "absolute",
    right: 1,
    top: 82,
  },
});
