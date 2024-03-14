import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const StepPage = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('SellectPage');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View>

            <View style={styles.mainContainer}>
                <Text style={styles.mainText}>
                    <Text style={styles.highlightedText}>사용 방법</Text>을 알려드릴게요
                </Text>
            </View>


            <View style={styles.buttonContainer}>

                <View style={styles.stepContainer}>
                    <Text style={styles.startText}>1</Text>
                    <Text style={styles.startSubText}>핸드폰을 기기 안에 넣으세요</Text>
                    <Image
                        source={require('../assets/images/Inside.png')}
                        style={{ width: 400, height: 280, marginTop: 4, marginLeft: 90 }}
                    />
                </View>



                <View style={styles.stepContainer2}>
                    <Text style={styles.startText}>2</Text>
                    <Text style={styles.startSubText}>기기 문을 닫아주세요</Text>
                    <Image
                        source={require('../assets/images/Close.png')}
                        style={{ width: 400, height: 280, marginTop: 4, marginLeft: 90 }}
                    />
                </View>


                <View style={styles.stepContainer3}>
                    <Text style={styles.startText}>3</Text>
                    <Text style={styles.startSubText}>완료 버튼을 누르세요</Text>
                    <Image
                        source={require('../assets/images/Finish.png')}
                        style={{ width: 400, height: 280, marginTop: 4, marginLeft: 90 }}
                    />
                </View>

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
    highlightedText: {
        color: '#6C60F1',
    },
    mainContainer: {
        justifyContent: 'center',
    },
    mainText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 48,
        color: '#111111',
        marginLeft: 90,
        marginTop: 160
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    stepContainer: {
        backgroundColor: '#6C60F1',
        width: 400,
        height: 400,
        marginLeft: 90,
        marginRight: -30,
        borderRadius: 30,
    },
    stepContainer2: {
        backgroundColor: '#F2B500',
        width: 400,
        height: 400,
        marginLeft: 90,
        marginRight: -30,
        borderRadius: 30,
    },
    stepContainer3: {
        backgroundColor: '#42ACFA',
        width: 400,
        height: 400,
        marginLeft: 90,
        marginRight: -30,
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



export default StepPage;