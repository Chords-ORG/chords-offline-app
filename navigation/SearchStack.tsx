


import * as React from 'react';
import { SearchStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator<SearchStackParamList>();

export default function SearchStack() {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: false, }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    textHeader: { 
        fontFamily:'roboto-bold', 
        color:'#333333',
        fontSize:18
    },
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
})
