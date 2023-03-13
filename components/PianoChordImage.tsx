import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

export interface PianoChordImageProps {
  fingers: string[];
}

export default function PianoChordImage({ fingers }: PianoChordImageProps) {
  const pianoBack = require("../assets/images/piano_chord/piano_back.png");
  const blackFinger = require("../assets/images/piano_chord/black_finger.png");
  const whiteFinger = require("../assets/images/piano_chord/white_finger.png");

  const whiteFingersHouses = [2, 4, 7, 9, 11, 14, 16, 19, 21, 23, 26, 28];
  return (
    <View style={styles.container}>
      <Image source={pianoBack} style={styles.pianoBack} />
      {fingers.map((_house: string, i: number) => {
        const house = parseInt(_house);
        return (
          <Image
            key={i}
            source={
              whiteFingersHouses.includes(house) ? whiteFinger : blackFinger
            }
            style={fingerStyles[house]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 200,
  },
  message: {
    fontFamily: "roboto-bold",
    fontSize: 12,
    textAlign: "center",
  },
  pianoBack: {
    height: 50,
    width: 200,
  },
  finger0: {
    position: "absolute",
    height: 8,
    width: 8,
  },
  finger1: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 2,
  },
  finger2: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 8,
  },
  finger3: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 14,
  },
  finger4: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 20,
  },
  finger5: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 26,
  },
  finger6: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 37,
  },
  finger7: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 43,
  },
  finger8: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 49,
  },
  finger9: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 55,
  },
  finger10: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 61,
  },
  finger11: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 67,
  },
  finger12: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 73,
  },
  finger13: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 85,
  },
  finger14: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 90,
  },
  finger15: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 96,
  },
  finger16: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 102,
  },
  finger17: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 108,
  },
  finger18: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 120,
  },
  finger19: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 125,
  },
  finger20: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 132,
  },
  finger21: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 137,
  },
  finger22: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 143,
  },
  finger23: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 149,
  },
  finger24: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 155,
  },
  finger25: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 167,
  },
  finger26: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 173,
  },
  finger27: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 179,
  },
  finger28: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 20,
    left: 185,
  },
  finger29: {
    position: "absolute",
    height: 8,
    width: 8,
    bottom: 2,
    left: 190,
  },
  finger30: {
    position: "absolute",
    height: 0,
    width: 0,
  },
});

const fingerStyles = [
  styles.finger0,
  styles.finger1,
  styles.finger2,
  styles.finger3,
  styles.finger4,
  styles.finger5,
  styles.finger6,
  styles.finger7,
  styles.finger8,
  styles.finger9,
  styles.finger10,
  styles.finger11,
  styles.finger12,
  styles.finger13,
  styles.finger14,
  styles.finger15,
  styles.finger16,
  styles.finger17,
  styles.finger18,
  styles.finger19,
  styles.finger20,
  styles.finger21,
  styles.finger22,
  styles.finger23,
  styles.finger24,
  styles.finger25,
  styles.finger26,
  styles.finger27,
  styles.finger28,
  styles.finger29,
  styles.finger30,
];
