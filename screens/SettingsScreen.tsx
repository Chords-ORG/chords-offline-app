import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Spinner from "../components/Spinner";
import { Picker } from "@react-native-picker/picker";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { ThemeContext } from "../providers/ThemeProvider";
import { Pressable, Stack, Text } from "@react-native-material/core";
import { Header } from "../components/Header";
import { SettingsStackParamList } from "../navigation/SettingsStack";

export default function SettingsScreen({}: StackScreenProps<
  SettingsStackParamList,
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
  } = useLocalConfiguration();

  const { styleSheet: themeStyle, toggleTheme } =
    React.useContext(ThemeContext);

  return (
    <View>
      <Header title="Configurações" showLogo={false} />
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

        <Stack spacing={20} mt={50}>
          <Stack>
            <Text style={{ color: themeStyle.secondary_color.color }}>
              Visualização de notas
            </Text>
            <Picker
              selectedValue={chordType}
              style={{ color: themeStyle.primary_color.color }}
              dropdownIconColor={themeStyle.primary_color.color}
              onValueChange={(itemValue) => {
                setChordType(itemValue);
              }}
              placeholder="Visualização de notas"
              accessibilityLabel="Visualização de notas"
            >
              <Picker.Item label="Sustenido #" value="sharp" />
              <Picker.Item label="Bemol b" value="bemol" />
            </Picker>
          </Stack>

          <Stack style={styles.picker}>
            <Text style={{ color: themeStyle.secondary_color.color }}>
              {" "}
              Instrumento:{" "}
            </Text>
            <Picker
              selectedValue={instrument}
              style={{ color: themeStyle.primary_color.color }}
              dropdownIconColor={themeStyle.primary_color.color}
              onValueChange={(itemValue) => {
                setInstrument(itemValue);
              }}
            >
              <Picker.Item label="Violão/Guitarra" value="guitar" />
              <Picker.Item label="Teclado/Piano" value="piano" />
            </Picker>
          </Stack>

          <Stack style={styles.picker}>
            <Text style={{ color: themeStyle.secondary_color.color }}>
              {" "}
              Capotraste:{" "}
            </Text>
            <Picker
              selectedValue={capoConfig}
              style={{ color: themeStyle.primary_color.color }}
              dropdownIconColor={themeStyle.primary_color.color}
              onValueChange={(itemValue) => {
                setCapoConfig(itemValue);
              }}
            >
              <Picker.Item label="Automático" value="auto" />
              <Picker.Item label="Nunca" value="never" />
            </Picker>
          </Stack>

          <Stack style={styles.picker}>
            <Text style={{ color: themeStyle.secondary_color.color }}>
              {" "}
              Esquema de cores:{" "}
            </Text>
            <Picker
              selectedValue={localColorScheme}
              style={{ color: themeStyle.primary_color.color }}
              dropdownIconColor={themeStyle.primary_color.color}
              onValueChange={(itemValue) => {
                setLocalColorScheme(itemValue);
                toggleTheme();
              }}
            >
              <Picker.Item label="Sistema" value="system" />
              <Picker.Item label="Claro" value="light" />
              <Picker.Item label="Escuro" value="dark" />
            </Picker>
          </Stack>
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
