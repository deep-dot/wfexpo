import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Dimensions,
    Alert
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
//import { AuthContext } from '../../components/context';
import { _retrieveData } from '../../components/_Asyncstorage';
import { login } from '../actions/driverAction';
import { useDispatch } from 'react-redux'

 const SignInScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [errortext, setErrortext] = useState('');

    let pinInput, regoInput;
    const [data, setData] = React.useState({
        driverid: '',
        pin: '',
        rego: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidDriverid: true,
        isValidPin: true,
        isValidRegistration: true,
    });
    // const { signin } = React.useContext(AuthContext);
    const { colors } = useTheme();

    const handleDriverIdChange = (val) => {
        if (val.trim().length >= 3) {
            setData({
                ...data,
                driverid: val,
                check_textInputChange: true,
                isValidDriverid: true
            });
        } else {
            setData({
                ...data,
                driverid: val,
                check_textInputChange: false,
                isValidDriverid: false
            });
        }
    }

    const handlePinChange = (val) => {
        if (val.trim().length === 4) {
            setData({
                ...data,
                pin: val,
                isValidPin: true
            });
        } else {
            setData({
                ...data,
                pin: val,
                isValidPin: false
            });
        }
    }

    const handleRegoChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                rego: val,
                isValidRego: true
            });
        } else {
            setData({
                ...data,
                rego: val,
                isValidRego: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidDriverid = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                isValidDriverid: true
            });
        } else {
            setData({
                ...data,
                isValidDriverid: false
            });
        }
    }

    const handleValidRegistration = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidRegistration: true
            });
        } else {
            setData({
                ...data,
                isValidRegistration: false
            });
        }
    }

    const handleSubmitPress = () => {
        // if (data.driverid.length == 0 || data.pin.length == 0 || data.rego.length == 0) {
        //     Alert.alert('Wrong Input!', 'Field cannot be empty', [
        //         { text: 'Okay' }
        //     ]);
        //     return;
        // }
        // let dataToSend = { driverid: data.driverid, pin: data.pin, rego: data.rego };
       let dataToSend = { driverid: "539978", pin: "1234", rego: "U5019" };
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        dispatch(login(formBody));       
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome!</Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: colors.background
                    }]}
                >
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Driver Id</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Driverid*"
                            returnKeyType={"next"}
                            onSubmitEditing={() => { pinInput.focus(); }}
                            blurOnSubmit={false}
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            keyboardType='numeric'
                            onChangeText={(val) => handleDriverIdChange(val)}
                            onEndEditing={(e) => handleValidDriverid(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidDriverid ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Incorrect Id.</Text>
                        </Animatable.View>
                    }


                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>PIN</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            ref={(input) => { pinInput = input }}
                            onSubmitEditing={() => { regoInput.focus(); }}
                            blurOnSubmit={false}
                            returnKeyType='next'
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            placeholder="Pin*"
                            keyboardType='numeric'
                            secureTextEntry={data.secureTextEntry ? true : false}
                            onChangeText={(val) => handlePinChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorMsg}>
                            {errortext}
                        </Text>
                    ) : null}
                    {data.isValidPin ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}> Pin must be 4 digit number </Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Vehicle Registeration Number</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="car"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            ref={(input) => { regoInput = input }}
                            blurOnSubmit={false}
                            placeholder="Rego*"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handleRegoChange(val)}
                            onEndEditing={(e) => handleValidRegistration(e.nativeEvent.text)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidRegistration ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Incorrect Registeration.</Text>
                        </Animatable.View>
                    }

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            // onPress={() => {loginHandle( data.username, data.password )}}
                            onPress={handleSubmitPress}
                        >
                            <LinearGradient
                                colors={['#FFA07A', '#FF6347']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign In</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUpScreen')}
                            style={[styles.signIn, {
                                borderColor: '#FF6347',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#FF6347'
                            }]}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SelectScreen')}
                            style={[styles.signIn, {
                                borderColor: '#FF6347',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#FF6347'
                            }]}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </ScrollView>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6347',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
       // paddingHorizontal: 50,
        marginBottom: windowHeight / 16,
        marginTop: Platform.OS === 'ios' ? windowHeight / 6 : windowHeight / 4,
        paddingLeft: windowWidth / 3,
    },
    footer: {
        flex: Platform.OS === 'ios' ? 5 : 5, 
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 50,  
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#ccc',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
});
