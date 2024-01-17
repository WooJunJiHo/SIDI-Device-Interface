import { StyleSheet } from "react-native";


const backgroundColor = StyleSheet.create({

    //전체 화면
    darkView: {
        backgroundColor: '#111'
    },
    lightView: {
        backgroundColor: '#F0F0F0'
    },

    //서브 화면
    darkSubView: {
        backgroundColor: '#242424'
    },
    lightSubView: {
        backgroundColor: '#FFF'
    },

    //텍스트
    darkMainText: {
        color: '#FFF',
    },
    lightMainText: {
        color: '#111'
    },

    //검색창
    darkTextInput: {
        backgroundColor: '#242424',
    },
    lightTextInput: {
        backgroundColor: '#F0F0F0',
    },
})

export default backgroundColor