


import * as React from 'react';
import { HomeStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import SampleScreen from '../screens/SampleScreen';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={ SampleScreen }
                options={{ headerTitle: 'Home' }}
            />
        </Stack.Navigator>
    )
}