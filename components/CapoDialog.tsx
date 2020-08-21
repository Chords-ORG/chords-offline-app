import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator
} from "react-native";
import { CapoDialogPropsType } from '../types';
import { Chord } from '../functions/chords'

export default function CapoDialog(props: CapoDialogPropsType) {
    return (
        <Modal
            visible={props.visible}
            transparent
        >
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    props.closeDialog();
                }}
                activeOpacity={0}
            >
                <View style={styles.modalView}>
                    <Text style={styles.h1}> Selecione a casa </Text>
                    <View style={styles.separator} />
                    {
                        value_lists.map((values, i) => {
                            return (
                                <View style={styles.buttons_container} key={i}>
                                    {
                                        values.map((value) => {
                                            var text = value == 0 ? 'Sem capotraste\n' : `${value}ª casa\n`
                                            var delta = props.selected_capo-value;
                                            var chord = new Chord(props.tone)
                                            chord.add(props.selected_capo)
                                            chord.add(delta);
                                            text += `(Forma de ${chord.toSharp()})`
                                            return (
                                                <TouchableOpacity
                                                    style={[styles.button, (props.selected_capo == value ? { backgroundColor: '#2F80ED' } : {})]}
                                                    key={value}
                                                    onPress={()=>{
                                                        props.onSelect(value, delta)
                                                    }}
                                                >
                                                    <Text style={styles.button_text}>{text}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const value_lists = [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000066'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 15,
        //alignItems: "center",
    },
    h1: {
        color: '#333333',
        fontFamily: 'roboto-bold',
        fontSize: 16,
    },
    separator: {
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4',
        height: 10,
    },
    buttons_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    button_text: {
        fontFamily: 'roboto-bold',
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#BDBDBD',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 140,
        borderRadius: 5,
    }
});
