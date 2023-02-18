import React from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export default function useGuitarChordImages() {
  const black_guitar_base = require("../assets/images/black_guitar_chord/guitar_base.png");
  const black_guitar_capo = require("../assets/images/black_guitar_chord/guitar_capo.png");
  const black_guitar_front = require("../assets/images/black_guitar_chord/guitar_front.png");

  const black_bass_string = require("../assets/images/black_guitar_chord/bass_string.png");
  const black_none_string = require("../assets/images/black_guitar_chord/none_string.png");
  const black_normal_string = require("../assets/images/black_guitar_chord/normal_string.png");

  const black_slash_2 = require("../assets/images/black_guitar_chord/slash_2.png");
  const black_slash_3 = require("../assets/images/black_guitar_chord/slash_3.png");
  const black_slash_4 = require("../assets/images/black_guitar_chord/slash_4.png");
  const black_slash_5 = require("../assets/images/black_guitar_chord/slash_5.png");
  const black_slash_6 = require("../assets/images/black_guitar_chord/slash_6.png");

  const black_finger_1 = require("../assets/images/black_guitar_chord/finger_1.png");
  const black_finger_2 = require("../assets/images/black_guitar_chord/finger_2.png");
  const black_finger_3 = require("../assets/images/black_guitar_chord/finger_3.png");
  const black_finger_4 = require("../assets/images/black_guitar_chord/finger_4.png");
  const black_finger_p = require("../assets/images/black_guitar_chord/finger_p.png");

  const white_guitar_base = require("../assets/images/white_guitar_chord/guitar_base.png");
  const white_guitar_capo = require("../assets/images/white_guitar_chord/guitar_capo.png");
  const white_guitar_front = require("../assets/images/white_guitar_chord/guitar_front.png");

  const white_bass_string = require("../assets/images/white_guitar_chord/bass_string.png");
  const white_none_string = require("../assets/images/white_guitar_chord/none_string.png");
  const white_normal_string = require("../assets/images/white_guitar_chord/normal_string.png");

  const white_slash_2 = require("../assets/images/white_guitar_chord/slash_2.png");
  const white_slash_3 = require("../assets/images/white_guitar_chord/slash_3.png");
  const white_slash_4 = require("../assets/images/white_guitar_chord/slash_4.png");
  const white_slash_5 = require("../assets/images/white_guitar_chord/slash_5.png");
  const white_slash_6 = require("../assets/images/white_guitar_chord/slash_6.png");

  const white_finger_1 = require("../assets/images/white_guitar_chord/finger_1.png");
  const white_finger_2 = require("../assets/images/white_guitar_chord/finger_2.png");
  const white_finger_3 = require("../assets/images/white_guitar_chord/finger_3.png");
  const white_finger_4 = require("../assets/images/white_guitar_chord/finger_4.png");
  const white_finger_p = require("../assets/images/white_guitar_chord/finger_p.png");

  const black_images = {
    guitar_base: black_guitar_base,
    guitar_capo: black_guitar_capo,
    guitar_front: black_guitar_front,
    bass_string: black_bass_string,
    none_string: black_none_string,
    normal_string: black_normal_string,
    slash_2: black_slash_2,
    slash_3: black_slash_3,
    slash_4: black_slash_4,
    slash_5: black_slash_5,
    slash_6: black_slash_6,
    finger_1: black_finger_1,
    finger_2: black_finger_2,
    finger_3: black_finger_3,
    finger_4: black_finger_4,
    finger_p: black_finger_p,
  };

  const white_images = {
    guitar_base: white_guitar_base,
    guitar_capo: white_guitar_capo,
    guitar_front: white_guitar_front,
    bass_string: white_bass_string,
    none_string: white_none_string,
    normal_string: white_normal_string,
    slash_2: white_slash_2,
    slash_3: white_slash_3,
    slash_4: white_slash_4,
    slash_5: white_slash_5,
    slash_6: white_slash_6,
    finger_1: white_finger_1,
    finger_2: white_finger_2,
    finger_3: white_finger_3,
    finger_4: white_finger_4,
    finger_p: white_finger_p,
  };

  const { theme } = React.useContext(ThemeContext);
  return theme === "dark" ? white_images : black_images;
}
