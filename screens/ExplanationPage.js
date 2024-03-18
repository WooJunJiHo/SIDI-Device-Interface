import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const ExplanationPage = () => {
    const navigation = useNavigation();

    return (
        <View>

            <View style={styles.mainContainer}>
                <Text style={styles.subText}>SIDI</Text>
                <Text style={styles.mainText}>기술 설명</Text>
            </View>


            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.buttonContainer}>

                <View style={styles.explan1}>
                    <Text style={styles.explainText}>사진으로 제품명을 {"\n"}알 수 있어요!</Text>
                    <Image
                        source={require('../assets/images/Camera.png')}
                        style={{ width: 400, height: 500, marginTop: -120, marginLeft: 260 }}
                    />
                </View>

                <View style={styles.explan2}>
                    <Text style={styles.explainText}>시세를 분석하여{"\n"}알맞은 가격을 알려줘요</Text>
                    <Image
                        source={require('../assets/images/Graph.png')}
                        style={{ width: 400, height: 500, marginTop: -100, marginLeft: 240 }}
                    />
                </View>
                <View style={styles.explan3}>
                    <Text style={styles.explainText}>AI가 글을 작성해줘요</Text>
                    <Image
                        source={require('../assets/images/Writing.png')}
                        style={{ width: 600, height: 600, marginTop: -140, marginLeft: 160 }}
                    />
                </View>


            </ScrollView>
            <View style={styles.buttonContainer1}>
                <TouchableOpacity onPress={() => navigation.navigate('FirstPage')}>
                    <View style={styles.back}>
                        <Text style={styles.backText}>처음으로</Text>
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
    explan1: {
        backgroundColor: '#6C60F1',
        width: 600,
        height: 400,
        marginLeft: 90,
        borderRadius: 30,
    },
    explainText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 40,
        color: '#FFFFFF',
        marginTop: 24,
        marginLeft: 50,
    },
    explan2: {
        backgroundColor: '#F2B500',
        width: 600,
        height: 400,
        marginLeft: 40,
        borderRadius: 30,
    },
    explan3: {
        backgroundColor: '#42ACFA',
        width: 600,
        height: 400,
        marginLeft: 40,
        borderRadius: 30,
        marginRight: 90,
    },
    buttonContainer1: {
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



export default ExplanationPage;