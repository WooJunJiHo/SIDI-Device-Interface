import React, {useEffect} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

const QRcodePage = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('CompletePage');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View>

            <View style={styles.mainContainer}>
                <Text style={styles.mainText}>
                    <Text style={styles.highlightedText}>QR 코드</Text>를 찍어주세요
                </Text>
            </View>
            <View style={styles.QRContainer}>
                <QRCode
                    size={400}
                    value="https://www.youtube.com/watch?v=crYY_Y9OczU"
                    logoSize={300}
                    logoBackgroundColor='transparent'
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.back}>
                        <Text style={styles.backText}>취소하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120,
    },
    mainText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 48,
        color: '#111111',
    },
    highlightedText: {
        color: '#6C60F1',
    },
    QRContainer: {
        backgroundColor: '#D2D2D2',
        width: 400,
        height: 400,
        borderRadius: 20,
        alignSelf: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 40,
    },
    back: {
        borderColor: '#767676',
        borderWidth: 2,
        width: 280,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
    },
    backText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 24,
        color: '#767676',
        alignSelf: 'center',
    },
});



export default QRcodePage;