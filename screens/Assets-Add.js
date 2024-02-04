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
import { SelectModel, SelectColor } from '../components/utils/Pickers'

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
                        const selectGallery = () => {
                            onSelectImage()
                                .then((imageTemp) => {
                                    setAssetImages([...assetImages, { uri: imageTemp }]);
                                })
                                .catch((error) => {
                                    console.log('Error selecting image:', error);
                                });
                        };
                        selectGallery()
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


    //선택창 결과 return
    const onSelectModel = (item) => {
        setModel(item)
        setPickerStat(false)
        setFilters(null)
    }

    const onSelectColor = (item) => {
        setColor(item)
        setPickerColorStat(false)
    }




    if (onCamera === true) { return <CameraComponent onImageCallBack={imageCapture} /> }
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
                            AssetsMoreInfoID: item.AssetsMoreInfoID, 
                            COMPANY: item.COMPANY, 
                            MODEL: item.MODEL, 
                            MORE: item.MORE, 
                            RESULT: item.RESULT,
                        }));
                        setColor(null)
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
                            {!model[0] ? setModel(null) : model[0].label}
                        </Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.infoView,
                        ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,
                    ]}
                    onPress={() => {
                        const filteredArray = assetColor.filter(item => item.AssetsMoreInfoID == model[0].value)
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
                <SelectModel
                    items={filters}
                    ui={ui}
                    onSelectModel={onSelectModel}
                /> : null
            }
            {pickerColorStat ?
                <SelectColor
                    items={filters}
                    ui={ui}
                    onSelectColor={onSelectColor}
                /> : null
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
})