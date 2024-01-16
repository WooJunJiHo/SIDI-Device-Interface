import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { useState } from 'react'

//다크 모드
import DarkMode from '../components/styles/DarkMode'


const Home = (props) => {
    const [ui, setUI] = useState(false);

    return (
        <SafeAreaView
            style={[
                ui == false ? DarkMode.lightView : DarkMode.darkView,
                {
                    flex: 1,
                }
            ]}
        >
            <ScrollView style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>

                    {/* 사용자 세션 */}
                    <View style={styles.userSection}>
                        <Text style={[
                            ui == false ? DarkMode.lightMainText : DarkMode.darkMainText,
                            styles.userText,
                        ]}>
                            백지환
                        </Text>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 0
                            }}
                            onPress={() => {
                                ui == true ? setUI(false) : setUI(true)
                            }}
                        >
                            <Text style={styles.userSubText}>
                                내 자산 바로가기 ᐳ
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* 사용법 세션 */}
                    <View 
                        style={[
                            ui == false ? DarkMode.lightSubView : DarkMode.darkSubView,
                            styles.section, { height: 90 }
                        ]}
                    >

                    </View>

                    {/* 총 자산 세션 */}
                    <TouchableOpacity
                        style={[
                            ui == false ? DarkMode.lightSubView : DarkMode.darkSubView,
                            styles.section,
                            {
                                height: 95,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }
                        ]}
                    >
                        <View style={styles.totalImage}></View>
                        <Text style={styles.totalSubText1}>
                            총 자산{'\n'}
                            <Text
                                style={[
                                    ui == false ? DarkMode.lightMainText : DarkMode.darkMainText,
                                    styles.totalMainText
                                ]}
                            >
                                1,301,590,000원
                            </Text>
                        </Text>
                        <Text style={styles.totalSubText2}>ᐳ</Text>
                    </TouchableOpacity>


                    {/* 자산 그래프 세션 */}
                    <View 
                        style={[
                            ui == false ? DarkMode.lightSubView : DarkMode.darkSubView,
                            styles.section, { height: 280 }
                        ]}
                    >

                    </View>

                    {/* 자산 비율 세션 */}
                    <View 
                        style={[
                            ui == false ? DarkMode.lightSubView : DarkMode.darkSubView,
                            styles.section, { height: 309 }
                        ]}
                    >

                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}


export default Home


const styles = StyleSheet.create({
    section: {
        width: '94%',
        borderRadius: 20,
        marginBottom: 20,
    },


    //사용자 세션
    userSection: {
        flexDirection: 'row',
        width: '94%',
        height: 70,
        alignItems: 'center',
    },

    userText: {
        fontSize: 20,
        fontWeight: 700,
    },
    userSubText: {
        fontSize: 14,
        fontWeight: 700,
        color: '#767676',
    },




    //사용법 세션




    //총 자산 세션
    totalImage: {
        backgroundColor: '#2A8FF7',
        borderRadius: 100,
        width: 50,
        height: 50,
        margin: 20,
    },
    totalSubText1: {
        color: '#767676',
        fontSize: 18,
        fontWeight: 500,
    },
    totalMainText: {
        fontWeight: 700,
        lineHeight: 25,
    },
    totalSubText2: {
        color: '#767676',
        fontSize: 18,
        fontWeight: 'bold',
        position: 'absolute',
        right: 20,
    },

})