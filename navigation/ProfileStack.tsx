


import * as React from 'react';
import { ProfileStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import SampleScreen from '../screens/SampleScreen';
import Login from '../screens/Login'
import Registration from '../screens/Registration'
import MyChords from '../screens/MyChords'
import MyLists from '../screens/MyLists'
import WriteChord from '../screens/WriteChord'
import MyProfile from '../screens/MyProfile'
import PreviewScreen from '../screens/PreviewScreen'

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyProfile"
                component={MyProfile}
                options={{ headerTitle: 'MyProfile' }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerTitle: 'Login' }}

/>
            <Stack.Screen
                name="Registration"
                component={Registration}
                options={{ headerTitle: 'Registration' }}
            />
            <Stack.Screen
                name="MyChords"
                component={MyChords}
                options={{ headerTitle: 'MyChords' }}
            />
            <Stack.Screen
                name="MyLists"
                component={MyLists}
                options={{ headerTitle: 'MyLists' }}
            />
            <Stack.Screen
                name="WriteChord"
                component={WriteChord}
                options={{ headerTitle: 'WriteChord' }}
            />
            <Stack.Screen
                name="PreviewScreen"
                component={PreviewScreen}
                options={{ headerTitle: 'WriteChord' }}
            />
        </Stack.Navigator>
    )
}