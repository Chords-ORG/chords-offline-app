import React from "react";
import { StyleSheet, View, Image, Linking } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../providers/ThemeProvider";
import { Pressable, Stack, Text } from "@react-native-material/core";
import { Header } from "../components/Header";
import {
  CapoConfig,
  ChordType,
  Instrument,
  LocalColorScheme,
  LocalSettingsContext,
} from "../providers/LocalSettingsProvider";
import Picker from "../components/Picker";
import { BottomTabParamList } from "../navigation/BottomTabNavigator";

export default function SettingsScreen({}: StackScreenProps<
  BottomTabParamList,
  "Settings"
>) {
  const {
    chordType,
    instrument,
    capoConfig,
    localColorScheme,
    setChordType,
    setInstrument,
    setCapoConfig,
    setLocalColorScheme,
  } = React.useContext(LocalSettingsContext);

  const { styleSheet: themeStyle } = React.useContext(ThemeContext);

  const updateTheme = async (newTheme: LocalColorScheme) => {
    await setLocalColorScheme(newTheme);
  };

  return (
    <View>
      <Header title="Configurações" showLogo={false} showBackButton={false} />
      <Stack style={[styles.content, themeStyle.content]}>
        <Stack>
          <Image
            source={require("../assets/images/app_logo.png")}
            style={styles.app_logo}
          />
          <Text
            style={[styles.app_name, { color: themeStyle.primary_color.color }]}
          >
            Chords
          </Text>
        </Stack>
        <Pressable
          style={styles.flaticon_container}
          onPress={() => {
            Linking.openURL("https://www.flaticon.com/br/autores/freepik");
          }}
        >
          <Text
            style={[
              styles.refer_text,
              { color: themeStyle.secondary_color.color },
            ]}
          >
            Ícones feitos por
            <Text style={{ color: "#2F80ED" }}> FreePick </Text>
            from Flaticon
          </Text>
        </Pressable>
        <Stack mt={50} divider={<View style={{ marginTop: 5 }} />}>
          <Picker
            label="Visualização de notas"
            items={[
              { label: "Sustenido #", value: "sharp" },
              { label: "Bemol b", value: "bemol" },
            ]}
            selectedValue={chordType}
            onValueChange={(itemValue: ChordType) => {
              setChordType(itemValue);
            }}
          />
          <Picker
            label="Instrumento"
            items={[
              { label: "Violão/Guitarra", value: "guitar" },
              { label: "Teclado/Piano", value: "piano" },
            ]}
            selectedValue={instrument}
            onValueChange={(itemValue: Instrument) => {
              setInstrument(itemValue);
            }}
          />
          <Picker
            label="Capotraste"
            items={[
              { label: "Automático", value: "auto" },
              { label: "Nunca", value: "never" },
            ]}
            selectedValue={capoConfig}
            onValueChange={(itemValue: CapoConfig) => {
              setCapoConfig(itemValue);
            }}
          />
          <Picker
            label="Esquema de cores"
            items={[
              { label: "Sistema", value: "system" },
              { label: "Claro", value: "light" },
              { label: "Escuro", value: "dark" },
            ]}
            selectedValue={localColorScheme}
            onValueChange={updateTheme}
          />
        </Stack>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 15,
  },
  bottom_container: {
    marginTop: 50,
  },
  app_name: {
    fontFamily: "raleway",
    fontSize: 24,
    textAlign: "center",
  },
  app_logo: {
    height: 90,
    width: 90,
    alignSelf: "center",
  },
  version: {
    fontFamily: "raleway",
    fontSize: 16,
    textAlign: "center",
    color: "#000000",
  },
  label: {
    fontFamily: "roboto-bold",
    color: "#333333",
    fontSize: 14,
  },
  picker_style: {
    height: 50,
    width: "100%",
    color: "#4F4F4F",
  },
  picker_text: {
    fontFamily: "roboto",
    fontSize: 12,
  },
  separator: {
    height: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
  },
  picker: {
    marginBottom: 20,
  },
  flaticon_container: {
    marginTop: 20,
    alignSelf: "center",
  },
  refer_text: {
    fontFamily: "roboto",
    fontSize: 14,
    textAlign: "center",
  },
});
