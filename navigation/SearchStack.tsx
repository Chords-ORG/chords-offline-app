


import * as React from 'react';
import { SearchStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import SampleScreen from '../screens/SampleScreen';

const Stack = createStackNavigator<SearchStackParamList>();

export default function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Search"
                component={ SampleScreen }
                options={{ headerTitle: 'Search' }}
            />
            <Stack.Screen
                name="ChoseVersion"
                component={ SampleScreen }
                options={{ headerTitle: 'ChoseVersion' }}
            />
            <Stack.Screen
                name="ChordScreen"
                component={ SampleScreen }
                options={{ headerTitle: 'ChordScreen' }}
            />
            <Stack.Screen
                name="ProfileView"
                component={ SampleScreen }
                options={{ headerTitle: 'ProfileView' }}
            />
            <Stack.Screen
                name="ArtistScreen"
                component={ SampleScreen }
                options={{ headerTitle: 'ArtistScreen' }}
            />
        </Stack.Navigator>
    )
}