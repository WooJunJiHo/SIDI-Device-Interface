import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const SellectPage = () => {
    const navigation = useNavigation();

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

                <TouchableOpacity onPress={() => navigation.navigate('CheckListPage')}>
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
        marginTop: 300,
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
});



export default SellectPage;