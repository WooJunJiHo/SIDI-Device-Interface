import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from 'react-native'
import { useState, useEffect } from 'react';


//선택창
import { Picker } from 'react-native-wheel-pick';

//다크 모드
import DarkMode from '../components/styles/DarkMode'

//아이콘
import Icon from '../components/styles/Icons';

//데이터 패치
import { getColors, getInfos } from '../components/Fetch/FetchData';

//갤러리, 카메라
import { onSelectImage } from '../components/utils/Gallery'
import CameraComponent from '../components/utils/Camera';





const AssetsAdd = (props) => {
    // 다크 모드
    const [ui, setUI] = useState(false);

    //분석한 자산
    const [asset, setAsset] = useState('Apple iPhone Pro')
    const [assetColor, setAssetColor] = useState()
    const [assetInfo, setAssetInfo] = useState()

    //선택
    const [pickerStat, setPickerStat] = useState(false)
    const [pickerColorStat, setPickerColorStat] = useState(false)
    const [filters, setFilters] = useState(null)
    const [model, setModel] = useState(null)
    const [color, setColor] = useState(null)

    //자산 이미지
    const [assetImages, setAssetImages] = useState([])

    //카메라 선택
    const [onCamera, setOnCamera] = useState(false)


    useEffect(() => {
        const fetchInfos = async () => {
            const infoTemp = await getInfos()
            setAssetInfo(infoTemp)
        }
        const fetchColors = async () => {
            const colorTemp = await getColors()
            setAssetColor(colorTemp)
        }
        fetchInfos()
        fetchColors()

    }, [])



    //자산 추가 방법 선택
    const selectAssetsAlert = () => {
        Alert.alert(                    // 말그대로 Alert를 띄운다
            "선택해주세요",                    // 첫번째 text: 타이틀 제목
            "Select Plz",                         // 두번째 text: 그 밑에 작은 제목
            [                              // 버튼 배열
                {
                    text: "갤러리",                              // 버튼 제목
                    onPress: () => {
                        const selectAssetsAlert = () => {
                            onSelectImage()
                                .then((imageTemp) => {
                                    setAssetImages([...assetImages, { uri: imageTemp }]);
                                })
                                .catch((error) => {
                                    console.log('Error selecting image:', error);
                                });
                        };
                        selectAssetsAlert()
                    },     //onPress 이벤트시 콘솔창에 로그를 찍는다
                },
                {
                    text: "카메라",
                    onPress: () => setOnCamera(true)
                }, //버튼 제목
                // 이벤트 발생시 로그를 찍는다
            ],
            { cancelable: false }
        );
    }

    //카메라 결과 return
    const imageCapture = (imageUri) => {
        setAssetImages([...assetImages, { uri: imageUri }]);
        setOnCamera(false)
    };


    if (onCamera === true) { return <CameraComponent onImageCallBack={imageCapture}/> }
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
                    <TouchableOpacity
                        style={styles.image}
                        onPress={() => {
                            selectAssetsAlert()
                        }}
                    >
                        <Icon name='camera-outline' size={24} color='white' />
                    </TouchableOpacity>
                    {assetImages ? assetImages.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => {
                                // 이미지 선택 시 삭제
                                const updatedImages = [...assetImages];
                                updatedImages.splice(idx, 1);
                                setAssetImages(updatedImages);
                            }}
                        >
                            <Image style={styles.image} source={{ uri: item.uri }} />
                        </TouchableOpacity>
                    )) : null}
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
                        model === null ? console.log('모델 먼저 선택해주세요') : setPickerColorStat(true)
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
                <View style={styles.pickerBackground}>
                    <View style={styles.pickerOpacity}></View>
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
                            textSize={18}
                            pickerData={filters}
                            onValueChange={value => { setModel(value) }}
                        />
                    </View>
                </View> : null
            }
            {pickerColorStat ?
                <View style={styles.pickerBackground}>
                    <View style={styles.pickerOpacity}></View>
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
                    </View>
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
        backgroundColor: '#767676',
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
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