import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, Alert } from 'react-native';
import { ProfileStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { avatar_lists } from '../constants/Links'
import { set_profile } from '../functions/requests'
import Spinner from '../components/Spinner'
import { TextInput } from 'react-native-gesture-handler';

export default function EditProfile({ navigation, route }: StackScreenProps<ProfileStackParamList, 'EditProfile'>) {
    const [selected, setSelected] = useState(0)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    return (
        <View style={[styles.container, {}]}>
            <Spinner visible={loading} />
            <View>
                <View style={styles.input_container}>
                    <Image
                        source={require('../assets/images/user_icon.png')}
                        style={styles.icon}
                    />
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder="Nome"
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.separator} />
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
                        setLoading(true);
                        set_profile(name, photo_url).then((response) => {
                            setLoading(false);
                            navigation.navigate('ProfileTabs');
                        }).catch((error) => {
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
        justifyContent: 'space-between',
        paddingBottom: 20,
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
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    input_container: {
        flexDirection: 'row',
        borderColor: '#E4E4E4',
        borderRadius: 5,
        borderWidth: 1,
        height: 50,
        width: '100%',
        padding: 5,
        alignItems: 'center'
    }
});
