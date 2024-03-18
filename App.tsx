import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstPage from './screens/FirstPage';
import StepPage from './screens/StepPage';
import SellectPage from './screens/SellectPage'; 
import CheckListPage from './screens/CheckListPage';
import CompletePage from './screens/CompletePage';
import QRcodePage from './screens/QRcodePage';
import FinishPage from './screens/FinishPage';
import ExplanationPage from './screens/ExplanationPage';

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
                <Stack.Screen name="SellectPage"
                    component={SellectPage}
                    options={{
                        headerShown: false,
                    }}
                />
                 <Stack.Screen name="CheckListPage"
                    component={CheckListPage}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="CompletePage"
                    component={CompletePage}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="QRcodePage"
                    component={QRcodePage}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="FinishPage"
                    component={FinishPage}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="ExplanationPage"
                    component={ExplanationPage}
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}


