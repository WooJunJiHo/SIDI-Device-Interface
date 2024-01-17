import {
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import DarkMode from '../../components/styles/DarkMode'


const TabBar = ({ state, descriptors, navigation }) => {
    return (
        <View
            style={[
                DarkMode.darkView,
                {
                    height: 80,
                }
            ]}
        >
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#242424', // 원하는 색상으로 변경
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderWidth: 1,
                    borderColor: '#767676',
                    borderBottomWidth: 0,
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
                        iconName = require('../../assets/icons/home-grayline.png');
                    } else if (route.name === 'Search') {
                        iconName = require('../../assets/icons/search-grayline.png');
                    } else if (route.name === 'Chat') {
                        iconName = require('../../assets/icons/chat-grayline.png');
                    } else if (route.name === 'Alarm') {
                        iconName = require('../../assets/icons/bell-grayline.png');
                    } else if (route.name === 'Man') {
                        iconName = require('../../assets/icons/man-grayline.png');
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
                                <Image
                                    source={iconName}
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