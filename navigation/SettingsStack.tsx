


import * as React from 'react';
import { SettingsStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/SettingsScreen'

const Stack = createStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={ Settings }
                options={{ headerTitle: 'Configurações' }}
            />
        </Stack.Navigator>
    )
}