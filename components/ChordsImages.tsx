import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { Chord } from "../functions/chords";
import GuitarChord from "./GuitarChord";
import PianoChord from "./PianoChord";
import { ChordsImageStateProps } from "../hooks/useChordsImageState";

interface ChordsImagesProps {
  state: ChordsImageStateProps;
  selectedCapo?: number;
}

export default function ChordsImages({
  state,
  selectedCapo = 0,
}: ChordsImagesProps): JSX.Element {
  const up_arrow = require("../assets/images/up_arrow.png");
  const down_arrow = require("../assets/images/down_arrow.png");
  const basic_style = useAdaptativeStyle();
  const { chordType, instrument } = useLocalConfiguration();

  const { chordsList, selectedNote, scrollRef, visible, open, close } = state;

  return (
    <>
      <View style={styles.chords_container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
        >
          {chordsList.map((chordName, i) => {
            const selected = chordName === selectedNote;
              console.log(instrument)
            return (
              <View
                key={chordName}
                style={[
                  styles.chord_container,
                  { height: visible ? undefined : 0 },
                ]}
              >
                {instrument === "guitar" ? (
                  <GuitarChord Capo={selectedCapo} ChordName={chordName} />
                ) : null}
                {instrument === "piano" ? (
                  <PianoChord ChordName={chordName} />
                ) : null}
                <Text
                  style={[
                    basic_style.h3,
                    selected
                      ? basic_style.active_color
                      : basic_style.primary_color,
                    basic_style.bold,
                  ]}
                >
                  {" "}
                  {Chord.toChord(chordName, chordType)}{" "}
                </Text>
                {selected ? <View style={basic_style.selected_line} /> : null}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (visible) {
            close();
          } else {
            open();
          }
        }}
        style={{
          width: "100%",
        }}
      >
        <Image
          style={styles.arrow_icon}
          source={visible ? up_arrow : down_arrow}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  chords_container: {
    flexDirection: "row",
    paddingBottom: 10,
    //height: 170,
  },
  chord_container: {
    alignItems: "center",
    marginRight: 20,
  },
  arrow_icon: {
    height: 13,
    width: 20,
    alignSelf: "center",
  },
});