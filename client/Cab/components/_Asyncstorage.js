import AsyncStorage from '@react-native-async-storage/async-storage';

const _storeData = async (key, value) => {
    //console.log('value===', value);
    try {
        // const items = [['userToken', data.user.confirmationCode], ['username', data.user.username]]
        // await AsyncStorage.multiSet(items, () => { });
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
}

const _retrieveData = async (key) => {
    //console.log('key===', key);
    try {
         // await AsyncStorage.multiGet(['userToken', 'username'], (err, store) => {
        //   store.map((result, i, store) => {            
        //    setUsertoken(store[0][1])
        //   });
        // });
       const data = await AsyncStorage.getItem(key);
       return data;
    } catch (error) {
        console.log(error);
    }
}

const _removeData = async (key) => {
    //console.log('key===', key);
    try {
        //await AsyncStorage.multiRemove(['username', 'userToken',]).then(() => { console.log('Removed') });
        await AsyncStorage.removeItem(key).then(() => { console.log('Removed') });
    } catch (error) {
        console.log(error);
    }
}

const _clearData = async () => {    
    try {
        await AsyncStorage.clear().then(() => { console.log('Removed') });
    } catch (error) {
        console.log(error);
    }
}
export { _storeData, _retrieveData, _removeData, _clearData};