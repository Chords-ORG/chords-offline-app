import React from "react";
import { getItem, setItem } from "../functions/storage";

type ColorScheme = "light" | "dark" | "system"
export default function useLocalConfiguration() {
  const [loading, setLoading] = React.useState(true);
  const [chordType, setChordTypeState] = React.useState("sharp");
  const [instrument, setInstrumentState] = React.useState("guitar");
  const [defaultCapo, setDefaultCapoState] = React.useState("auto");
  const [colorScheme, setColorSchemeState] = React.useState<ColorScheme>("system");

  const get_local_configuration = async () => {
    const chordType = await getItem("chord_type");
    const instrument = await getItem("instrument");
    const defaultCapo = await getItem("default_capo");
    const colorScheme = await getItem("color_scheme");
    return { chordType, instrument, defaultCapo, colorScheme };
  };

  React.useEffect(() => {
    get_local_configuration()
      .then((local_configuration) => {
        if (local_configuration.chordType !== null) {
          setChordTypeState(local_configuration.chordType);
        }
        if (local_configuration.instrument !== null) {
          setInstrumentState(local_configuration.instrument);
        }
        if (local_configuration.defaultCapo !== null) {
          setDefaultCapoState(local_configuration.defaultCapo);
        }
        if (local_configuration.colorScheme !== null) {
          setColorSchemeState(local_configuration.colorScheme as ColorScheme);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [loading, setLoading, setChordTypeState, setInstrumentState, setDefaultCapoState]);

  const setChordType = React.useCallback((chordType: string) => {
    setLoading(true);
    setItem("chord_type", chordType)
      .then(() => {
        setChordTypeState(chordType);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  }, [setLoading, setChordTypeState]);

  const setInstrument = React.useCallback((instrument: string) => {
    setLoading(true);
    setItem("instrument", instrument)
      .then(() => {
        setInstrumentState(instrument);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  }, [setLoading, setInstrumentState]);

  const setDefaultCapo = React.useCallback((defaultCapo: string) => {
    setLoading(true);
    setItem("default_capo", defaultCapo.toString())
      .then(() => {
        setDefaultCapoState(defaultCapo);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  }, [setLoading, setDefaultCapoState]);

  const setColorScheme = React.useCallback((colorScheme: "light" | "dark" | "system") => {
    setLoading(true);
    setItem("color_scheme", colorScheme)
      .then(() => {
        setColorSchemeState(colorScheme);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  }, [setLoading, setColorSchemeState]);

  return {
    loading,
    chordType,
    instrument,
    defaultCapo,
    colorScheme,
    setChordType,
    setInstrument,
    setDefaultCapo,
    setColorScheme,
  };
}
