import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import LineChart from '../components/LineChart/LineChart';


const CompletePage = () => {
    const navigation = useNavigation();

    return (
        <View>

            <View style={styles.mainContainer}>
                <Text style={styles.mainText}>
                    제품 가격을 <Text style={styles.highlightedText}>측정 완료</Text>했습니다
                </Text>
            </View>

            <View>
                <Text style={styles.kind}>아이폰 12 PRO 화이트</Text>
            </View>

            <View style={styles.inforView}>
                <View style={styles.graphView}>
                    <LineChart/>
                </View>
                <View style={styles.graphInforView}>
                    <Text style={styles.situation}>상태</Text>
                    <Text style={styles.situationText}>외판 손상</Text>
                    <Text style={styles.situationText}>액정 손상</Text>
                    <View style={styles.barView}>
                    </View>
                    <Text style={styles.situation}>측정가</Text>
                    <Text style={styles.situationText}>1,210,000원</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('FirstPage')}>
                    <View style={styles.back}>
                        <Text style={styles.backText}>처음으로</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('QRcodePage')}>
                    <View style={styles.Ok}>
                        <Text style={styles.okText}>등록하기</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    mainText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 48,
        color: '#111111',
    },
    highlightedText: {
        color: '#6C60F1',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
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
    Ok: {
        backgroundColor: '#6C60F1',
        width: 280,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        marginLeft: 20,
    },
    okText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 24,
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    kind: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 32,
        color: '#111111',
        alignSelf: 'center',
        marginTop: -20
    },
    inforView: {
        width: 800,
        height: 400,
        marginTop: 20,
        alignSelf: 'center',
        marginBottom: 40,
        flexDirection: 'row',
    },
    graphView: {
        backgroundColor: '#FAFAFA',
        width: 400,
        height: 400,
        borderRadius: 30,
        marginLeft: 40,
    },
    graphInforView: {
        width: 300,
        height: 400,
        borderRadius: 30,
        marginLeft: 20,
        borderColor: '#DBDBDB',
        borderWidth: 2,
    },
    situation: {
        fontFamily: 'NotoSansCJKkr-Regular',
        fontSize: 20,
        color: '#6C60F1',
        marginTop: 20,
        marginLeft: 40,
        marginBottom: -20
    },
    situationText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 32,
        color: '#111111',
        marginLeft: 40,
        marginBottom: -30,
    },
    barView: {
        width: 220,
        height: 2,
        backgroundColor: '#DBDBDB',
        alignSelf: 'center',
        marginTop: 130
    },

});



export default CompletePage;