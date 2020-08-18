


import * as React from 'react';
import { VersionStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import SampleScreen from '../screens/SampleScreen';
import SearchScreen from '../screens/SearchScreen';
import VersionScreen from '../screens/VersionScreen';
import { StyleSheet, Text, Image, View } from 'react-native';
import FindMusic from '../screens/FindMusic'
import WriteChords from '../screens/WriteChords'
import PreviewVersion from '../screens/PreviewVersion'

const Stack = createStackNavigator<VersionStackParamList>();

export default function VersionStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FindMusic"
                component={FindMusic}
                options={{ headerTitle: 'Localize a música' }}
            />
            <Stack.Screen
                name="WriteChords"
                component={WriteChords}
                options={
                    {
                        headerTitle: () => (<Text style={styles.textHeader}>WriteChords</Text>)
                    }
                }
            />
            <Stack.Screen
                name="PreviewVersion"
                component={PreviewVersion}
                options={{ headerTitle: 'PreviewVersion' }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    textHeader: {
        fontFamily: 'roboto-bold',
        color: '#333333',
        fontSize: 18
    },
    container: {
        flexDirection: 'row'
    },
    logo: {
        height: 30,
        width: 30,
        marginRight: 15,
    },
    title: {
        color: '#333333',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontFamily: 'raleway'
    }
})
