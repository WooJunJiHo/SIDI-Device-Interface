import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';

//채팅 기능
import { loadMessage, sendMessage } from '../components/Fetch/FetchChat';

//다크모드
import DarkMode from '../components/styles/DarkMode'

//아이콘
import Icon from '../components/styles/Icons'




const ChatScreen = (props) => {
    // 다크 모드
    const [ui, setUI] = useState(false);

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [user, setUser] = useState('iPhone')


    useEffect(() => {
        //socket.on 이벤트 핸들러를 설정합니다.
        const handleMessage = (msg) => {
            setChat((prevChat) => [...prevChat, msg]);
        };

        // 이벤트 핸들러 등록
        loadMessage(handleMessage);

        // 컴포넌트 언마운트 시에는 이벤트 핸들러를 제거합니다.
        return () => {
            loadMessage(handleMessage, true);
        };
    }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

    const emitMessage = () => {
        sendMessage(message, user)
        setMessage('');
    };

    return (
        <SafeAreaView
            style={[
                ui != false ? DarkMode.lightPriceView : DarkMode.darkPriceView,
                {
                    flex: 1,
                    alignItems: 'center',
                }
            ]}
        >
            {/* 헤더 세션 */}
            <View
                style={[
                    styles.headerBorder,
                    ui != false ? {borderBottomColor: '#F0F0F0',} : {borderBottomColor: '#302F2F',}
                ]}
            >
                <View style={styles.headerSection}>
                    <TouchableOpacity
                        onPress={() => { props.navigation.goBack() }}
                    >
                        <Icon name='arrow-back-outline' size={24} color={ui != false ? 'black' : 'white'} />
                    </TouchableOpacity>
                    <View style={styles.profileImgae}>

                    </View>
                    <Text style={[
                        styles.profileName,
                        ui != false ? { color: 'black' } : { color: '#D9D9D9' }
                    ]}>
                        김우희
                    </Text>
                </View>
            </View>


            {/* 채팅 내용 세션 */}
            <View style={styles.chatListSection}>
                <ScrollView style={{ flexDirection: 'column-reverse', }}>
                    {chat.map((msg, index) => (
                        <Text
                            key={index}
                            style={[
                                styles.chatListText,
                                ui != false ? { color: 'black' } : { color: '#D9D9D9' },
                                ui != false ? {borderColor: '#DBDBDB',} : {borderColor: '#242424',}
                            ]}
                        >
                            {msg.message}{msg.user}
                        </Text>
                    ))}
                </ScrollView>
            </View>


            {/* 입력 세션 */}
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.inputSection}
            >
                <TextInput
                    style={styles.textInput}
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    color={ui != false ? 'black' : 'white'}
                />
                <TouchableOpacity
                    style={styles.sendBtn}
                    onPress={emitMessage}
                >
                    <Text style={styles.sendBtnText}>보내기</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;




const styles = StyleSheet.create({
    //헤더 세션
    headerSection: {
        width: '91%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerBorder: {
        width: '100%',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    profileImgae: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginLeft: 10,
        backgroundColor: '#D9D9D9',
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'normal',
        marginLeft: 10,
    },


    //채팅 내용 세션
    chatListSection: {
        flex: 1,
        width: '91%',
        marginTop: 10,
    },
    chatListText: {
        padding: 13,
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 15,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },






    //입력 세션
    inputSection: {
        width: '91%',
        flexDirection: 'row',
        borderRadius: 20,
        borderColor: '#767676',
        borderWidth: 1,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    textInput: {
        flex: 1,
        margin: 10,
    },
    sendBtn: {
        margin: 10,
    },
    sendBtnText: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#2A8FF7',
    },
})