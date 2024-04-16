import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

//라즈베리파이 요청
import { fetchImages, fetchColor } from '../components/Fetch/FetchData';


const SellectPage = () => {
    const navigation = useNavigation();
    const [load, setLoad] = useState(null);
    const [images, setImages] = useState();
    const [color, setColor] = useState();



    if (load == 'image') {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <FastImage style={{width: 315, height: 400}} source={require('../assets/images/cameraLoading.gif')}/>
                <Text style={[styles.highlightedText, {fontSize: 40}]}>사진 촬영중...</Text>
            </View>
        )
    } else if (load == 'color') {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <FastImage style={{width: 309, height: 400}} source={require('../assets/images/analyzeLoading.gif')}/>
                <Text style={[styles.highlightedText, {fontSize: 40}]}>자산 분석중...</Text>
            </View>
        )
    }
    return (
        <View>

            <View style={styles.mainContainer}>
                <Text style={styles.mainText}>
                    <Text style={styles.highlightedText}>모든 단계</Text>를 마무리 했으면 <Text style={styles.highlightedText}>완료 버튼</Text>를 눌러주세요
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('FirstPage')}>
                    <View style={styles.back}>
                        <Text style={styles.backText}>처음으로</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        const fetch = async () => {
                            setLoad('image')
                            const imageResult = await fetchImages()
                            setLoad('color')
                            const colorResult = await fetchColor()
                            setLoad(null)
                            setImages(imageResult)
                            setColor(colorResult)
                            console.log(imageResult)
                            console.log(colorResult)
                            //navigation.navigate('CheckListPage')
                        }
                        fetch()
                    }}>
                    <View style={styles.Ok}>
                        <Text style={styles.okText}>완료하기</Text>
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
        marginTop: 320,
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
        marginTop: 10,
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
});



export default SellectPage;