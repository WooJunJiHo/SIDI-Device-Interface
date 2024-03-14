import React, {useState} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ChecklistItem = ({ text, checked, onPress, style, children }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.checklistItem, !checked ? styles.unchecked : null, checked && styles.checked, style]}>
                {children}
                <Text style={styles.checklistText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};





const CheckListPage = () => {
    const navigation = useNavigation();
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);

    return (
        <View>

            <View style={styles.mainContainer}>
                <Text style={styles.mainText}>
                    제품의 <Text style={styles.highlightedText}>상태</Text>를 <Text style={styles.highlightedText}>체크</Text>해주세요
                </Text>

            </View>

            <View style={styles.checklistContainer}>
                <ChecklistItem
                    checked={isChecked1}
                    onPress={() => setIsChecked1(!isChecked1)}
                    style={{ width: 60, height: 60, marginTop: 20 }}
                >
                    <Image
                        source={require('../assets/images/Vector.png')}
                        style={{ marginTop: 8 }}
                    />
                </ChecklistItem>
                <Text style={styles.checkText}>버튼 고장</Text>

                <ChecklistItem
                    checked={isChecked2}
                    onPress={() => setIsChecked2(!isChecked2)}
                    style={{ width: 60, height: 60, marginTop: 20 }}
                >
                    <Image
                        source={require('../assets/images/Vector.png')}
                        style={{ marginTop: 8 }}
                    />
                </ChecklistItem>
                <Text style={styles.checkText}>측면 기스</Text>

                <ChecklistItem
                    checked={isChecked3}
                    onPress={() => setIsChecked3(!isChecked3)}
                    style={{ width: 60, height: 60, marginTop: 20 }}
                >
                    <Image
                        source={require('../assets/images/Vector.png')}
                        style={{ marginTop: 8 }}
                    />
                </ChecklistItem>
                <Text style={styles.checkText}>스피커 고장</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('FirstPage')}>
                    <View style={styles.back}>
                        <Text style={styles.backText}>처음으로</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.Ok}>
                    <Text style={styles.okText}>완료하기</Text>
                </View>
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
    checklistContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor: '#FAFAFA',
        height: 100,
        width: 800,
        borderRadius: 100,
    },
    checklistItem: {
        borderWidth: 1,
        borderColor: '#767676',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    checklistText: {
        fontSize: 18,
    },
    checked: {
        backgroundColor: '#6C60F1',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
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
    checkText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 24,
        color: '#111111',
        marginLeft: 8,
        marginRight: 30,
        marginTop: 20,
    },
    unchecked: {
        backgroundColor: '#767676',
    },
    checked: {
        backgroundColor: '#6C60F1',
    },
});



export default CheckListPage;