import { Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

//다크 모드
import DarkMode from '../styles/DarkMode'

//아이콘
import Icon from '../styles/Icons';

//구글로그인
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';





const GoogleLogin = () => {



    //구글 로그인 ID
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '1091752426451-lfpi3t70mtaqauqjirtdkc4f4oucolof.apps.googleusercontent.com',
        });
    }, []);



    //구글 로그인 메소드
    const onPressGoogleBtn = async () => {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const {idToken} = await GoogleSignin.signIn();
        console.log('idToekn : ', idToken);
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const res = await auth().signInWithCredential(googleCredential);
    };





    return (
        <GoogleSigninButton
            style={[
                styles.loginBtn,
                { backgroundColor: '#FFFFFF', marginTop: 30 }
            ]}
            onPress={onPressGoogleBtn}
        />
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

export default GoogleLogin