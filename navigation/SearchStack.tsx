


import * as React from 'react';
import { SearchStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import SampleScreen from '../screens/SampleScreen';
import SearchScreen from '../screens/SearchScreen'
import VersionScreen from '../screens/VersionScreen'
import { StyleSheet, Text } from 'react-native';

const Stack = createStackNavigator<SearchStackParamList>();

export default function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: false, }}
            />
            <Stack.Screen
                name="ChoseVersion"
                component={VersionScreen}
                options={
                    {
                        headerTitle: () => (<Text style={ styles.textHeader }> Escolha a versão da cifra</Text>)
                    }
                }
            />
            <Stack.Screen
                name="ChordScreen"
                component={SampleScreen}
                options={{ headerTitle: 'ChordScreen' }}

            />
            <Stack.Screen
                name="ProfileView"
                component={SampleScreen}
                options={{ headerTitle: 'ProfileView' }}
            />
            <Stack.Screen
                name="ArtistScreen"
                component={SampleScreen}
                options={{ headerTitle: 'ArtistScreen' }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    textHeader: { 
        fontFamily:'roboto-bold', 
        color:'#333333',
        fontSize:18
    }
})
