import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';


//DB 로드
import { getColors, getInfos, fetchColor } from '../components/Fetch/FetchData'


const ModelSellectPage = (props) => {
    const { params } = props.route;
    const assetName = params ? params.assetName : null;

    const isFocused = useIsFocused();

    const [colors, setColors] = useState(null)
    const [infos, setInfos] = useState(null)
    const [rgb, setRGB] = useState(null)
    const [load, setLoad] = useState(false)


    useEffect(() => {
        const loadColor = async () => {
            setLoad(false)
            const infoResult = await getInfos(assetName) 
            setInfos(infoResult)
            const colorResult = await getColors()
            setColors(colorResult)
            setLoad(true)
        }
        loadColor()
    }, [isFocused]) 



    if(load == false) {
        return (
            <View></View>
        )
    } else if (load == 'color') {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <FastImage style={{width: 309, height: 400}} source={require('../assets/images/analyzeLoading.gif')}/>
                <Text style={{fontSize: 40}}>색상 분석중...</Text>
            </View>
        )
    } else if (load == 'colorResult') {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.colorView}>
                    <View style={{width: 100, height: 100, borderRadius: 200, backgroundColor: rgb.RGB}}></View>
                    <Text style={{fontSize: 30}}>{rgb.color}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.mainView}>
            {infos.map((item, idx) => {
                return (
                    <TouchableOpacity
                        key={idx}
                        onPress={() => {
                            const fetchFlask = async () => {
                                setLoad('color')
                                const result = await fetchColor({index: item.AssetsMoreInfoID, name: `${item.COMPANY} ${item.MODEL} ${item.MORE}`})
                                setRGB(result)
                                setLoad('colorResult')
                            }
                            fetchFlask()
                        }}
                    >
                        <Text style={styles.modelText}>{item.COMPANY} {item.MODEL} {item.MORE}</Text>
                    </TouchableOpacity>    
                )
            })}
        </View>
    )
}



export default ModelSellectPage




const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },


    modelText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },


    colorView: {
        width: 400,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 2,
    },
})