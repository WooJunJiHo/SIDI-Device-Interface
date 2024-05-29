import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native'



const SIDI = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('FirstPage')}
            >
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../assets/images/SIDI.png')}
                />
            </TouchableOpacity>

        </View>
    )
}


export default SIDI