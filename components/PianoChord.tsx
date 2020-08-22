import React, { useState } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { PianoChordPropsType } from '../types'
import { TouchableOpacity } from 'react-native-gesture-handler'

const white_fingers = new Set()
white_fingers.add(2);
white_fingers.add(4);
white_fingers.add(7);
white_fingers.add(9);
white_fingers.add(11);
white_fingers.add(14);
white_fingers.add(16);
white_fingers.add(19);
white_fingers.add(21);
white_fingers.add(23);
white_fingers.add(26);
white_fingers.add(28);

export default function PianoChord(props: PianoChordPropsType) {

    const piano_back = require('../assets/images/piano_back.png');
    const black_finger = require('../assets/images/black_finger.png');
    const white_finger = require('../assets/images/white_finger.png');


    var piano_chords = require('../constants/piano_chords.json');

    const chords = piano_chords[props.ChordName];
    const [idx, setIdx] = useState(0);
    if (!chords) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.message}> Acorde Indisponível </Text>
            </View>
        );
    }
    else {
        const tam = chords.length;
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => setIdx((idx + 1) % tam)}
            >
                <Image
                    source={piano_back}
                    style={styles.piano_back}
                />
                {
                    chords[idx].map((_house: string, i: string) => {
                        const house = parseInt(_house)
                        return (
                            <Image
                                key={i}
                                source={white_fingers.has(house) ? white_finger :black_finger}
                                style={finger_style[house]}
                            />
                        );
                    })
                }
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height:50,
        width:200,
    },
    message: {
        fontFamily: 'roboto-bold',
        fontSize: 12,
        textAlign: 'center',
    },
    piano_back: {
        height:50,
        width:200,
    },
    finger_0: {
        position:'absolute',
        height:8,
        width:8,
    },
    finger_1: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:2,
    },
    finger_2: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:8
    },
    finger_3: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:14,
    },
    finger_4: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:20
    },
    finger_5: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:26,
    },
    finger_6: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:37,
    },
    finger_7: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:43,
    },
    finger_8: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:49,
    },
    finger_9: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:55,
    },
    finger_10: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:61,
    },
    finger_11: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:67,
    },
    finger_12: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:73,
    },
    finger_13: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:85,
    },
    finger_14: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:90,
    },
    finger_15: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:96,
    },
    finger_16: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:102,
    },
    finger_17: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:108,
    },
    finger_18: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:120,
    },
    finger_19: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:125,
    },
    finger_20: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:132,
    },
    finger_21: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:137,
    },
    finger_22: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:143,
    },
    finger_23: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:149,
    },
    finger_24: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:155,
    },
    finger_25: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:167,
    },
    finger_26: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:173,
    },
    finger_27: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:179,
    },
    finger_28: {
        position:'absolute',
        height:8,
        width:8,
        bottom:20,
        left:185,
    },
    finger_29: {
        position:'absolute',
        height:8,
        width:8,
        bottom:2,
        left:190,
    },
    finger_30: {
        position:'absolute',
        height:0,
        width:0,
    },
});

const finger_style = [
    styles.finger_0,
    styles.finger_1,
    styles.finger_2,
    styles.finger_3,
    styles.finger_4,
    styles.finger_5,
    styles.finger_6,
    styles.finger_7,
    styles.finger_8,
    styles.finger_9,
    styles.finger_10,
    styles.finger_11,
    styles.finger_12,
    styles.finger_13,
    styles.finger_14,
    styles.finger_15,
    styles.finger_16,
    styles.finger_17,
    styles.finger_18,
    styles.finger_19,
    styles.finger_20,
    styles.finger_21,
    styles.finger_22,
    styles.finger_23,
    styles.finger_24,
    styles.finger_25,
    styles.finger_26,
    styles.finger_27,
    styles.finger_28,
    styles.finger_29,
    styles.finger_30,
]