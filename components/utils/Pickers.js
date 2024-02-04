import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { useState } from 'react';

//다크모드
import DarkMode from '../styles/DarkMode'

//아이콘
import Icon from '../styles/Icons';

//선택창
import { Picker } from 'react-native-wheel-pick';





//자산 추가 스크린 - 모델 선택
export const SelectModel = (props) => {
    const [result, setResult] = useState([])

    return (
        <View style={styles.pickerBackground}>
            <View style={styles.pickerOpacity}></View>
            <View
                style={[
                    props.ui != false ? { backgroundColor: '#FFF' } : { backgroundColor: '#242424' },
                    styles.pickerSection
                ]}
            >
                <Text
                    style={[
                        props.ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        styles.pickerTitle
                    ]}
                >
                    모델 선택
                </Text>
                <TouchableOpacity
                    style={{ position: 'absolute', right: 20, top: 20, }}
                    onPress={() => {
                        props.onSelectModel(result)
                    }}
                >
                    <Icon
                        name='arrow-redo'
                        size={24}
                        color='lightskyblue'
                    />
                </TouchableOpacity>
                <Picker 
                    style={styles.pickerView}
                    textColor={props.ui != false ? 'black' : 'white'}
                    textSize={18}
                    pickerData={props.items}
                    onValueChange={value => { 
                        const filteredArray = props.items.filter(item => item.value == value)
                        setResult(filteredArray) 
                    }}
                />
            </View>
        </View>
    )
}


//자산 추가 스크린 - 색상 선택
export const SelectColor = (props) => {
    return (
        <View style={styles.pickerBackground}>
            <View style={styles.pickerOpacity}></View>
            <View
                style={[
                    props.ui != false ? { backgroundColor: '#FFF' } : { backgroundColor: '#242424' },
                    styles.pickerSection,
                    { height: 400 },
                ]}
            >
                <Text
                    style={[
                        props.ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        styles.pickerTitle
                    ]}
                >
                    색상 선택
                </Text>
                <ScrollView>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}
                    >
                        {props.items.map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.colorView}
                                onPress={() => {
                                    props.onSelectColor(item.COLOR)
                                }}
                            >
                                <View
                                    style={[
                                        styles.rgbView,
                                        { backgroundColor: item.RGB }
                                    ]}>

                                </View>
                                <Text
                                    style={[
                                        styles.colorText,
                                        props.ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                                    ]}
                                >
                                    {item.COLOR}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}























const styles = StyleSheet.create({
    //자산 추가 스크린 - 선택창
    pickerBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
    },
    pickerOpacity: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: '#111',
        width: '100%',
    },
    pickerSection: {
        width: '98%',
        height: 280,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#767676',
    },
    pickerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    pickerView: {
        backgroundColor: '#00ff0000',
    },
    colorView: {
        width: '40%',
        height: 90,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#767676',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rgbView: {
        width: 30,
        height: 30,
        borderRadius: 100,
    },
    colorText: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: 'normal',
    },
})