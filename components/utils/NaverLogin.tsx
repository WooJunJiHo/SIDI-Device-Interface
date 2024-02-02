import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

//아이콘
import Icon from '../styles/Icons';


//네이버 로그인
import NaverLogin, {
        NaverLoginResponse,
        GetProfileResponse,
    } from '@react-native-seoul/naver-login';





const consumerKey = 'vngb9RsJR_8NiRxQtg3j';
const consumerSecret = 'ewF3IQNHAi';
const appName = 'com.App';
const serviceUrlScheme = 'naverLogin';





const naverLogin = () => {

    const [success, setSuccessResponse] =
        useState<NaverLoginResponse['successResponse']>();
    const [failure, setFailureResponse] =
        useState<NaverLoginResponse['failureResponse']>();
    const [getProfileRes, setGetProfileRes] = useState<GetProfileResponse>();





    const login = async () => {
        const {failureResponse, successResponse} = await NaverLogin.login({
            appName,
            consumerKey,
            consumerSecret,
            serviceUrlScheme,
        });
        setSuccessResponse(successResponse);
        setFailureResponse(failureResponse);
      };





    return (

        <TouchableOpacity
                style={[
                    styles.loginBtn,
                    { backgroundColor: '#2CC63C', marginTop: 30 }
                ]}
                onPress={login}
            >
                <Icon
                    name='logo-apple'
                    size={24}
                    color='#FFFFFF'
                />
                <Text
                    style={[
                        styles.btnText,
                        {color: '#FFFFFF'}
                    ]}
                >
                    네이버 로그인
                </Text>
            </TouchableOpacity>

    )


}





const styles = StyleSheet.create({

    //로그인 버튼 세션
    loginBtn: {
        width: '91%',
        height: 53,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 53,
        marginLeft: 9,
    },

})
export default naverLogin;