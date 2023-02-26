import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import CapoDialog from "../components/CapoDialog";
import ChordView from "../components/ChordsView";
import useChordsImageState from "../hooks/useChordsImageState";
import ChordsImages from "../components/ChordsImages";
import useChordsState from "../hooks/useChordsState";
import ToneDialog from "../components/ToneDialog";
import { Header } from "../components/Header";
import { ThemeContext } from "../providers/ThemeProvider";
import useModalDialogState from "../hooks/useModalDialogState";
import { Button, HStack, Spacer, Stack } from "@react-native-material/core";
import { Chord } from "../services/chords";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { RootStackParamList } from "../navigation";
import { Music } from "../types";
import { getMusic } from "../services/musicStorage";

export default function ChordScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "ChordScreen">) {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);
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

  const { rawChordList, chordsLines, capo, setCapo, tone, setTone } =
    useChordsState({
      lyrics: music?.lyricsWithChords,
      originalTone: music?.originalTone,
      originalCapo: music?.capo,
    });
  const chordsImagesState = useChordsImageState(rawChordList);
  const { chordType } = useLocalConfiguration();

  const capoDialogState = useModalDialogState();
  const toneDialogState = useModalDialogState();

  return (
    <>
      <Header
        onPressBackButton={navigation.goBack}
        title={music?.name}
        subTitle={music?.author}
      />
      <Stack style={[themeStyle.content, styles.content]}>
        <ChordsImages state={chordsImagesState} selectedCapo={capo} />
        <Stack style={themeStyle.horizontal_separator} />
        <Stack>
          <ScrollView>
            <HStack divider={<Stack style={{ width: 10 }} />} m={10}>
              <CapoDialog selectedCapo={capo} tone={tone} onSelect={setCapo} />
              <ToneDialog selectedTone={tone} onSelectTone={setTone} />
            </HStack>
            <Stack>
              <ChordView
                chordsLines={chordsLines}
                onPressNote={(chordName) =>
                  chordsImagesState.scrollToChord(chordName)
                }
              />
              <View style={{ height: 300 }} />
            </Stack>
          </ScrollView>
        </Stack>
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 5,
  },
});
