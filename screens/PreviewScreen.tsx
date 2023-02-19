import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Music } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import ChordView from "../components/ChordsView";
import useChordsState from "../hooks/useChordsState";
import { Header } from "../components/Header";
import { Button, Stack, Text } from "@react-native-material/core";
import { ThemeContext } from "../providers/ThemeProvider";
import { saveMusic } from "../services/musicStorage";
import { RootStackParamList } from "../navigation";

export default function PreviewScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "PreviewScreen">) {
  const {
    lyrics,
    authorName,
    musicName,
    tone: originalTone,
    capo: originalCapo,
  } = route.params;
  const { chordsLines, capo, tone } = useChordsState({
    lyrics,
    originalTone: originalTone,
    originalCapo: originalCapo,
  });

  const { styleSheet: themeStyle } = React.useContext(ThemeContext);

  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    const music: Music = {
      lyricsWithChords: lyrics,
      author: authorName,
      name: musicName,
      originalTone: originalTone,
      capo: originalCapo,
    };
    try {
      setLoading(true);
      await saveMusic(music);
      setLoading(false);
      Alert.alert("Sucesso", "Cifra salva com sucesso!");
      navigation.push("Root");
    } catch (err) {
      setLoading(false);
      Alert.alert("Erro", "Erro ao salvar cifra!");
    }
  };

  return (
    <View>
      <Header
        onPressBackButton={() => navigation.goBack()}
        title={`${authorName} (Pré-visualização)`}
        subTitle={musicName}
      />
      <Button
        title="Salvar cifra"
        color={themeStyle.active_color.color}
        tintColor={themeStyle.tint_color.color}
        onPress={handleSave}
      />
      <View style={[themeStyle.content]}>
        <ScrollView>
          <Text style={themeStyle.primary_color}>Tom: {tone}</Text>
          <Text style={themeStyle.primary_color}>
            Capotraste: {capo === 0 ? "Sem capotraste\n" : `${capo}ª casa\n`}
          </Text>
          <Stack>
            <ChordView chordsLines={chordsLines} />
            <View style={{ height: 300 }} />
          </Stack>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  lyric_text: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  option_container: {
    marginRight: 20,
  },
  label: {
    fontSize: 14,
  },
  button_container: {
    justifyContent: "center",
    backgroundColor: "#2F80ED",
    width: 120,
    height: 40,
    borderRadius: 5,
    marginTop: 2,
  },
  button_text: {
    color: "#F2F2F2",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
