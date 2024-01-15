import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


// 화면 컴포넌트들 (예시로 2개 추가)
import AssetsMoreColor from './screens/AssetsMoreColor';
import Home from './screens/Home';
import TotalAsset from './screens/TotalAsset';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Main" 
            component={Home} 
            options={{ headerShown: false }}
        />
        <Stack.Screen 
            name="TotalAsset" 
            component={TotalAsset} 
            options={{ 
                headerShown: false, 
            }}
        />
    </Stack.Navigator>
);






export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Home' component={HomeStack} options={{ headerShown: false }}/>
                <Tab.Screen name='AssetsMoreColor' component={AssetsMoreColor} options={{ headerShown: false }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}