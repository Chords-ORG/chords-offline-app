import React, { useState } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { GuitarChordPropsType } from '../types'
import { TouchableOpacity } from 'react-native-gesture-handler'

var houseDict = new Map()
houseDict.set(0, { height: 0, width: 0 });
houseDict.set(1, { top: 30 });
houseDict.set(2, { top: 47 });
houseDict.set(3, { top: 63 });
houseDict.set(4, { top: 80 });
houseDict.set(5, { top: 97 });

var stringDict = new Map()
stringDict.set(0, { height: 0, width: 0 });
stringDict.set(1, { right: 1 });
stringDict.set(2, { right: 15 });
stringDict.set(3, { right: 28 });
stringDict.set(4, { right: 41 });
stringDict.set(5, { right: 55 });
stringDict.set(6, { right: 68 });

export default function GuitarChord(props: GuitarChordPropsType) {

    const guitar_base = require('../assets/images/guitar_base.png')
    const guitar_capo = require('../assets/images/guitar_capo.png')
    const guitar_front = require('../assets/images/guitar_front.png')

    const bass_string = require('../assets/images/bass_string.png')
    const none_string = require('../assets/images/none_string.png')
    const normal_string = require('../assets/images/normal_string.png')

    const slash_2 = require('../assets/images/slash_2.png')
    const slash_3 = require('../assets/images/slash_3.png')
    const slash_4 = require('../assets/images/slash_4.png')
    const slash_5 = require('../assets/images/slash_5.png')
    const slash_6 = require('../assets/images/slash_6.png')

    const finger_1 = require('../assets/images/finger_1.png')
    const finger_2 = require('../assets/images/finger_2.png')
    const finger_3 = require('../assets/images/finger_3.png')
    const finger_4 = require('../assets/images/finger_4.png')
    const finger_p = require('../assets/images/finger_p.png')

    var guitar_chords = require('../constants/guitar_chords.json');

    const chords = guitar_chords[props.ChordName];
    const [idx, setIdx] = useState(0);
    if (!chords || chords.length==0) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.message}> Acorde Indisponível </Text>
            </View>
        );
    }
    else {
        const tam = guitar_chords[props.ChordName].length;
        const capo = props.Capo;
        var slash_house_style = styles.slash_house_1;
        if (chords[idx].fingers[0].house == 2)
            slash_house_style = styles.slash_house_2;
        else if (chords[idx].fingers[0].house == 3)
            slash_house_style = styles.slash_house_3;
        else if (chords[idx].fingers[0].house == 4)
            slash_house_style = styles.slash_house_4;
        const start_house = chords[idx].start_house + (capo != 0 ? capo + 1 : 0);
        return (
            <TouchableOpacity 
                style={styles.container}
                onPress={() => setIdx((idx + 1) % tam)}
            >
                <Text style={styles.house_text}>{(start_house != 0 ? `${start_house}ª` : '   ')}</Text>
                <View>
                    <Image
                        source={capo != 0 ? guitar_capo : (chords[idx].start_house != 0 ? guitar_front : guitar_base)}
                        style={styles.back_image}
                    />

                    <Image
                        source={finger_1}
                        style={[
                            (chords[idx].fingers[0].size == 1 ? styles.finger : styles.unactive),
                            houseDict.get(chords[idx].fingers[0].house),
                            stringDict.get(chords[idx].fingers[0].string)
                        ]}
                    />
                    <Image
                        source={slash_2}
                        style={[styles.slash_2, (chords[idx].fingers[0].size == 2 ? slash_house_style : styles.unactive)]}
                    />
                    <Image
                        source={slash_3}
                        style={[styles.slash_3, (chords[idx].fingers[0].size == 3 ? slash_house_style : styles.unactive)]}
                    />
                    <Image
                        source={slash_4}
                        style={[styles.slash_4, (chords[idx].fingers[0].size == 4 ? slash_house_style : styles.unactive)]}
                    />
                    <Image
                        source={slash_5}
                        style={[styles.slash_5, (chords[idx].fingers[0].size == 5 ? slash_house_style : styles.unactive)]}
                    />
                    <Image
                        source={slash_6}
                        style={[styles.slash_6, (chords[idx].fingers[0].size == 6 ? slash_house_style : styles.unactive)]}
                    />


                    <Image
                        source={finger_2}
                        style={[styles.finger, houseDict.get(chords[idx].fingers[1].house), stringDict.get(chords[idx].fingers[1].string)]}
                    />
                    <Image
                        source={finger_3}
                        style={[styles.finger, houseDict.get(chords[idx].fingers[2].house), stringDict.get(chords[idx].fingers[2].string)]}
                    />
                    <Image
                        source={finger_4}
                        style={[styles.finger, houseDict.get(chords[idx].fingers[3].house), stringDict.get(chords[idx].fingers[3].string)]}
                    />
                    <Image
                        source={finger_p}
                        style={[styles.finger, houseDict.get(chords[idx].fingers[4].house), stringDict.get(chords[idx].fingers[4].string)]}
                    />
                    <Image
                        source={chords[idx].strings[0] == 'b' ? bass_string : (chords[idx].strings[0] == 'x' ? none_string : normal_string)}
                        style={styles.string_1}
                    />
                    <Image
                        source={chords[idx].strings[1] == 'b' ? bass_string : (chords[idx].strings[1] == 'x' ? none_string : normal_string)}
                        style={styles.string_2}
                    />
                    <Image
                        source={chords[idx].strings[2] == 'b' ? bass_string : (chords[idx].strings[2] == 'x' ? none_string : normal_string)}
                        style={styles.string_3}
                    />
                    <Image
                        source={chords[idx].strings[3] == 'b' ? bass_string : (chords[idx].strings[3] == 'x' ? none_string : normal_string)}
                        style={styles.string_4}
                    />
                    <Image
                        source={chords[idx].strings[4] == 'b' ? bass_string : (chords[idx].strings[4] == 'x' ? none_string : normal_string)}
                        style={styles.string_5}
                    />
                    <Image
                        source={chords[idx].strings[5] == 'b' ? bass_string : (chords[idx].strings[5] == 'x' ? none_string : normal_string)}
                        style={styles.string_6}
                    />

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 100,
        height: 120,
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    message: {
        fontFamily: 'roboto-bold',
        fontSize: 12,
        textAlign: 'center',
    },
    house_text: {
        marginTop: 25,
        fontFamily: 'roboto-bold',
        fontSize: 12,
    },
    back_image: {
        height: 110,
        width: 80,
    },
    unactive: {
        height: 0,
        width: 0,
    },
    slash_2: {
        position: 'absolute',
        height: 7,
        width: 22,
    },
    slash_3: {
        position: 'absolute',
        height: 7,
        width: 36
    },
    slash_4: {
        position: 'absolute',
        height: 7,
        width: 49,
    },
    slash_5: {
        position: 'absolute',
        height: 7,
        width: 63,
    },
    slash_6: {
        position: 'absolute',
        height: 7,
        width: 79,
    },
    finger: {
        position: 'absolute',
        height: 12,
        width: 12,
    },
    string_1: {
        position: 'absolute',
        height: 8,
        width: 8,
        bottom: 0,
        right: 2
    },
    string_2: {
        position: 'absolute',
        height: 8,
        width: 8,
        bottom: 0,
        right: 15
    },
    string_3: {
        position: 'absolute',
        height: 8,
        width: 8,
        bottom: 0,
        right: 29
    },
    string_4: {
        position: 'absolute',
        height: 8,
        width: 8,
        bottom: 0,
        right: 42
    },
    string_5: {
        position: 'absolute',
        height: 8,
        width: 8,
        bottom: 0,
        right: 56
    },
    string_6: {
        position: 'absolute',
        height: 8,
        width: 8,
        bottom: 0,
        right: 70
    },
    slash_house_1: {
        position: 'absolute',
        right: 1,
        top: 32,
    },
    slash_house_2: {
        position: 'absolute',
        right: 1,
        top: 49,
    },
    slash_house_3: {
        position: 'absolute',
        right: 1,
        top: 65,
    },
    slash_house_4: {
        position: 'absolute',
        right: 1,
        top: 82,
    },
    up_touch: {
        zIndex: 1,
        position: 'absolute',
        width: '50%',
        height: '100%',
        borderWidth: 1,
    },
    down_touch: {
        position: 'absolute',

        right: 0,
        bottom: 0,
        width: '100%',
        height: '50%',
    }
});

const sample_chord = {
    "start_house": 0,
    "fingers": [
        {
            "house": 1,
            "string": 2,
            "size": 1
        },
        {
            "house": 1,
            "string": 2
        },
        {
            "house": 1,
            "string": 2
        },
        {
            "house": 1,
            "string": 2
        },
        {
            "house": 1,
            "string": 2
        },
        {
            "house": 1,
            "string": 2
        }
    ],
    "strings": [
        "n",
        "n",
        "n",
        "n",
        "b",
        "x"
    ]
}