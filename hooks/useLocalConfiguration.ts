import React from "react";
import { getItem, setItem } from "../functions/storage";

export default function useLocalConfiguration() {
  const [loading, setLoading] = React.useState(true);
  const [chordType, setChordTypeState] = React.useState("sharp");
  const [instrument, setInstrumentState] = React.useState("guitar");
  const [defaultCapo, setDefaultCapoState] = React.useState(0);

  const get_local_configuration = async () => {
    const chordType = await getItem("chord_type");
    const instrument = await getItem("instrument");
    const default_capo = await getItem("default_capo");
    return { chordType, instrument, default_capo };
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
        if (local_configuration.default_capo !== null) {
          setDefaultCapoState(parseInt(local_configuration.default_capo));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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
  }, []);

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
  }, []);

  const setDefaultCapo = React.useCallback((defaultCapo: number) => {
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
  }, []);

  return { loading, chordType, instrument, defaultCapo, setChordType, setInstrument, setDefaultCapo };
}
