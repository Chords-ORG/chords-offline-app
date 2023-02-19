import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { RootStackParamList } from "../navigation";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Button,
  HStack,
  Stack,
} from "@react-native-material/core";
import { Header } from "../components/Header";
import { ThemeContext } from "../providers/ThemeProvider";
import NumberedTextInput from "../components/NumberedTextInput";
import { Chord } from "../services/chords";
import TextInput from "../components/TextInput";

type ErrorType = {
  tone?: string;
  capo?: string;
};

export default function WriteChordScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);
  const [authorName, setAuthorName] = useState("");
  const [musicName, setMusicName] = useState("");
  const [tone, setTone] = useState("C");
  const [capo, setCapo] = useState("0");
  const [lyrics, setLyrics] = useState("");
  const [errors, setErrors] = useState<ErrorType>({});

  const validate = () => {
    let errors = {};
    if (new Chord(tone).valid === false) {
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
      navigation.push("PreviewScreen", {
        lyrics,
        musicName,
        authorName,
        tone,
        capo: parseInt(capo),
      });
    }
  };

  return (
    <View>
      <Header
        onPressBackButton={() => navigation.goBack()}
        title="Criação de cifra"
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
              onChange={(e) => setAuthorName(e.nativeEvent.text)}
              value={authorName}
            />
            <TextInput
              label="Nome da música"
              onChange={(e) => setMusicName(e.nativeEvent.text)}
              value={musicName}
            />
            <HStack>
              <TextInput
                label="Tom"
                onChange={(e) => setTone(e.nativeEvent.text)}
                value={tone}
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
              onChange={(e) => setLyrics(e.nativeEvent.text)}
              value={lyrics}
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
