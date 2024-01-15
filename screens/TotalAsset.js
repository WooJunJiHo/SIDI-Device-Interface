import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'


const TotalAsset = (props) => {
    


    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('Main')
                }}
            >
                <Text>TotalAsset</Text>    
            </TouchableOpacity>
        </SafeAreaView>
    )
}


export default TotalAsset