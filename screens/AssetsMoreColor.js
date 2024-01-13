import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import axios from 'axios';

const AssetsMoreColor = () => {
    const [users, setUsers] = useState([]);
    const [infos, setInfos] = useState([]);
    const [color, setColor] = useState([]);

    useEffect(() => {
        // 백엔드 서버의 API를 호출하여 데이터를 가져옵니다.
        axios.get('http://localhost:3000/getUsers')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // 백엔드 서버의 API를 호출하여 데이터를 가져옵니다.
        axios.get('http://localhost:3000/getInfo')
            .then(response => {
                const temp = response.data.filter(info => info.RESULT == 'Apple iPhone Pro')
                setInfos(temp);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const selectAssets = (id) => {
        setColor(users.filter(color => color.AssetsMoreInfoID == id))
    }




    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
            {color.length == 0 && (
                <ScrollView>
                    {infos.map(info => (
                        <TouchableOpacity
                            onPress={() => {
                                selectAssets(info.AssetsMoreInfoID)
                            }}
                            style={{ borderWidth: 1, borderColor: 'Gray', borderRadius: 10, marginBottom: 5 }}
                        >
                            <Text
                                key={info.AssetsMoreInfoID}
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
                    <View style={{flexDirection: 'row', flexWrap: 'wrap' }}>
                        {color.map(color => (
                            <TouchableOpacity
                                onPress={() => {
                                    setColor([])
                                }}
                                style={{borderRadius: 10, borderColor: 'gray', borderWidth: 1, width: '46%', height: 120, margin: '2%', alignItems: 'center', justifyContent: 'center'}}
                            >
                                <View style={{backgroundColor: color.RGB, width: 40, height: 40, borderRadius: 100}}></View>
                                <Text
                                    key={color.AssetsMoreColorID}
                                    style={{ marginTop: 10 }}
                                >
                                    {color.COLOR}
                                </Text>
                            </TouchableOpacity>
                        ))}    
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default AssetsMoreColor
