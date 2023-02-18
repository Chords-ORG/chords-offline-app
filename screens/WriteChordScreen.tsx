import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import {
  AppBar,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Stack,
  TextInput,
} from "@react-native-material/core";
import { Header } from "../components/Header";
import { ThemeContext } from "../providers/ThemeProvider";
import NumberedTextInput from "../components/NumberedTextInput";

export default function WriteChordScreen({
  navigation,
}: StackScreenProps<RootStackParamList>) {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);
  const [authorName, setAuthorName] = useState("");
  const [musicName, setMusicName] = useState("");
  const [tone, setTone] = useState("C");
  const [capo, setCapo] = useState("0");
  const [lyrics, setLyrics] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
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
      <Button
        title="Pré-visualizar"
        color={themeStyle.active_color.color}
        tintColor={themeStyle.tint_color.color}
        onPress={handlePreview}
      />
      <ScrollView style={styles.container}>
        <Stack spacing={2} style={{ margin: 5 }}>
          <TextInput
            label="Nome do autor"
            variant="outlined"
            onChange={(e) => setAuthorName(e.nativeEvent.text)}
            value={authorName}
            color={themeStyle.active_color.color}
          />
          <TextInput
            label="Nome da música"
            variant="outlined"
            onChange={(e) => setMusicName(e.nativeEvent.text)}
            value={musicName}
            color={themeStyle.active_color.color}
          />
          <View style={{ marginVertical: 20 }} />
          <HStack>
            <TextInput
              label="Tom"
              variant="outlined"
              onChange={(e) => setTone(e.nativeEvent.text)}
              value={tone}
              color={themeStyle.active_color.color}
              style={{ width: 100 }}
            />
            <View style={{ marginHorizontal: 20 }} />
            <TextInput
              label="Capotraste"
              variant="outlined"
              onChange={(e) => setCapo(e.nativeEvent.text)}
              value={capo}
              color={themeStyle.active_color.color}
              style={{ width: 100 }}
              keyboardType="numeric"
            />
          </HStack>
          <View style={{ marginVertical: 20 }} />
          <NumberedTextInput
            label="Letra"
            variant="outlined"
            onChange={(e) => setLyrics(e.nativeEvent.text)}
            value={lyrics}
            color={themeStyle.active_color.color}
            numberOfLines={40}
            style={{ height: 800 }}
            editable
            textAlignVertical="top"
            autoComplete="off"
            helperText="As linhas marcadas em azul representam os acordes, as cinza é referente a letra"
          />
        </Stack>
        <View style={{ marginVertical: 50 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  lyric_text: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  input_style: {
    color: "blue",
    borderColor: "gray",
    borderWidth: 0.5,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "monospace",
    alignContent: "flex-start",
  },
  button_container: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#2F80ED",
    width: 100,
    height: 30,
    margin: 20,
    borderRadius: 5,
  },
  button_text: {
    color: "#F2F2F2",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
});
