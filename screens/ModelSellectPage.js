import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';


//DB 로드
import { getInfos, fetchColor } from '../components/Fetch/FetchData'


const ModelSellectPage = (props) => {
    const { params } = props.route;
    const assetName = params ? params.assetName : null;

    const isFocused = useIsFocused();

    const [asset, setAsset] = useState(null)
    const [infos, setInfos] = useState(null)
    const [rgb, setRGB] = useState(null)
    const [load, setLoad] = useState(false)


    useEffect(() => {
        const loadColor = async () => {
            setLoad(false)
            const infoResult = await getInfos(assetName)
            setInfos(infoResult)
            setLoad(true)
        }
        loadColor()
    }, [isFocused])



    if (load == false) {
        return (
            <View></View>
        )
    } else if (load == 'color') {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FastImage style={{ width: 309, height: 400 }} source={require('../assets/images/analyzeLoading.gif')} />
                <Text style={{ fontSize: 40 }}>색상 분석중...</Text>
            </View>
        )
    } else if (load == 'colorResult') {
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>
                <Text style={styles.titleText}>
                    <Text style={styles.titleColorText}>색상</Text>을 <Text style={styles.titleColorText}>확인</Text>해주세요
                </Text>
                <View style={styles.colorView}>
                    <View style={{ width: 150, height: 150, borderRadius: 200, backgroundColor: rgb.RGB }}></View>
                    <Text style={{ fontSize: 30 }}>{rgb.color}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={[styles.nextBtn, { borderWidth: 2 }]}
                    onPress={() => {
                        setLoad(true)
                    }}
                >
                    <Text style={styles.nextBtnText}>다시 선택</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.nextBtn, { backgroundColor: '#6C60F1' }]}
                    onPress={() => {
                        props.navigation.navigate('CheckListPage', { rgb: rgb, asset: asset })
                    }}
                >
                    <Text style={[styles.nextBtnText, { color: 'white' }]}>완료하기</Text>
                </TouchableOpacity>
            </View>

            </View>
        )
    }
    return (
        <View style={styles.mainView}>
            <Text style={styles.titleText}>
                <Text style={styles.titleColorText}>기종</Text>을 <Text style={styles.titleColorText}>선택</Text>해주세요
            </Text>

            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.modelsView}>
                        {infos.map((item, idx) => {
                            if (idx % 2 == 0) {
                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={() => {
                                            const fetchFlask = async () => {
                                                setLoad('color')
                                                const result = await fetchColor({ index: item.AssetsMoreInfoID, name: `${item.COMPANY} ${item.MODEL} ${item.MORE}` })
                                                setRGB(result)
                                                setAsset({
                                                    index: item.AssetsMoreInfoID,
                                                    COMPANY: item.COMPANY,
                                                    MODEL: item.MODEL,
                                                    MORE: item.MORE,
                                                    CATEGORY: assetName.category,
                                                })
                                                setLoad('colorResult')
                                            }
                                            fetchFlask()
                                        }}
                                        style={{ flexDirection: 'row' }}
                                    >
                                        <View style={styles.modelCheck}>
                                            <Image source={require('../assets/images/Vector.png')} />
                                        </View>
                                        <Text style={styles.modelText}>{item.COMPANY} {item.MODEL} {item.MORE}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </View>
                    <View style={[styles.modelsView]}>
                        {infos.map((item, idx) => {
                            if (idx % 2 != 0) {
                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={() => {
                                            const fetchFlask = async () => {
                                                setLoad('color')
                                                const result = await fetchColor({ index: item.AssetsMoreInfoID, name: `${item.COMPANY} ${item.MODEL} ${item.MORE}` })
                                                setRGB(result)
                                                setAsset({
                                                    index: item.AssetsMoreInfoID,
                                                    COMPANY: item.COMPANY,
                                                    MODEL: item.MODEL,
                                                    MORE: item.MORE,
                                                    CATEGORY: assetName.category,
                                                })
                                                setLoad('colorResult')
                                            }
                                            fetchFlask()
                                        }}
                                        style={{ flexDirection: 'row' }}
                                    >
                                        <View style={styles.modelCheck}>
                                            <Image source={require('../assets/images/Vector.png')} />
                                        </View>
                                        <Text style={styles.modelText}>{item.COMPANY} {item.MODEL} {item.MORE}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </View>
                </View>
            </ScrollView>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={[styles.nextBtn, { borderWidth: 2 }]}
                    onPress={() => {
                        props.navigation.navigate('FirstPage')
                    }}
                >
                    <Text style={styles.nextBtnText}>처음으로</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.nextBtn, { backgroundColor: '#6C60F1' }]}
                    onPress={() => {
                        props.navigation.navigate('SellectPage')
                    }}
                >
                    <Text style={[styles.nextBtnText, { color: 'white' }]}>다시 촬영</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}



export default ModelSellectPage




const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
    },


    titleText: {
        fontSize: 80,
        fontFamily: 'NotoSansCJKkr-Bold',
        color: 'black',
        marginTop: 60,
    },
    titleColorText: {
        color: '#6C60F1'
    },



    modelText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'gray',
        marginBottom: 60,
        marginTop: 10,
        marginLeft: 20,
    },


    colorView: {
        width: 450,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 50,
        marginBottom: 50,
    },

    checkBtn: {
        width: 150,
        height: 80,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 18,
    },


    modelsView: {
        width: 450,
        marginRight: 10,
        marginLeft: 10,
    },


    nextBtn: {
        marginBottom: 50,
        borderColor: 'gray',
        width: 280,
        height: 90,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    nextBtnText: {
        fontFamily: 'NotoSansCJKkr-Bold',
        fontSize: 25,
    },

    modelCheck: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
})