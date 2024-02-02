import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { login, logout, getProfile as getKakaoProfile, shippingAddresses as getKakaoShippingAddresses, unlink } from '@react-native-seoul/kakao-login';

//아이콘
import Icon from '../styles/Icons';


const KakaoLogin = () => {

    const [result, setResult] = useState('');

    const signInWithKakao = async () => {
      try {
        const token = await login();
        setResult(JSON.stringify(token));
      } catch (err) {
        console.error('login err', err);
      }
    };


  
      return (
        <TouchableOpacity
          style={[styles.loginBtn, { backgroundColor: '#FEE500', marginTop: 30 }]}
          onPress={() => {
            signInWithKakao();
          }}
        >
            <Icon
                name='logo-youtube'
                size={24}
                color='#111'
            />
            <Text style={styles.btnText}>
                카카오 로그인
            </Text>
        </TouchableOpacity>
    );
  };
  
  export default KakaoLogin;
  
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
  });