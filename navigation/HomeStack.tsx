


import * as React from 'react';
import { HomeStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, Image, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen'

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerTitle: HomeHeader }}
            />
        </Stack.Navigator>
    )
}

function HomeHeader() {
    return (
        <View style={styles.container}>
            <Image
                style = {styles.logo}
                source= { require('../assets/images/app_logo.png') }
            />
            <Text style={styles.title}> Chords </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    logo: {
        height: 30,
        width: 30,
        marginRight:15,
    },
    title:{
        color:'#333333',
        fontSize:18,
        fontWeight:'bold',
        alignSelf:'center',
        fontFamily:'raleway'
    }
});
