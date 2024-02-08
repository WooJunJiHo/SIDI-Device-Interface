import { Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

//구글로그인
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

//api키
import { REACT_APP_GOOGLE_WEB_CLIENT_ID } from '@env'




const GoogleLogin = () => {



    //구글 로그인 ID
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: REACT_APP_GOOGLE_WEB_CLIENT_ID,
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