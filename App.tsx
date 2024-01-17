import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


// 화면 컴포넌트들 (예시로 2개 추가)
import Main from './screens/Main';
import TotalAsset from './screens/TotalAsset';
import Search from './screens/Search';
import AssetsInfo from './screens/Assets-info'
import Chat from './screens/Chat';


//탭바 스타일
import TabBar from './components/styles/TabBar';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const MainStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="TotalAsset" component={TotalAsset} />
    </Stack.Navigator>
);


const SearchStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SearchMain" component={Search} />
        <Stack.Screen name="SearchAssetsInfo" component={AssetsInfo}/>
    </Stack.Navigator>
);


const ChatStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ChatMain" component={Chat} />
    </Stack.Navigator>
);






export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{ 
                    headerShown: false,
                    tabBarLabel: () => null,
                }}
                tabBar={(props) => <TabBar {...props} />}
            >
                <Tab.Screen name='Home' component={MainStack} />
                <Tab.Screen name='Search' component={SearchStack} />
                <Tab.Screen name='Chat' component={Chat} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}