import { style } from 'd3';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const FirstPage = () => {
    return (
        <View>

            <View style={styles.mainContainer}>
                <Text style={styles.subText}>SIDI</Text>
                <Text style={styles.mainText}>전자 제품 중고가 확인</Text>
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <View style={styles.startContainer}>
                        <Text style={styles.startText}>전자 제품 중고가 확인</Text>
                        <Text style={styles.startSubText}>간편하게 내 핸드폰의 중고 가격을 측정해보세요</Text>
                        
                            <Image
                                source={require('../assets/images/Phone.png')}
                                style={{width:154, height:200, marginTop: 40, marginLeft: 600}}
                            />
                        
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.explanation}>
                        <Text style={styles.startText}>기술 설명</Text>
                        <Image
                                source={require('../assets/images/Explain.png')}
                                style={{ width: 400, height: 280, marginTop: 4, marginLeft: 90}}
                            />
                    </View>
                </TouchableOpacity>

            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    subText: {
        fontFamily: 'NotoSansCJKkr-regular',
        fontSize: 20,
        color: '#111111',
        marginLeft: 90,
        marginTop: 180
    },
    mainContainer: {
        justifyContent: 'center',
    },
    mainText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 48,
        color: '#6C60F1',
        marginLeft: 90,
        marginTop: -20
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    startContainer: {
        backgroundColor: '#6C60F1',
        width: 800,
        height: 400,
        marginLeft: 90,
        borderRadius: 30,
    },
    startText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 40,
        color: '#FFFFFF',
        marginTop: 24,
        marginLeft: 50,
    },
    startSubText: {
        fontFamily: 'NotoSansCJKkr-regular',
        fontSize: 28,
        color: '#FFFFFF',
        marginTop: -10,
        marginLeft: 50,
    },
    explanation: {
        backgroundColor: '#F2B500',
        width: 400,
        height: 400,
        marginLeft: 80,
        borderRadius: 30,
    }
});



export default FirstPage;