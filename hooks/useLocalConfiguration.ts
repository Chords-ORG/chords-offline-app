import React from "react";
import { getItem } from "../functions/storage";

export default function useLocalConfiguration() {
    const [ loading, setLoading ] = React.useState(true);
    const [ chordType, setChordType ] = React.useState("sharp");
    const [ instrument, setInstrument ] = React.useState("guitar");
    const [ defaultCapo, setDefaultCapo ] = React.useState(0);

    const get_local_configuration = async () => {
        const chordType = await getItem("dict");
        const instrument = await getItem("instrument");
        const default_capo = await getItem("default_capo");
        return { chordType, instrument, default_capo };
    };

    React.useEffect(() => {
        get_local_configuration().then((local_configuration) => {
            setChordType(local_configuration.chordType);
            setInstrument(local_configuration.instrument);
            setDefaultCapo(local_configuration.default_capo);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);

    return { loading, chordType, instrument, defaultCapo };
}
