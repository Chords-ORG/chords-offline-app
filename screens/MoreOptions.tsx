import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { RootStackParamList, ProfileTabsParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { get_profile } from '../functions/requests'


export default function MoreOptions({ navigation }: StackScreenProps<ProfileTabsParamList>) {
    const [loading, setLoading] = useState(false);
    const [staff, setStaff] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            get_profile().then((profile) => {
                setStaff(profile.user.is_staff);
            }).catch((error)=>{
                console.log(error);
                setStaff(false);
            })
        })
        return unsubscribe;
    }, [navigation])
    return (
        <View style={[styles.container, {}]}>
            <View>
                <Text style={styles.h1}> Mais Opções </Text>
                <View style={styles.separator} />

                <TouchableOpacity style={styles.card}>
                    <Image
                        style={styles.icon}
                        source={require('../assets/images/music_notes_icon.png')}
                    />
                    <Text style={styles.card_h1}> Dicionário de acordes </Text>
                </TouchableOpacity>
            </View>
            {
                staff && (
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.h1}> Opções de desenvolvedor </Text>
                        <View style={styles.separator} />

                        <TouchableOpacity style={styles.card}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/microphone_icon.png')}
                            />
                            <Text style={styles.card_h1}> Cadastrar artista </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/write_icon.png')}
                            />
                            <Text style={styles.card_h1}> Escrever Letra </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        padding: 20,
    },
    h1: {
        fontFamily: 'roboto-bold',
        color: '#333333',
        fontSize: 16,
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#E4E4E4',
        height: 10,
    },
    card: {
        backgroundColor: '#F2F2F2',
        height: 55,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    card_h1: {
        color: '#333333',
        fontFamily: 'roboto-bold',
        fontSize: 14,
        marginLeft: 20,
    },
    card_h2: {
        color: '#828282',
        fontFamily: 'roboto',
        fontSize: 12,
    },
    like_container: {
        margin: 5,
    },
    like_count: {
        fontSize: 12,
        fontFamily: 'roboto',
        color: '#6FCF97',
        textAlign: 'center'
    },
    like_icon: {
        height: 30,
        width: 30
    },
    left: {
    },
    right: {
        flexDirection: 'row',
    },
    floating_button: {
        height: 55,
        width: 55,
        borderRadius: 30,
        backgroundColor: '#2F80ED',
        position: 'absolute',
        right: 30,
        bottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: 30,
        width: 30,
    },
});

const lists = [
    {
        name: 'Igreja',
        tam: 12
    },
    {
        name: 'Quarentena',
        tam: 15,
    }
]