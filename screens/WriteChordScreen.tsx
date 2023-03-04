import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { RootStackParamList } from "../navigation/navigationTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, HStack, Stack } from "@react-native-material/core";
import { Header } from "../components/Header";
import { ThemeContext } from "../providers/ThemeProvider";
import NumberedTextInput from "../components/NumberedTextInput";
import { Note } from "../services/chords";
import TextInput from "../components/TextInput";
import { Music, emptyMusic } from "../types";
import { getMusic } from "../services/musicStorage";
import { LocalSettingsContext } from "../providers/LocalSettingsProvider";

type ErrorType = {
  tone?: string;
  capo?: string;
};

export default function WriteChordScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "WriteChordScreen">) {
  const { musicId } = route.params;
  const [music, setMusic] = useState<Music>(emptyMusic);
  const [capo, setCapo] = useState("0");
  const [errors, setErrors] = useState<ErrorType>({});

  const { chordType } = React.useContext(LocalSettingsContext);

  const { styleSheet: themeStyle } = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (musicId) {
      getMusic(musicId).then((music) => {
        if (music) {
          setMusic(music);
          setCapo(music.capo.toString());
        }
      });
    } else {
      setMusic(emptyMusic);
      setCapo("");
    }
  }, [musicId]);

  const validate = () => {
    let errors = {};
    const toneNote = new Note(music.originalTone);
    if (!toneNote.valid) {
      errors = { ...errors, tone: "Tom inválido" };
    }
    if (isNaN(parseInt(capo)) || parseInt(capo) < 0 || parseInt(capo) > 10) {
      errors = { ...errors, capo: "Capotraste inválido" };
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return false;
    }
    return true;
  };

  const handlePreview = () => {
    if (validate()) {
      const toneNote = new Note(music.originalTone);
      navigation.push("PreviewScreen", {
        music: {
          ...music,
          capo: parseInt(capo),
          originalTone: toneNote.toString(chordType, false),
        },
      });
    }
  };

  return (
    <View>
      <Header
        onBackButtonPress={() => navigation.goBack()}
        title="Criação/Edição de cifra"
      />
      <View style={[themeStyle.content]}>
        <Button
          title="Pré-visualizar"
          color={themeStyle.button.backgroundColor}
          tintColor={themeStyle.button.color}
          onPress={handlePreview}
        />
        <ScrollView>
          <Stack style={{ margin: 5 }} p={2}>
            <TextInput
              label="Nome do autor"
              onChange={(e) =>
                setMusic((prevState) => ({
                  ...prevState,
                  author: e.nativeEvent.text,
                }))
              }
              value={music.author}
            />
            <TextInput
              label="Nome da música"
              onChange={(e) =>
                setMusic((prevState) => ({
                  ...prevState,
                  name: e.nativeEvent.text,
                }))
              }
              value={music.name}
            />
            <HStack>
              <TextInput
                label="Tom"
                onChange={(e) =>
                  setMusic((prevState) => ({
                    ...prevState,
                    originalTone: e.nativeEvent.text,
                  }))
                }
                value={music.originalTone}
                error={errors.tone}
                style={[{ width: 100 }]}
              />
              <View style={{ marginHorizontal: 20 }} />
              <TextInput
                label="Capotraste"
                onChange={(e) => setCapo(e.nativeEvent.text)}
                value={capo}
                style={[{ width: 100 }]}
                keyboardType="numeric"
                error={errors.capo}
              />
            </HStack>
            <View style={{ marginVertical: 20 }} />
            <NumberedTextInput
              label="Letra"
              onChange={(e) =>
                setMusic((prevState) => ({
                  ...prevState,
                  lyricsWithChords: e.nativeEvent.text,
                }))
              }
              value={music.lyricsWithChords}
              numberOfLines={40}
              style={{ height: 800 }}
              editable
              textAlignVertical="top"
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="ascii-capable"
              helperText="Utilize as linhas azuis para inserir os acordes e as demais linhas para a letra."
            />
          </Stack>
          <View style={{ marginVertical: 400 }} />
        </ScrollView>
      </View>
    </View>
  );
}
