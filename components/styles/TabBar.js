import {
    View,
    TouchableOpacity,
} from 'react-native'
import Icon from './Icons';
import DarkMode from '../../components/styles/DarkMode'


const TabBar = ({ state, descriptors, navigation }) => {
    return (
        <View
            style={[
                DarkMode.darkView,
                {
                    height: 90,
                }
            ]}
        >
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#242424', // 원하는 색상으로 변경
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };


                    // 아이콘 이름을 동적으로 가져오는 대신 직접 지정
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'AssetsMoreColor') {
                        iconName = 'person-outline';
                    }




                    return (
                        <View
                            key={index}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {/* 탭에 따른 아이콘, 라벨 또는 커스텀 컴포넌트를 여기에 추가 */}
                            <TouchableOpacity
                                key={index}
                                onPress={onPress}
                            >
                                <Icon
                                    name={iconName} // options에 tabBarIconName을 추가하여 아이콘 이름을 동적으로 가져옴
                                    size={24}
                                    color={isFocused ? 'white' : '#767676'} // 선택된 탭 색상과 선택되지 않은 탭 색상을 다르게 지정
                                />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};


export default TabBar