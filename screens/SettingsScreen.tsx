import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from "react-native";
import { SettingsStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import Spinner from "../components/Spinner";
import { Picker } from "@react-native-picker/picker";
import useLocalConfiguration from "../hooks/useLocalConfiguration";

export default function SettingsScreen({
  navigation,
}: StackScreenProps<SettingsStackParamList, "Settings">) {
  const {
    loading,
    chordType,
    instrument,
    defaultCapo,
    setChordType,
    setInstrument,
    setDefaultCapo,
  } = useLocalConfiguration();

  return (
    <View style={[styles.container, { width: "100%", height: "100%" }]}>
      <Spinner visible={loading} />
      <View style={styles.top_container}>
        <Image
          source={require("../assets/images/app_logo.png")}
          style={styles.app_logo}
        />
        <Text style={styles.app_name}> Chords </Text>
      </View>
      <TouchableOpacity
        style={styles.flaticon_container}
        onPress={() => {
          Linking.openURL("https://www.flaticon.com/br/autores/freepik");
        }}
      >
        <Text style={styles.refer_text}>
          {" "}
          Ícones feitos por<Text style={{ color: "#2F80ED" }}> FreePick </Text>
          from Flaticon
        </Text>
      </TouchableOpacity>
      <View style={styles.bottom_container}>
        <View style={styles.picker}>
          <Text style={styles.label}> Visualização de notas: </Text>
          <View style={styles.separator} />
          <Picker
            selectedValue={chordType}
            style={styles.picker_style}
            onValueChange={(itemValue) => {
              setChordType(itemValue);
            }}
          >
            <Picker.Item label="Sustenido #" value="sharp" />
            <Picker.Item label="Bemol b" value="bemol" />
          </Picker>
        </View>

        <View style={styles.picker}>
          <Text style={styles.label}> Instrumento: </Text>
          <View style={styles.separator} />
          <Picker
            selectedValue={instrument}
            style={styles.picker_style}
            onValueChange={(itemValue) => {
              setInstrument(itemValue);
            }}
          >
            <Picker.Item label="Violão/Guitarra" value="guitar" />
            <Picker.Item label="Teclado/Piano" value="piano" />
          </Picker>
        </View>

        <View style={styles.picker}>
          <Text style={styles.label}> Capotraste: </Text>
          <View style={styles.separator} />
          <Picker
            selectedValue={defaultCapo}
            style={styles.picker_style}
            onValueChange={(itemValue) => {
              setDefaultCapo(itemValue);
            }}
          >
            <Picker.Item label="Automático" value="auto" />
            <Picker.Item label="Nunca" value="never" />
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
  },
  top_container: {},
  bottom_container: {
    marginTop: 50,
  },
  app_name: {
    fontFamily: "raleway",
    fontSize: 24,
    textAlign: "center",
    color: "#000000",
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
    //fontWeight:'bold',
    color: "#828282",
    textAlign: "center",
  },
});
