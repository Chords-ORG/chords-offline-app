


import * as React from 'react';
import { SettingsStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import SampleScreen from '../screens/SampleScreen';

const Stack = createStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={ SampleScreen }
                options={{ headerTitle: 'Configurações' }}
            />
        </Stack.Navigator>
    )
}