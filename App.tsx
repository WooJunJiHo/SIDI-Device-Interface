import React from 'react';
import {
    Text,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 화면 컴포넌트들 (예시로 2개 추가)
import AssetsMoreColor from './screens/AssetsMoreColor';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Home' component={AssetsMoreColor}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}