import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { REACT_APP_SERVER_URL } from '@env'


//선택창
import { Picker } from 'react-native-wheel-pick';

//다크 모드
import DarkMode from '../components/styles/DarkMode'

//아이콤
import Icon from '../components/styles/Icons';





const AssetsAdd = (props) => {
    // 다크 모드
    const [ui, setUI] = useState(false);

    //분석한 자산
    const [asset, setAsset] = useState('Samsung Z Flip 3-4')
    const [assetColor, setAssetColor] = useState()
    const [assetInfo, setAssetInfo] = useState()

    //선택
    const [pickerStat, setPickerStat] = useState(false)
    const [pickerColorStat, setPickerColorStat] = useState(false)
    const [filters, setFilters] = useState(null)
    const [model, setModel] = useState(null)
    const [color, setColor] = useState(null)



    useEffect(() => {
        // /getColor에 GET 요청 보내기
        axios.get(`${REACT_APP_SERVER_URL}/getColor`)
            .then(response => { 
                setAssetColor(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // /getInfo에 GET 요청 보내기
        axios.get(`${REACT_APP_SERVER_URL}/getInfo`)
            .then(response => {
                setAssetInfo(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])



    return (
        <SafeAreaView
            style={[
                ui != false ? DarkMode.lightPriceView : DarkMode.darkPriceView,
                {
                    flex: 1,
                    alignItems: 'center',
                }
            ]}
        >
            {/* 타이틀 뷰 */}
            <View style={styles.titleSection}>
                <Text
                    style={[
                        ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        styles.mainTitle
                    ]}
                >
                    내 자산
                </Text>
                <TouchableOpacity
                    style={[styles.iconBtn, { left: 0, }]}
                    onPress={() => { props.navigation.navigate('MyPageMain') }}
                >
                    <Icon
                        name='arrow-back-outline'
                        size={24}
                        color={ui != false ? 'black' : 'white'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => { props.navigation.navigate('MyPageMain') }}
                >
                    <Text style={styles.titleBtnText}>완료</Text>
                </TouchableOpacity>
            </View>

            {/* 이미지 세션 */}
            <View style={styles.imageSection}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.image}>

                    </View>
                </ScrollView>
            </View>

            {/* 정보 세션 */}
            <View style={styles.infoSection}>
                <View
                    style={[
                        styles.infoView,
                        ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,
                    ]}
                >
                    <Text style={styles.infoText}>AI가 분석한 자산</Text>
                    <Text
                        style={[
                            styles.infoAssetText,
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                        ]}
                    >
                        {asset}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.infoView,
                        ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,
                    ]}
                    onPress={() => {
                        const filteredArray = assetInfo.filter(item => item.RESULT === asset)
                        const transformedData = filteredArray.map(item => ({
                            value: item.AssetsMoreInfoID,
                            label: item.COMPANY + ' ' + item.MODEL + ' ' + item.MORE,
                        }));
                        setFilters(transformedData)
                        setPickerStat(true)
                    }}
                >
                    <Text style={styles.infoText}>모델 선택</Text>
                    {model === null ?
                        <View style={{ position: 'absolute', right: 20, }}>
                            <Icon
                                name='arrow-forward-outline'
                                size={24}
                                color={ui != false ? 'black' : 'white'}
                            />
                        </View>
                        :
                        <Text
                            style={[
                                styles.infoAssetText,
                                ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                            ]}
                        >
                            {model}
                        </Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.infoView,
                        ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,
                    ]}
                    onPress={() => {
                        const filteredArray = assetColor.filter(item => item.AssetsMoreInfoID == model)
                        setFilters(filteredArray)
                        setPickerColorStat(true)
                    }}
                >
                    <Text style={styles.infoText}>색상 선택</Text>
                    {color === null ?
                        <View style={{ position: 'absolute', right: 20, }}>
                            <Icon
                                name='arrow-forward-outline'
                                size={24}
                                color={ui != false ? 'black' : 'white'}
                            />
                        </View>
                        :
                        <Text
                            style={[
                                styles.infoAssetText,
                                ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                            ]}
                        >
                            {color}
                        </Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.infoView,
                        ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,
                    ]}
                >
                    <Text style={styles.infoText}>360도 이미지 (선택 사항)</Text>
                    <View style={{ position: 'absolute', right: 20, }}>
                        <Icon
                            name='arrow-forward-outline'
                            size={24}
                            color={ui != false ? 'black' : 'white'}
                        />
                    </View>
                </TouchableOpacity>
            </View>


            {/* 선택창 세션 */}
            {pickerStat ?
                <View
                    style={[
                        ui != false ? { backgroundColor: '#FFF' } : { backgroundColor: '#242424' },
                        styles.pickerSection
                    ]}
                >
                    <Text
                        style={[
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                            styles.pickerTitle
                        ]}
                    >
                        모델 선택
                    </Text>
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 20, top: 20, }}
                        onPress={() => {
                            setPickerStat(false)
                            setFilters(null)
                        }}
                    >
                        <Icon
                            name='arrow-redo'
                            size={24}
                            color='lightskyblue'
                        />
                    </TouchableOpacity>
                    <Picker style={styles.pickerView}
                        textColor={ui != false ? 'black' : 'white'}
                        pickerData={filters}
                        onValueChange={value => { setModel(value) }}
                    />
                </View> : null
            }
            {pickerColorStat ?
                <View
                    style={[
                        ui != false ? { backgroundColor: '#FFF' } : { backgroundColor: '#242424' },
                        styles.pickerSection,
                        { height: 400 },
                    ]}
                >
                    <Text
                        style={[
                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
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
                            {filters.map((item, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={styles.colorView}
                                    onPress={() => {
                                        setColor(item.COLOR)
                                        setPickerColorStat(false)
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
                                            ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                                        ]}
                                    >
                                        {item.COLOR}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View> : null
            }

        </SafeAreaView>
    )
}




export default AssetsAdd



const styles = StyleSheet.create({
    //타이틀 세션
    titleSection: {
        width: '91%',
    },
    mainTitle: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconBtn: {
        position: 'absolute',
        right: 0,
        top: 30,
    },
    titleBtnText: {
        color: '#2A8FF7',
        fontSize: 20,
        fontWeight: 'bold',
    },


    //이미지 세션
    imageSection: {
        width: '91%',
        marginTop: 30,
    },
    image: {
        width: 90,
        height: 90,
        backgroundColor: '#767676'
    },



    //정보 세션
    infoSection: {
        width: '91%',
    },
    infoView: {
        height: 61,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    infoText: {
        color: '#767676',
        fontSize: 18,
        fontWeight: 'normal',
        marginLeft: 20,
    },
    infoAssetText: {
        position: 'absolute',
        right: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },



    //선택창
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