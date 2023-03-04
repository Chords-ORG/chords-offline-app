import React from "react";
import { StyleSheet, Text, View, ScrollView, Animated } from "react-native";
import { Chord } from "../services/chords";
import GuitarChord from "./GuitarChord";
import PianoChord from "./PianoChord";
import { ChordsImageStateProps } from "../hooks/useChordsImageState";
import { ThemeContext } from "../providers/ThemeProvider";
import { Divider, Icon, IconButton, Stack } from "@react-native-material/core";
import { LocalSettingsContext } from "../providers/LocalSettingsProvider";

interface ChordsImagesProps {
  state: ChordsImageStateProps;
  selectedCapo?: number;
}

export default function ChordsImages({
  state,
  selectedCapo = 0,
}: ChordsImagesProps): JSX.Element {
  const { styleSheet: themeStyle, colors: themeColors } =
    React.useContext(ThemeContext);
  const { chordType, instrument } = React.useContext(LocalSettingsContext);

  const totalViewSize = instrument === "guitar" ? 150 : 100;

  const { chordsList, selectedNote, scrollRef, visible, open, close } = state;

  const viewSize = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(viewSize, {
      toValue: visible ? totalViewSize : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  return (
    <Stack
      style={{
        borderTopColor: themeColors.divider,
        borderTopWidth: 1,
      }}
    >
      <IconButton
        onPress={() => {
          if (visible) {
            close();
          } else {
            open();
          }
        }}
        icon={(props) => (
          <Icon
            name={visible ? "arrow-down-bold" : "arrow-up-bold"}
            {...props}
            color={themeColors.textSecondary}
          />
        )}
        style={{ width: "100%", height: 35 }}
      />

      <Animated.View style={[styles.chordsContainer, { height: viewSize }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
        >
          {chordsList.map((chordName, i) => {
            const selected = chordName === selectedNote;
            return (
              <View key={i} style={[styles.chordContainer]}>
                <View
                  style={[
                    styles.selectedLine,
                    {
                      borderBottomColor: selected
                        ? themeColors.textHighlight
                        : themeColors.textPrimary,
                    },
                  ]}
                />
                <Divider color={themeColors.textHighlight} />
                {instrument === "guitar" ? (
                  <GuitarChord capo={selectedCapo} chordName={chordName} />
                ) : null}
                {instrument === "piano" ? (
                  <PianoChord chordName={chordName} />
                ) : null}
                <Text
                  style={[
                    themeStyle.h3,
                    selected
                      ? themeStyle.active_color
                      : themeStyle.primary_color,
                    themeStyle.bold,
                  ]}
                >
                  {Chord.toChord(chordName, chordType)}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </Animated.View>
    </Stack>
  );
}

const styles = StyleSheet.create({
  chordsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    //height: 170,
  },
  chordContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  selectedLine: {
    width: "100%",
    borderBottomWidth: 2,
    marginTop: 5,
    marginBottom: 5,
  },
});
