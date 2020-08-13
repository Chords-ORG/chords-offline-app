


import React, { useEffect, useState } from 'react';
import { ProfileStackParamList } from '../types';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { setItem, getItem, removeItem } from '../functions/storage'
import { get_profile } from '../functions/requests'

export default function profileHeader({ route, navigation }: StackScreenProps<ProfileStackParamList>) {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [logged, setLogged] = useState(true)
    const [loading, setLoading] = useState(true)
    const [photo_url, setPhotoUrl] = useState('')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            get_profile().then((profile) => {
                setUsername(profile.user.username)
                setName(profile.name)
                setPhotoUrl(profile.photo_url)
                setLoading(false);
                setLogged(true);
            }).catch((error) => {
                console.log(error)
                setLoading(false);
                setLogged(false);
                console.log(error);
            })
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View >
            {

                loading ?
                    (
                        <View style={[styles.header, { alignItems: 'center', justifyContent: 'center' }]}>
                            <ActivityIndicator />
                        </View>
                    )
                    :
                    logged ?
                        (
                            <View style={styles.header}>
                                <View style={styles.left}>
                                    <Image
                                        style={styles.avatar}
                                        source={{uri:photo_url}}
                                    />
                                    <View style={styles.name_container}>
                                        <Text style={styles.h1}>{name}</Text>
                                        <Text style={styles.h2}>{`@${username}`}</Text>
                                    </View>
                                </View>
                                <View style={styles.right}>
                                    <TouchableOpacity 
                                        style={styles.button}
                                        onPress={()=>{
                                            navigation.navigate('EditProfile')
                                        }}
                                    >
                                        <Text style={styles.button_text}> Editar perfil </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, { backgroundColor: '#F2F2F2' }]}
                                        onPress={() => {
                                            setLoading(true);
                                            removeItem('token').then(() => {
                                                setLoading(false);
                                                setLogged(false);
                                            })
                                        }}
                                    >
                                        <Text style={[styles.button_text, { color: '#333333' }]}> Sair </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) :
                        (
                            <View style={styles.header}>
                                <View style={styles.left}>
                                    <Image
                                        style={styles.avatar}
                                        source={require('../assets/images/sample_avatar.png')}
                                    />
                                    <View style={styles.name_container}>
                                        <Text style={[styles.h1, { textAlign: 'center' }]}> Você ainda não está cadastrado </Text>
                                    </View>
                                </View>
                                <View style={styles.right}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => navigation.navigate('Login')}
                                    >
                                        <Text style={styles.button_text}> Entrar </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, { backgroundColor: '#F2F2F2' }]}
                                        onPress={() => navigation.navigate('Register')}
                                    >
                                        <Text style={[styles.button_text, { color: '#333333' }]}> Criar Conta </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        height: 20,
        width: 20,
    },
    header: {
        backgroundColor: '#fff',
        height: 150,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 60,
    },
    left: {
        flexDirection: 'row'
    },
    right: {

    },
    avatar: {
        height: 50,
        width: 50,
    },
    h1: {
        fontSize: 16,
        color: '#333333',
        fontFamily: 'roboto-bold',
    },
    h2: {
        fontSize: 12,
        color: '#828282',
        fontFamily: 'roboto',
    },
    name_container: {
        marginLeft: 10,
        width: 150,
        justifyContent: 'center'
    },
    button: {
        width: 100,
        height: 30,
        backgroundColor: '#2F80ED',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    button_text: {
        fontSize: 12,
        fontFamily: 'roboto-bold',
        color: '#F2F2F2'
    }
})