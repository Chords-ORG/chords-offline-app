import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import CapoDialog from "../components/CapoDialog";
import ChordView from "../components/ChordsView";
import useChordsImageState from "../hooks/useChordsImageState";
import ChordsImages from "../components/ChordsImages";
import useChordsState from "../hooks/useChordsState";
import ToneDialog from "../components/ToneDialog";
import { Header } from "../components/Header";
import { ThemeContext } from "../providers/ThemeProvider";
import { Button, Divider, HStack, Stack } from "@react-native-material/core";
import { Music } from "../types";
import { getMusic } from "../services/musicStorage";
import Spinner from "../components/Spinner";
import { RootStackParamList } from "../navigation/navigationTypes";
import { Note } from "../services/chords";

export default function ChordScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "ChordScreen">) {
  const { styleSheet: themeStyle, colors: themeColors } =
    React.useContext(ThemeContext);
  const { musicId, sampleMusic: isSampleMusic = false } = route.params;
  const [music, setMusic] = useState<Music | undefined>(undefined);

  const fetchMusic = React.useCallback(async () => {
    if (isSampleMusic) {
      const sampleMusic: Music = require("../assets/sample_muisc.json");
      setMusic(sampleMusic);
      return;
    }
    if (!musicId) return;

    const music = await getMusic(musicId);
    setMusic(music);
  }, [musicId, isSampleMusic, setMusic]);

  React.useEffect(() => {
    fetchMusic();
  }, [musicId, setMusic]);

  const {
    loading: loadingChords,
    stringChordList,
    chordsLines,
    capo,
    setCapo,
    tone,
    setTone,
  } = useChordsState({
    lyrics: music?.lyricsWithChords,
    originalTone: music?.originalTone.toString(),
    originalCapo: music?.capo,
  });
  const chordsImagesState = useChordsImageState(stringChordList);

  return (
    <Stack style={themeStyle.content}>
      <Header
        onBackButtonPress={navigation.goBack}
        title={music?.name || "Sem título"}
        subTitle={music?.author || "Sem autor"}
        showEditButton={music?.id !== undefined && !isSampleMusic}
        onEditButtonPress={() => {
          navigation.push("WriteChordScreen", {
            musicId: music?.id,
          });
        }}
      />
      <Spinner visible={loadingChords} />
      <ScrollView style={styles.content}>
        <HStack divider={<Stack style={{ width: 10 }} />} m={10}>
          <CapoDialog selectedCapo={capo} tone={tone} onSelect={setCapo} />
          <ToneDialog
            selectedTone={tone}
            onSelectTone={setTone}
            minor={new Note(music?.originalTone || "").minor}
          />
        </HStack>
        <Stack>
          <ChordView
            chordsLines={chordsLines}
            onPressNote={(chordName) =>
              chordsImagesState.scrollToChord(chordName)
            }
          />
          <View style={{ height: 200 }} />
        </Stack>
      </ScrollView>
      <ChordsImages state={chordsImagesState} selectedCapo={capo} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 5,
  },
});
