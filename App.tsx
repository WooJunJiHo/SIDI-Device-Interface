import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstPage from './screens/FirstPage';
import StepPage from './screens/StepPage';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="FirstPage"
                    component={FirstPage}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="StepPage"
                    component={StepPage}
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}


