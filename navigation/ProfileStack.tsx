


import * as React from 'react';
import { ProfileStackParamList, ProfileTabsParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SampleScreen from '../screens/SampleScreen';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileTabs"
                component={ProfileTabs}
                options={({ route, navigation }) => ({ header: () => profileHeader({ route, navigation } , false) })}
            />
            <Stack.Screen
                name="MyList"
                component={SampleScreen}
                options={{ headerTitle: 'MyList' }}
            />
            <Stack.Screen
                name="AddChord"
                component={SampleScreen}
                options={{ headerTitle: 'AddChord' }}
            />
            <Stack.Screen
                name="ChoseVersion"
                component={SampleScreen}
                options={{ headerTitle: 'ChoseVersion' }}
            />
            <Stack.Screen
                name="ChoseMusic"
                component={SampleScreen}
                options={{ headerTitle: 'ChoseMusic' }}
            />
            <Stack.Screen
                name="WriteChord"
                component={SampleScreen}
                options={{ headerTitle: 'WriteChord' }}
            />
            <Stack.Screen
                name="PreviewScreen"
                component={SampleScreen}
                options={{ headerTitle: 'PreviewScreen' }}
            />
            <Stack.Screen
                name="ChordsDict"
                component={SampleScreen}
                options={{ headerTitle: 'ChordsDict' }}
            />
            <Stack.Screen
                name="Login"
                component={SampleScreen}
                options={{ headerTitle: 'Login' }}
            />
            <Stack.Screen
                name="Register"
                component={SampleScreen}
                options={{ headerTitle: 'Register' }}
            />
            <Stack.Screen
                name="PickIcon"
                component={SampleScreen}
                options={{ headerTitle: 'PickIcon' }}
            />
        </Stack.Navigator>
    )
}

const Tab = createMaterialTopTabNavigator<ProfileTabsParamList>();

function ProfileTabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#333333',
                inactiveTintColor: '#828282',
                indicatorStyle: {
                    backgroundColor: '#333333'
                }
            }}

        >
            <Tab.Screen
                name="Chords"
                component={SampleScreen}
                options={{
                    tabBarLabel: ({ focused }) => chordsIcon(focused)
                }}
            />
            <Tab.Screen
                name="Lists"
                component={SampleScreen}
                options={{
                    tabBarLabel: ({ focused }) => listsIcon(focused)
                }}
            />
            <Tab.Screen
                name="MoreOptions"
                component={SampleScreen}
                options={{
                    tabBarLabel: ({ focused }) => moreIcon(focused)
                }}
            />
        </Tab.Navigator>
    );
}

function profileHeader({ route, navigation }:StackScreenProps<ProfileStackParamList>, logged: boolean) {
    if (logged)
        return (
            <View style={styles.header}>
                <View style={styles.left}>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/images/sample_avatar.png')}
                    />
                    <View style={styles.name_container}>
                        <Text style={styles.h1}> Fulano da silva </Text>
                        <Text style={styles.h2}> @fulano </Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.button_text}> Editar perfil </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#F2F2F2' }]}>
                        <Text style={[styles.button_text, { color: '#333333' }]}> Sair </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    else
        return (
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
                        onPress={()=> navigation.navigate('Login')}
                    >
                        <Text style={styles.button_text}> Entrar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#F2F2F2' }]}
                        onPress={()=> navigation.navigate('Register')}
                    >
                        <Text style={[styles.button_text, { color: '#333333' }]}> Criar Conta </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
}
function chordsIcon(focus: boolean) {
    const focused = require('../assets/images/chord_icon.png')
    const unfocused = require('../assets/images/chord_icon_gray.png')
    return (
        <Image
            style={styles.icon}
            source={focus ? focused : unfocused}
        />
    )
}

function listsIcon(focus: boolean) {
    const focused = require('../assets/images/list_icon.png')
    const unfocused = require('../assets/images/list_icon_gray.png')
    return (
        <Image
            style={styles.icon}
            source={focus ? focused : unfocused}
        />
    )
}

function moreIcon(focus: boolean) {
    const focused = require('../assets/images/more_icon.png')
    const unfocused = require('../assets/images/more_icon_gray.png')
    return (
        <Image
            style={styles.icon}
            source={focus ? focused : unfocused}
        />
    )
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
        justifyContent:'center'
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