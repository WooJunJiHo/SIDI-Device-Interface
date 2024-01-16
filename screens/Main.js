import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import DarkMode from '../components/styles/DarkMode'


const Home = (props) => {
    
    return (
        <SafeAreaView style={[DarkMode.darkView, {flex: 1}]}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('TotalAsset')
                }}
            >
                <Text style={{fontSize: 20, color: 'white'}}>Main</Text>    
            </TouchableOpacity>
        </SafeAreaView>
    )
}


export default Home