import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import { _retrieveData } from '../components/_Asyncstorage';
import { setAdmin } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const SignInScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const [errortext, setErrortext] = useState('');
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidEmail: true,
        isValidPassword: true,
    });
    //const { signinAdmin } = useContext(AuthContext);
    const { colors } = useTheme();

    const textInputChange = (val) => {
        if (val.trim().length >= 3) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidEmail: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidEmail = (val) => {
        if (val.trim().length >= 3) {
            setData({
                ...data,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                isValidEmail: false
            });
        }
    }

    const handleSubmitPress = () => {
        // if (data.email.length == 0 || data.password.length == 0) {
        //     Alert.alert('Wrong Input!', 'Email or password field cannot be empty.', [
        //         { text: 'Okay' }
        //     ]);
        //     return;
        // }
        // if (!data.email) {
        //     alert('Please enter Email');
        //     return;
        // }
        // if (!data.password) {
        //     alert('Please enter Password');
        //     return;
        // }
        // let dataToSend = { email: data.email, password: data.password };
        let dataToSend = { email: "Dhillon@gmail.com", password: "1234" };
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        // signinAdmin(formBody);
        axios.post(
            // `http://192.168.43.36:4000/appAuth/registerUser`,
            `http://192.168.43.36:4000/Admin/signin`,
            formBody
        ).then((res) => {
            //console.log('res in signinscreen===',res.data.admin)
            if (res.status === 200) {
                dispatch(setAdmin(res.data.admin));

            } else {
                setErrortext(res.msg);
            }
        }).catch((e) => { console.log(e) });
    }

    return (
        <View style={styles.container}>
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
                }]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Admin-email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
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
                {data.isValidEmail ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Incorrect email.</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
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

                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 4 characters long.</Text>
                    </Animatable.View>
                }

                <TouchableOpacity>
                    <Text style={{ color: '#FF6347', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>


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
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6347'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
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
        color: '#FF0000',
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
