
import AsyncStorage from '@react-native-async-storage/async-storage';

const Store = {
    async set(name,value) {
        let payload = JSON.stringify(value)
        await AsyncStorage.setItem(name,payload)
    },
    async remove(name){
        await AsyncStorage.removeItem(name)
    },
    async get(name){
        let value = await AsyncStorage.getItem(name)
        return (value) ? JSON.parse(value) : null
    }
}
export default Store