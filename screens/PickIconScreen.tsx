import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, Alert } from 'react-native';
import { ProfileStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { avatar_lists } from '../constants/Links'
import { set_profile } from '../functions/requests'
import Spinner  from '../components/Spinner'

export default function PickIconScreen({ navigation, route }: StackScreenProps<ProfileStackParamList, 'PickIcon'>) {
    const [selected, setSelected] = useState(0)
    const [loading, setLoading]  = useState(false)
    return (
        <View style={[styles.container, {}]}>
            <Spinner visible={loading}/>
            <View>
                <Text style={styles.h1}> Quase lá </Text>
                <Text style={styles.h2}> Escolha um ícone de usuário que aparecerá no seu perfil </Text>
                <View style={styles.separator} />
            </View>
            <View>
                {
                    avatar_lists.map((list, i) => {
                        return (
                            <View style={styles.avatar_line} key={i}>
                                {
                                    list.map((link, j) => {
                                        let idx = i * 5 + j;
                                        return (
                                            <TouchableOpacity
                                                key={j}
                                                style={selected == idx ? styles.border : {}}
                                                onPress={() => {
                                                    setSelected(idx)
                                                }}
                                            >
                                                <Image
                                                    source={{ uri: link }}
                                                    style={styles.avatar_icon}
                                                />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        let i = Math.floor(selected / 5);
                        let j = selected % 5;
                        const photo_url = avatar_lists[i][j]
                        const name = route.params?.name
                        setLoading(true);
                        set_profile(name, photo_url).then((response)=>{
                            setLoading(false);
                            navigation.navigate('ProfileTabs');
                        }).catch((error)=>{
                            setLoading(false);
                            Alert.alert(error.title, error.message);
                        })
                    }}
                >
                    <Text style={styles.button_text}> Confirmar </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        padding: 15,
        justifyContent: 'center',
    },
    h1: {
        fontFamily: 'roboto-bold',
        color: '#333333',
        fontSize: 24,
        textAlign: 'center',
    },
    h2: {
        fontFamily: 'roboto',
        color: '#828282',
        fontSize: 16,
        textAlign: 'center',
    },
    separator: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4',
        height: 20,
    },
    button: {
        height: 40,
        width: 160,
        borderRadius: 5,
        backgroundColor: '#2F80ED',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
    },
    button_text: {
        color: '#F2F2F2',
        fontFamily: 'roboto-bold',
        fontSize: 14,
    },
    avatar_icon: {
        height: 50,
        width: 50,
    },
    avatar_line: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    border: {
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#2F80ED'
    }
});
