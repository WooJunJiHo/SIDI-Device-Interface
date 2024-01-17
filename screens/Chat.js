import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useState } from 'react'


//다크모드
import DarkMode from '../components/styles/DarkMode'

//아이콘
import Icon from '../components/styles/Icons'


const Chat = (props) => {
    // 다크 모드
    const [ui, setUI] = useState(false);

    //검색바
    const [search, setSearch] = useState('');

    //리스트
    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);





    return (
        <SafeAreaView
            style={[
                ui != false ? DarkMode.lightPriceView : DarkMode.darkPriceView,
                {
                    flex: 1,
                }
            ]}
        >
            {/* 메인 타이틀 */}
            <Text
                style={[
                    ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                    styles.mainTitle
                ]}
            >
                채팅
            </Text>

            {/* 검색바 */}
            <View style={{ alignItems: 'center' }}>
                <View
                    style={[
                        ui != false ? DarkMode.lightTextInput : DarkMode.darkTextInput,
                        styles.searchSection
                    ]}
                >
                    <TouchableOpacity style={{ margin: 9, }}>
                        <Icon
                            style={styles.searchIcon}
                            name='search-outline'
                            size={24}
                            color='#767676'
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.searchTextInput}
                        value={search}
                        onChangeText={(e) => { setSearch(e) }}
                        placeholder=''
                        placeholderTextColor='#767676'
                        color={ui != false ? '#111' : '#DBDBDB'}
                        multiline={false}
                        maxLength={100}
                    />
                </View>
            </View>

            {/* 채팅 리스트 */}
            <ScrollView>
                <View style={styles.listSection}>
                    {list.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={styles.chatView}
                        >
                            <View style={styles.chatImage}></View>
                            <Text
                                style={[
                                    ui != false ? DarkMode.lightMainText : DarkMode.darkMainText,
                                    styles.chatNameText
                                ]}
                            >
                                김우희{'\n'}
                                <Text style={styles.chatContentText}>ㅋㅋㅋㅋㅋㅋㅋㅋ    · 2분</Text>
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default Chat


const styles = StyleSheet.create({
    //메인 타이틀
    mainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },


    //검색바
    searchSection: {
        height: 42,
        width: '91%',
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchTextInput: {
        flex: 1,
        paddingRight: 12,
    },



    //채팅 리스트 세션
    listSection: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
    },
    chatView: {
        width: '91%',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    chatImage: {
        width: 60,
        height: 60,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        marginRight: 12,
    },
    chatNameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    chatContentText: {
        fontSize: 14,
        fontWeight: 'normal',
        lineHeight: 22,
    },
})