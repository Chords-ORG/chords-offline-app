import React from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export default function useGuitarChordImages() {
  const blackGuitarBase = require("../assets/images/black_guitar_chord/guitar_base.png");
  const blackGuitarCapo = require("../assets/images/black_guitar_chord/guitar_capo.png");
  const blackGuitarFront = require("../assets/images/black_guitar_chord/guitar_front.png");

  const blackBassString = require("../assets/images/black_guitar_chord/bass_string.png");
  const blackNoneString = require("../assets/images/black_guitar_chord/none_string.png");
  const blackNormalString = require("../assets/images/black_guitar_chord/normal_string.png");

  const blackSlash2 = require("../assets/images/black_guitar_chord/slash_2.png");
  const blackSlash3 = require("../assets/images/black_guitar_chord/slash_3.png");
  const blackSlash4 = require("../assets/images/black_guitar_chord/slash_4.png");
  const blackSlash5 = require("../assets/images/black_guitar_chord/slash_5.png");
  const blackSlash6 = require("../assets/images/black_guitar_chord/slash_6.png");

  const blackFinger1 = require("../assets/images/black_guitar_chord/finger_1.png");
  const blackFinger2 = require("../assets/images/black_guitar_chord/finger_2.png");
  const blackFinger3 = require("../assets/images/black_guitar_chord/finger_3.png");
  const blackFinger4 = require("../assets/images/black_guitar_chord/finger_4.png");
  const blackFingerP = require("../assets/images/black_guitar_chord/finger_p.png");

  const whiteGuitarBase = require("../assets/images/white_guitar_chord/guitar_base.png");
  const whiteGuitarCapo = require("../assets/images/white_guitar_chord/guitar_capo.png");
  const whiteGuitarFront = require("../assets/images/white_guitar_chord/guitar_front.png");

  const whiteBassString = require("../assets/images/white_guitar_chord/bass_string.png");
  const whiteNoneString = require("../assets/images/white_guitar_chord/none_string.png");
  const whiteNormalString = require("../assets/images/white_guitar_chord/normal_string.png");

  const whiteSlash2 = require("../assets/images/white_guitar_chord/slash_2.png");
  const whiteSlash3 = require("../assets/images/white_guitar_chord/slash_3.png");
  const whiteSlash4 = require("../assets/images/white_guitar_chord/slash_4.png");
  const whiteSlash5 = require("../assets/images/white_guitar_chord/slash_5.png");
  const whiteSlash6 = require("../assets/images/white_guitar_chord/slash_6.png");

  const whiteFinger1 = require("../assets/images/white_guitar_chord/finger_1.png");
  const whiteFinger2 = require("../assets/images/white_guitar_chord/finger_2.png");
  const whiteFinger3 = require("../assets/images/white_guitar_chord/finger_3.png");
  const whiteFinger4 = require("../assets/images/white_guitar_chord/finger_4.png");
  const whiteFingerP = require("../assets/images/white_guitar_chord/finger_p.png");

  const black_images = {
    guitarBase: blackGuitarBase,
    guitarCapo: blackGuitarCapo,
    guitarFront: blackGuitarFront,
    bassString: blackBassString,
    noneString: blackNoneString,
    normalString: blackNormalString,
    slash2: blackSlash2,
    slash3: blackSlash3,
    slash4: blackSlash4,
    slash5: blackSlash5,
    slash6: blackSlash6,
    finger1: blackFinger1,
    finger2: blackFinger2,
    finger3: blackFinger3,
    finger4: blackFinger4,
    fingerP: blackFingerP,
  };

  const white_images = {
    guitarBase: whiteGuitarBase,
    guitarCapo: whiteGuitarCapo,
    guitarFront: whiteGuitarFront,
    bassString: whiteBassString,
    noneString: whiteNoneString,
    normalString: whiteNormalString,
    slash2: whiteSlash2,
    slash3: whiteSlash3,
    slash4: whiteSlash4,
    slash5: whiteSlash5,
    slash6: whiteSlash6,
    finger1: whiteFinger1,
    finger2: whiteFinger2,
    finger3: whiteFinger3,
    finger4: whiteFinger4,
    fingerP: whiteFingerP,
  };

  const { theme } = React.useContext(ThemeContext);
  return theme === "dark" ? white_images : black_images;
}
