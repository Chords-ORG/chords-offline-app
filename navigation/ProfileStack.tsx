


import * as React from 'react';
import { ProfileStackParamList, ProfileTabsParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SampleScreen from '../screens/SampleScreen';
import { StyleSheet, Text, View, Image } from 'react-native';

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileTabs"
                component={ProfileTabs}
                options={{ headerTitle: 'MyProfile' }}
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
                inactiveTintColor:'#828282',
                indicatorStyle :{
                    backgroundColor:'#333333'
              }
            }}
            
        >
            <Tab.Screen
                name="Chords"
                component={SampleScreen}
                options={{
                    tabBarLabel: ({focused}) => chordsIcon(focused)
                }}
            />
            <Tab.Screen
                name="Lists"
                component={SampleScreen}
                options={{
                    tabBarLabel: ({focused}) => listsIcon(focused)
                }}
            />
            <Tab.Screen
                name="MoreOptions"
                component={SampleScreen}
                options={{
                    tabBarLabel: ({focused}) => moreIcon(focused)
                }}
            />
        </Tab.Navigator>
    );
}

function chordsIcon(focus:boolean){
    const focused = require('../assets/images/chord_icon.png')
    const unfocused = require('../assets/images/chord_icon_gray.png')
    return(
        <Image
            style={styles.icon}
            source={ focus ? focused : unfocused }
        />
    )
}

function listsIcon(focus:boolean){
    const focused = require('../assets/images/list_icon.png')
    const unfocused = require('../assets/images/list_icon_gray.png')
    return(
        <Image
            style={styles.icon}
            source={ focus ? focused : unfocused }
        />
    )
}

function moreIcon(focus:boolean){
    const focused = require('../assets/images/more_icon.png')
    const unfocused = require('../assets/images/more_icon_gray.png')
    return(
        <Image
            style={styles.icon}
            source={ focus ? focused : unfocused }
        />
    )
}
const styles = StyleSheet.create({
    icon:{
        height:20,
        width:20,
    }

})