import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useState, useEffect } from 'react';


//다크 모드
import DarkMode from '../components/styles/DarkMode'

//아이콘
import Icon from '../components/styles/Icons';

//구글 로그인
import {
    GoogleSignin,
    GoogleSigninButton
  } from '@react-native-google-signin/google-signin';

import GoogleLogin from '../components/utils/GoogleLogin';

//카카오 로그인
import KakaoLogin from '../components/utils/KakaoLogin';

//네이버 로그인
import NaverLogin from '../components/utils/NaverLogin';




const Login = (props) => {
    // 다크 모드
    const [ui, setUI] = useState(false);




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





    //카카오로그인  
    const onPressKakaoBtn = async() => {
        props.navigation.navigate('KakaoLogin')
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
            {/* 타이틀 세션 */}
            <View
                style={styles.titleSection}
            >
                <Text
                    style={[
                        ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        styles.titleText
                    ]}
                >
                    로그인
                </Text>
                <TouchableOpacity
                    style={styles.titleIcon}
                    onPress={() => {
                        props.navigation.navigate('MyPageMain')
                    }}
                >
                    <Icon
                        name='arrow-back-outline'
                        size={24}
                        color={ui != false ? 'black' : 'white'}
                    />
                </TouchableOpacity>
            </View>

            {/* 로그인 버튼 세션 */}

            <NaverLogin />

            <GoogleLogin />

            <KakaoLogin />

        </SafeAreaView>
    )
}


export default Login



const styles = StyleSheet.create({
    //타이틀 세션
    titleSection: {
        width: '91%',
    },
    titleIcon: {
        position: 'absolute',
        left: 0,
        top: 30,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    },



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