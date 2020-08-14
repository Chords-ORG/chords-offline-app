import React, { useState } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

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

export default function GuitarChord() {

    const guitar_base = require('../assets/images/guitar_base.png')
    const guitar_capo = require('../assets/images/guitar_capo.png')
    const guitar_front = require('../assets/images/guitar_front.png')

    const base_string = require('../assets/images/base_string.png')
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

    var slash_house_style = styles.slash_house_1;
    if (chord_pos.finger_1.house == 2)
        slash_house_style = styles.slash_house_2;
    else if (chord_pos.finger_1.house == 3)
        slash_house_style = styles.slash_house_3;
    else if (chord_pos.finger_1.house == 4)
        slash_house_style = styles.slash_house_4;

    const start_house = chord_pos.start_house + (capo != 0 ? capo + 1 : 0);
    return (
        <View style={styles.container}>
            <Text style={styles.house_text}>{(start_house!=0 ? `${start_house}ª`:'   ')}</Text>
            <View>
                <Image
                    source={capo != 0 ? guitar_capo : (chord_pos.start_house != 0 ? guitar_front : guitar_base)}
                    style={styles.back_image}
                />
                <Image
                    source={slash_2}
                    style={[styles.slash_2, (chord_pos.finger_1.size == 2 ? slash_house_style : styles.unactive)]}
                />
                <Image
                    source={slash_3}
                    style={[styles.slash_3, (chord_pos.finger_1.size == 3 ? slash_house_style : styles.unactive)]}
                />
                <Image
                    source={slash_4}
                    style={[styles.slash_4, (chord_pos.finger_1.size == 4 ? slash_house_style : styles.unactive)]}
                />
                <Image
                    source={slash_5}
                    style={[styles.slash_5, (chord_pos.finger_1.size == 5 ? slash_house_style : styles.unactive)]}
                />
                <Image
                    source={slash_6}
                    style={[styles.slash_6, (chord_pos.finger_1.size == 6 ? slash_house_style : styles.unactive)]}
                />

                <Image
                    source={finger_1}
                    style={[styles.finger, houseDict.get(chord_pos.finger_1.house), stringDict.get(chord_pos.finger_1.string)]}
                />
                <Image
                    source={finger_2}
                    style={[styles.finger, houseDict.get(chord_pos.finger_2.house), stringDict.get(chord_pos.finger_2.string)]}
                />
                <Image
                    source={finger_3}
                    style={[styles.finger, houseDict.get(chord_pos.finger_3.house), stringDict.get(chord_pos.finger_3.string)]}
                />
                <Image
                    source={finger_4}
                    style={[styles.finger, houseDict.get(chord_pos.finger_4.house), stringDict.get(chord_pos.finger_4.string)]}
                />
                <Image
                    source={finger_p}
                    style={[styles.finger, houseDict.get(chord_pos.finger_p.house), stringDict.get(chord_pos.finger_p.string)]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width:100,
        justifyContent:'space-between'
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
    }
});

var capo = 0
const chord_pos = {
    start_house: 12,
    finger_1: {
        house: 1,
        string: 2,
        size: 1
    },
    finger_2: {
        house: 3,
        string: 4,
    },
    finger_3: {
        house: 4,
        string: 5,
    },
    finger_4: {
        house: 0,
        string: 0,
    },
    finger_p: {
        house: 0,
        string: 0,
    },
    strings: ['normal', 'normal', 'normal', 'normal', 'bass', 'none']
} 