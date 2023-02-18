import React from "react";
import { getItem, setItem } from "../functions/storage";
import {
  CAPO_CONFIG_KEY,
  CHORD_TYPE_KEY,
  CapoConfig,
  ChordType,
  INSTRUMENT_KEY,
  Instrument,
  LOCAL_COLOR_SCHEME_KEY,
  LocalColorScheme,
  LocalSettingsContext,
} from "../providers/LocalSettingsProvider";

export default function useLocalConfiguration() {
  const {
    chordType,
    instrument,
    capoConfig,
    localColorScheme,
    toggleLocalSettings,
  } = React.useContext(LocalSettingsContext);

  const setChordType = React.useCallback(
    (chordType: ChordType) => {
      setItem(CHORD_TYPE_KEY, chordType);
      return toggleLocalSettings();
    },
    [toggleLocalSettings]
  );

  const setInstrument = React.useCallback(
    (instrument: Instrument) => {
      setItem(INSTRUMENT_KEY, instrument);
      return toggleLocalSettings();
    },
    [toggleLocalSettings]
  );

  const setCapoConfig = React.useCallback(
    (capoConfig: CapoConfig) => {
      setItem(CAPO_CONFIG_KEY, capoConfig);
      return toggleLocalSettings();
    },
    [toggleLocalSettings]
  );

  const setLocalColorScheme = React.useCallback(
    (colorScheme: LocalColorScheme) => {
      setItem(LOCAL_COLOR_SCHEME_KEY, colorScheme);
      return toggleLocalSettings();
    },
    [toggleLocalSettings]
  );

  return {
    chordType,
    instrument,
    capoConfig,
    localColorScheme,
    setChordType,
    setInstrument,
    setCapoConfig,
    setLocalColorScheme,
  };
}
