import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import axios from 'axios';
import DarkMode from '../components/styles/DarkMode'

const AssetsMoreColor = (props) => {
    const RESULT = 'Apple Watch'  

    const [users, setUsers] = useState([]);
    const [infos, setInfos] = useState([]);
    const [color, setColor] = useState([]);
    const [asset, setAsset] = useState(RESULT);





    useEffect(() => {
        // 백엔드 서버의 API를 호출하여 데이터를 가져옵니다.
        axios.get('http://172.30.112.155:3000/getUsers')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // 백엔드 서버의 API를 호출하여 데이터를 가져옵니다.
        axios.get('http://172.30.112.155:3000/getInfo')
            .then(response => {
                const temp = response.data.filter(info => info.RESULT == asset)
                setInfos(temp);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const selectAssets = (id, name) => {
        setColor(users.filter(color => color.AssetsMoreInfoID == id))
        setAsset([...asset, ' ' + name]);
    }




    return (
        <SafeAreaView style={[DarkMode.darkView, { flex: 1 }]}>
            <View style={{backgroundColor: 'white', alignItems: 'center'}}>
                <Text>{asset}</Text>
            </View>
            <View stlye={{ flex: 1, flexDirection: 'row' }}>
                {color.length == 0 && (
                    <ScrollView>
                        {infos.map(info => (
                            <TouchableOpacity
                                key={info.AssetsMoreInfoID}
                                onPress={() => {
                                    selectAssets(info.AssetsMoreInfoID, info.MORE)
                                }}
                                style={{ borderWidth: 1, borderColor: 'Gray', borderRadius: 10, marginBottom: 5, backgroundColor: '#FFFFFF' }}
                            >
                                <Text
                                    style={{ textAlign: 'center', fontSize: 15 }}
                                >
                                    {info.MORE}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                {color.length != 0 && (
                    <ScrollView>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {color.map(color => (
                                <TouchableOpacity
                                    key={color.AssetsMoreColorID}
                                    onPress={() => {
                                        setColor([])
                                        setAsset(RESULT)
                                    }}
                                    style={{ borderRadius: 10, borderColor: 'gray', borderWidth: 1, width: '46%', height: 120, margin: '2%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}
                                >
                                    <View style={{ backgroundColor: color.RGB, width: 40, height: 40, borderRadius: 100 }}></View>
                                    <Text
                                        style={{ marginTop: 10 }}
                                    >
                                        {color.COLOR}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

export default AssetsMoreColor
