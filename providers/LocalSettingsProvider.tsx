import React from "react";
import { LightStyle, DarkStyle } from "../constants/Styles";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { useColorScheme } from "react-native";
import { getItem } from "../functions/storage";

export type ChordType = "sharp" | "bemol";
export type Instrument = "guitar" | "piano";
export type CapoConfig = "auto" | "never";
export type LocalColorScheme = "system" | "light" | "dark";

export const CHORD_TYPE_KEY = "chordType";
export const INSTRUMENT_KEY = "instrument";
export const CAPO_CONFIG_KEY = "capoConfig";
export const LOCAL_COLOR_SCHEME_KEY = "localColorScheme";

interface LocalSettingsContextProps {
  chordType: ChordType;
  instrument: Instrument;
  capoConfig: CapoConfig;
  localColorScheme: LocalColorScheme;
  toggleLocalSettings: () => Promise<void>;
}

export const LocalSettingsContext =
  React.createContext<LocalSettingsContextProps>({
    chordType: "sharp",
    instrument: "guitar",
    capoConfig: "auto",
    localColorScheme: "system",
    toggleLocalSettings: async () => {},
  });

interface LocalSettingsProviderProps {
  children: React.ReactNode;
}

export const LocalSettingsProvider = ({
  children,
}: LocalSettingsProviderProps) => {
  const [chordType, setChordTypeState] = React.useState<ChordType>("sharp");
  const [instrument, setInstrumentState] = React.useState<Instrument>("guitar");
  const [capoConfig, setCapoConfigState] = React.useState<CapoConfig>("auto");
  const [localColorScheme, setLocalColorSchemeState] =
    React.useState<LocalColorScheme>("system");

  const getLocalConfiguration = async () => {
    const chordType = await getItem(CHORD_TYPE_KEY);
    const instrument = await getItem(INSTRUMENT_KEY);
    const capoConfig = await getItem(CAPO_CONFIG_KEY);
    const localColorScheme = await getItem(LOCAL_COLOR_SCHEME_KEY);
    return { chordType, instrument, capoConfig, localColorScheme };
  };

  const toggleLocalSettings = React.useCallback(async () => {
    const localConfiguration = await getLocalConfiguration();
    if (localConfiguration.chordType !== null) {
      setChordTypeState(localConfiguration.chordType as ChordType);
    }
    if (localConfiguration.instrument !== null) {
      setInstrumentState(localConfiguration.instrument as Instrument);
    }
    if (localConfiguration.capoConfig !== null) {
      setCapoConfigState(localConfiguration.capoConfig as CapoConfig);
    }
    if (localConfiguration.localColorScheme !== null) {
      setLocalColorSchemeState(
        localConfiguration.localColorScheme as LocalColorScheme
      );
    }
  }, [
    setChordTypeState,
    setInstrumentState,
    setCapoConfigState,
    setLocalColorSchemeState,
  ]);

  React.useEffect(() => {
    toggleLocalSettings();
  }, []);

  return (
    <LocalSettingsContext.Provider
      value={{
        chordType,
        instrument,
        capoConfig,
        localColorScheme,
        toggleLocalSettings,
      }}
    >
      {children}
    </LocalSettingsContext.Provider>
  );
};
