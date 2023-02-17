import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
  Animated,
} from "react-native";
import { RootStackParamList, ChordLineType } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import Drawer from "react-native-drawer-menu";
import { Easing } from "react-native";
import {
  addToChordLines,
  noteToNumber,
  Chord,
} from "../functions/chords";
import Spinner from "../components/Spinner";
import { getItem } from "../functions/storage";
import CapoDialog from "../components/CapoDialog";
import {
  get_rate_version,
  like_version,
  unlike_version,
} from "../functions/requests";
import { light_style } from "../constants/Styles";
import { Picker } from "@react-native-picker/picker";
import ChordView from "../components/ChordsView";
import useChordsImageState from "../hooks/useChordsImageState";
import ChordsImages from "../components/ChordsImages";
import useChordsState from "../hooks/useChordsState";

export default function ChordScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "ChordScreen">) {
  const like_gray = require("../assets/images/like_icon_gray.png");
  const like_green = require("../assets/images/like_icon_green.png");
  const unlike_gray = require("../assets/images/unlike_icon_gray.png");
  const unlike_red = require("../assets/images/unlike_icon_red.png");

  const [basic_style, setBasicStyle] = useState(light_style);
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawner] = useState(drawner_holder);
  const [selectedTone, selectTone] = useState("C");
  const [selectedCapo, selectCapo] = useState(0);
  const [version, setVersion] = useState(version_sample);
  const [chords_lines, setChordsLines] = useState<ChordLineType[]>([]);
  const [dialog_visible, setDialogVisible] = useState(false);
  const [rate_type, setRateType] = useState("none");
  const [like_loading, setLikeLoading] = useState(false);
  const [dict, setDictType] = useState("sharp");
  const [instrument, setInstrument] = useState("guitar");


  const lyrics = `A      B
  RegExr was created by gskinner.com.
  C/F   G
  Edit the Expression & Text to see matches. Roll over matches or the expression for details. PCRE & JavaScript flavors of RegEx are supported. Validate your expression with Tests mode.
  C9     D#
  The side bar includes a Cheatsheet, full Reference, and Help. You can also Save & Share with the Community and view patterns you create or favorite in`;

  const { rawChordList, chordsLines } = useChordsState({ lyrics });

  const chordsImagesState = useChordsImageState(rawChordList);

  const load_data = async (chord_id: number) => {
    drawer.closeDrawer();
    setDialogVisible(false);
    setLoading(true);
    const dict = await getItem("dict");
    const instrument = await getItem("instrument");
    const default_capo = await getItem("default_capo");

    const version = {
      tone: "C",
      capo: 0,
      music: {
        name: "",
      },
      artist: {
        name: "",
      },
    };

    if (dict) setDictType(dict);
    if (instrument) setInstrument(instrument);
    selectTone(version.tone);
    if (default_capo == "auto") {
      selectCapo(version.capo);
      setChordsLines(chords_lines);
    } else {
      selectCapo(0);
      setChordsLines(addToChordLines(chords_lines, -version.capo, dict));
    }

    //load_chords(chords_lines);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      load_data(route.params.chord_id).catch((error) => {
        setLoading(false);
        Alert.alert(error.title, error.message);
      });
    });
    return unsubscribe;
  }, [navigation]);

  const drawerContent = (
    <Animated.View>
      <View style={drawner_styles.header}>
        <Text
          style={[basic_style.h1, basic_style.primary_color, basic_style.bold]}
        >
          {" "}
          Opções{" "}
        </Text>
      </View>
      <View style={[basic_style.container, { padding: 10, height: "100%" }]}>
        <ScrollView>
          {true ? null : (
            <View style={[drawner_styles.sub_header, { marginTop: 0 }]}>
              <Text
                style={[
                  basic_style.h2,
                  basic_style.primary_color,
                  basic_style.bold,
                ]}
              >
                {" "}
                Cifra{" "}
              </Text>
              <View style={basic_style.horizontal_separator} />
            </View>
          )}
          {true ? null : (
            <TouchableOpacity style={drawner_styles.button}>
              <Image
                style={drawner_styles.icon}
                source={require("../assets/images/save_icon.png")}
              />
              <Text style={drawner_styles.button_text}> Salvar Cifra </Text>
            </TouchableOpacity>
          )}
          {true ? null : (
            <TouchableOpacity
              style={drawner_styles.button}
              onPress={() => {
                //navigation.navigate('VersionStack', { screen: 'WriteChords', params: { version_id: version.id } })
              }}
            >
              <Image
                style={drawner_styles.icon}
                source={require("../assets/images/pencil_icon.png")}
              />
              <Text style={drawner_styles.button_text}>
                {" "}
                Criar cifra a partir dessa{" "}
              </Text>
            </TouchableOpacity>
          )}
          <View style={drawner_styles.sub_header}>
            <Text style={drawner_styles.h1}> Cifra </Text>
            <View style={basic_style.horizontal_separator} />
          </View>
          <View>
            {tone_lists.map((tones, i) => {
              return (
                <View style={drawner_styles.tone_buttons_container} key={i}>
                  {tones.map((tone_name, j) => {
                    let idx = i * tones.length + j;
                    return (
                      <TouchableOpacity
                        key={j}
                        style={[
                          drawner_styles.circle_button,
                          {
                            backgroundColor:
                              noteToNumber(selectedTone) == idx
                                ? "#2F80ED"
                                : "#BDBDBD",
                          },
                        ]}
                        onPress={() => {
                          let delta = idx - noteToNumber(selectedTone);
                          setChordsLines(
                            addToChordLines(chords_lines, delta, dict)
                          );
                          var chord = new Chord(selectedTone);
                          chord.add(delta);
                          selectTone(
                            dict == "sharp" ? chord.toSharp() : chord.toBemol()
                          );
                          //load_chords(chords_lines);
                          drawer.closeDrawer();
                        }}
                      >
                        <Text
                          style={[
                            basic_style.h3,
                            basic_style.bold,
                            { color: "#FFFFFF" },
                          ]}
                        >
                          {tone_name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={[
              drawner_styles.button,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
            onPress={() => {
              setDialogVisible(true);
            }}
          >
            <Text style={drawner_styles.button_text}> Capotraste </Text>
            <Text style={[drawner_styles.button_text, { color: "#2F80ED" }]}>
              {selectedCapo == 0 ? "Sem Capo" : `${selectedCapo}ª casa`}
            </Text>
          </TouchableOpacity>
          <View style={[basic_style.small_card, { justifyContent: "center" }]}>
            <Picker
              style={{
                position: "absolute",
                height: "50%",
                width: "100%",
                color: "#F2F2F2",
                alignSelf: "center",
              }}
              mode="dropdown"
              selectedValue={instrument}
              onValueChange={(
                itemValue: React.ReactText,
                itemIndex: number
              ) => {
                setInstrument(itemValue.toString());
              }}
            >
              <Picker.Item label="Violão/Guitarra" value="guitar" />
              <Picker.Item label="Piano/Teclado" value="piano" />
            </Picker>
            <Text style={[basic_style.h3, basic_style.bold]}>
              {instrument == "guitar" ? "Violão/Guitarra" : "Piano/Teclado"}
            </Text>
          </View>
          <View style={drawner_styles.sub_header}>
            <Text style={drawner_styles.h1}> Informações </Text>
            <View style={basic_style.horizontal_separator} />
          </View>

          <TouchableOpacity
            style={[
              drawner_styles.button,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
            onPress={() => {
              navigation.navigate("ArtistScreen", {
                artist_id: version.music.artist.id,
              });
            }}
          >
            <Text style={drawner_styles.button_text}> Artista </Text>
            <Text style={[drawner_styles.button_text, { color: "#2F80ED" }]}>
              {version.music.artist.name}
            </Text>
          </TouchableOpacity>
          {true ? null : (
            <TouchableOpacity
              style={[
                drawner_styles.button,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
              onPress={() => {
                navigation.navigate("ProfileScreen", {
                  username: version.author.user.username,
                });
              }}
            >
              <Text style={drawner_styles.button_text}> Autor da cifra </Text>
              <Text style={[drawner_styles.button_text, { color: "#2F80ED" }]}>
                {" "}
                {`@${version.author.user.username}`}{" "}
              </Text>
            </TouchableOpacity>
          )}
          {true ? null : (
            <View style={drawner_styles.sub_header}>
              <Text style={drawner_styles.h1}> Avalie a cifra </Text>
              <View style={basic_style.horizontal_separator} />
            </View>
          )}
          {true ? null : (
            <View style={drawner_styles.rate_container}>
              <TouchableOpacity
                onPress={() => {
                  setLikeLoading(true);
                  like_version(route.params.chord_id)
                    .then(() => {
                      get_rate_version(route.params.chord_id).then(
                        (response) => {
                          setRateType("none");
                          if (response.rate_type)
                            setRateType(response.rate_type);
                          setLikeLoading(false);
                        }
                      );
                    })
                    .catch((error) => {
                      setLikeLoading(false);
                      Alert.alert(error.title, error.message);
                    });
                }}
              >
                <Image
                  source={rate_type == "like" ? like_green : like_gray}
                  style={drawner_styles.like_icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setLikeLoading(true);
                  unlike_version(route.params.chord_id)
                    .then(() => {
                      get_rate_version(route.params.chord_id).then(
                        (response) => {
                          setRateType("none");
                          if (response.rate_type)
                            setRateType(response.rate_type);
                          setLikeLoading(false);
                        }
                      );
                    })
                    .catch((error) => {
                      setLikeLoading(false);
                      Alert.alert(error.title, error.message);
                    });
                }}
              >
                <Image
                  source={rate_type == "unlike" ? unlike_red : unlike_gray}
                  style={drawner_styles.like_icon}
                />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </Animated.View>
  );

  return (
    <Drawer
      drawerWidth={300}
      easingFunc={Easing.ease}
      ref={(drawer: any) => setDrawner(drawer)}
      drawerPosition={Drawer.positions.Right}
      drawerContent={drawerContent}
    >
      <Spinner visible={loading} />
      <CapoDialog
        visible={dialog_visible}
        closeDialog={() => setDialogVisible(false)}
        selected_capo={selectedCapo}
        tone={selectedTone}
        onSelect={(value, delta) => {
          setChordsLines(addToChordLines(chords_lines, delta, dict));
          selectCapo(value);
          // load_chords(chords_lines);
          setDialogVisible(false);
          drawer.closeDrawer();
        }}
      />
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              style={styles.icon}
              source={require("../assets/images/back_icon.png")}
            />
          </TouchableOpacity>
          <Image
            style={styles.logo}
            source={require("../assets/images/app_logo.png")}
          />
          <Text
            style={[
              basic_style.h1,
              basic_style.primary_color,
              basic_style.bold,
            ]}
          >
            {" "}
            Chords{" "}
          </Text>
        </View>
        <TouchableOpacity
          onPress={drawer.openDrawer}
          style={styles.options_button}
        >
          <Image
            style={styles.icon}
            source={require("../assets/images/menu_icon.png")}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          basic_style.container,
          { padding: 15, width: "100%", height: "100%" },
        ]}
      >
        <ChordsImages state={chordsImagesState} />
        <View style={basic_style.horizontal_separator} />
        <View style={basic_style.container}>
          <ChordView
            chordsLines={chordsLines}
            musicName="Music Name"
            artistName="Artist Name"
            selectedTone={selectedTone}
            selectedCapo={selectedCapo}
            onPressTone={() => {
              drawer.openDrawer();
            }}
            onPressCapo={() => {
              setDialogVisible(true);
            }}
            onPressNote={(chordName) =>
              chordsImagesState.scrollToChord(chordName)
            }
          />
        </View>
      </View>
    </Drawer>
  );
}

const tone_lists = [
  ["C", "C#", "D", "D#", "E", "F"],
  ["F#", "G", "G#", "A", "A#", "B"],
];

const chord_list = ["C#m7", "C", "C", "C", "C", "C", "C", "C", "C"];

const version_sample = {
  id: 1,
  tone: "C",
  capo: 1,
  name: "",
  author: {
    name: "",
    user: {
      username: "",
    },
  },
  music: {
    name: "",
    artist: {
      id: 4,
      name: "",
    },
  },
};
const drawner_holder = {
  openDrawer: () => null,
  closeDrawer: () => null,
};
const scroll_holder = {
  scrollTo: (arg: any) => null,
  scrollToEnd: (arg: any) => null,
};
const drawner_styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    padding: 10,
  },
  header: {
    backgroundColor: "#fff",
    height: 85,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 35,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    shadowColor: "#000",
    justifyContent: "space-between",
    //borderBottomWidth:1,
  },
  title: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "raleway",
  },
  h1: {
    fontFamily: "roboto-bold",
    fontSize: 16,
    color: "#333333",
  },
  button: {
    width: "100%",
    borderRadius: 5,
    height: 50,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    marginTop: 10,
  },
  circle_button: {
    height: 35,
    width: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button_text: {
    fontFamily: "roboto-bold",
    fontSize: 14,
    color: "#333333",
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  sub_header: {
    marginBottom: 10,
    marginTop: 30,
  },
  tone_buttons_container: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
  },
  rate_container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  like_icon: {
    height: 40,
    width: 40,
    margin: 10,
  },
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    height: 85,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 35,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    shadowColor: "#000",
    justifyContent: "space-between",
    //borderBottomWidth:1,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
  chords_container: {
    flexDirection: "row",
    paddingBottom: 10,
    //height: 170,
  },
  arrow_icon: {
    height: 13,
    width: 20,
    alignSelf: "center",
  },
  chord_container: {
    alignItems: "center",
    marginRight: 20,
  },
  arrow_container: {
    width: "100%",
  },
  left: {
    flex: 2,
  },
  right: {
    flex: 1,
  },
  header_container: {
    flexDirection: "row",
    paddingTop: 10,
  },
  options_button: {
    alignSelf: "center",
  },
  tone_container: {
    paddingTop: 20,
  },
  drawer: {},
});
