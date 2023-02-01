import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import validator from 'validator';
import { useTheme } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {
    const { colors } = useTheme();
    let diInput, fnInput, lnInput, emailInput, dobInput, phoneInput, streetnumberInput, streetInput, cityInput, pcInput, stateInput, countryInput;
    const [data, setData] = useState({
        driverid: '',
        pin: '',
        firstname: '',
        lastname: '',
        email: '',
        dateofbirth: '',
        phone: '',
        address: {
            streetnumber: '',
            street: '',
            city: '',
            postalcode: '',
            state: '',
            country: '',
        },

        check_textInputChange: false,
        check_DOB: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,

        isValidDriverid: false,
        isValidFirstName: false,
        isValidLastName: false,
        isValidEmail: false,
        isValidDOB: false,
        isValidPhone: false,
        isValidStreetNumber: false,
        isValidStreet: false,
        isValidCity: false,
        isValidPostalCode: false,
        isValidState: false,
        isValidCountry: false,
    });
    const [errortext, setErrortext] = useState('');
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);

    const setDriverid = (val) => {
        if (val.length >= 4) {
            setData({
                ...data,
                driverid: val,
                check_Driverid: true,
                isValidDriverid: true
            });
        } else {
            setData({
                ...data,
                driverid: val,
                check_Driverid: false,
                isValidDriverid: false
            });
        }
    }
    const setPin = (val) => {
        if (val.length >= 4) {
            setData({
                ...data,
                pin: val,
                check_Pin: true,
                isValidPin: true
            });
        } else {
            setData({
                ...data,
                pin: val,
                check_Pin: false,
                isValidPin: false
            });
        }
    }

    const setFirstname = (val) => {
        if (val.length >= 4) {
            setData({
                ...data,
                firstname: val,
                check_FirstName: true,
                isValidFirstName: true
            });
        } else {
            setData({
                ...data,
                firstname: val,
                check_FirstName: false,
                isValidFirstName: false
            });
        }
    }
    const setLastname = (val) => {
        if (val.length >= 4) {
            setData({
                ...data,
                lastname: val,
                check_LastName: true,
                isValidLastName: true
            });
        } else {
            setData({
                ...data,
                lastname: val,
                check_LastName: false,
                isValidLastName: false
            });
        }
    }

    const textEmailChange = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(val) === true) {
            setData({
                ...data,
                email: val,
                check_textEmailChange: true,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textEmailChange: false,
                isValidEmail: false
            });
        }
    }
    const setDOB = (val) => {
        if (validator.isDate(val)) {
            console.log(val)
            var parts = val.split("/");
            var dtDOB = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
            var dtCurrent = new Date();
            if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 21) {
                setData({
                    ...data,
                    dateofbirth: val,
                    check_DOB: false,
                    isValidDOB: false
                });
            }
            if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 21) {
                if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                    setData({
                        ...data,
                        dateofbirth: val,
                        check_DOB: false,
                        isValidDOB: false
                    });
                }
                if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                    if (dtCurrent.getDate() < dtDOB.getDate()) {
                        setData({
                            ...data,
                            dateofbirth: val,
                            check_DOB: false,
                            isValidDOB: false
                        });
                    }
                }
            }
            if (dtCurrent.getFullYear() - dtDOB.getFullYear() > 21) {
                setData({
                    ...data,
                    dateofbirth: val,
                    check_DOB: true,
                    isValidDOB: true
                });
            }
        } else {
            setData({
                ...data,
                dateofbirth: val,
                check_DOB: false,
                isValidDOB: false
            });
        }


        // console.log(validator.isDate(val));
        // if (validator.isDate(val)) {
        // setData({
        //     ...data, 
        //     dateofbirth: val,
        //     check_DOB: true,
        //     isValidDOB: true
        // });
        // }  else {
        // setData({
        //     ...data,
        //     dateofbirth: val,
        //     check_DOB: false,
        //     isValidDOB: false
        // });
        // }      
    }
    const setPhone = (val) => {
        setData({
            ...data,
            phone: val,
            isValidPhone: true
        });
    }
    const setStreetNumber = (val) => {
        setData({
            ...data,
            address: { ...data.address, streetnumber: val },
            isValidStreetNumber: true,
        });
    }
    const setStreet = (val) => {
        setData({
            ...data,
            address: { ...data.address, street: val },
            isValidStreet: true
        });
    }
    const setCity = (val) => {
        setData({
            ...data,
            address: { ...data.address, city: val },
            isValidCity: true
        });
    }
    const setState = (val) => {
        setData({
            ...data,
            address: { ...data.address, state: val },
            isValidState: true
        });
    }
    const setPostalcode = (val) => {
        setData({
            ...data,
            address: { ...data.address, postalCode: val },
            isValidPostalCode: true
        });
    }
    const setCountry = (val) => {
        setData({
            ...data,
            address: { ...data.address, country: val },
            isValidCountry: true
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    console.log(data.phone);
    var dataToSend = { ...data };
    const handleSubmitButton = async () => {
        console.log(dataToSend);
        if (!data.pin && !data.driverid && !data.firstname && !data.lastname && !data.email && !data.dateofbirth && !data.phone && !data.address.streetnumber && !data.address.street && !data.address.city && !data.address.postalCode && !data.address.state && !data.address.country) {
            alert('Please enter all fields');
            return;
        }
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log(formBody);
        axios.post(
            `http://192.168.43.36:4000/Driver/registerDriver`,
            //`https://apponpress.herokuapp.com/Driver/registerDriver`,
            formBody
        )
            .then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    setIsRegistraionSuccess(true);
                } else {
                    setErrortext(res.msg);
                }
            })
            .catch((e) => { console.log(e) });
    };

    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                {/* <Image
               source={require('../Image/success.png')}
              style={{
                height: 150,
                resizeMode: 'contain',
                alignSelf: 'center'
              }}
            /> */}
                <Text style={styles.successTextStyle}>
                    Registeration Successfull
                </Text>
                <TouchableOpacity
                    style={styles.signIn}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('SignInScreen')}>
                    <Text style={styles.buttonTextStyle}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#FF6347' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, { backgroundColor: colors.background }]}
            >
                <ScrollView>
                    <View style={styles.action}>
                        <Text style={styles.text_footer}>Pin</Text>
                        <TextInput
                            placeholder=""
                            keyboardType='numeric'
                            style={styles.textInput}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { diInput.focus(); }}
                            blurOnSubmit={false}
                            onChangeText={(val) => setPin(val)}
                        />
                    </View>
                    <View style={styles.action}>
                        <Text style={styles.text_footer}>Driver Id</Text>
                        <TextInput
                            placeholder=""
                            keyboardType='numeric'
                            style={styles.textInput}
                            returnKeyType={"next"}
                            ref={(input) => { diInput = input; }}
                            onSubmitEditing={() => { fnInput.focus(); }}
                            blurOnSubmit={false}
                            onChangeText={(val) => setDriverid(val)}
                        />
                    </View>

                    <View style={styles.action}>
                        {/* <FontAwesome
                            name="user-o"
                            color="#fff"
                            size={20}
                        /> */}
                        <Text style={styles.text_footer}>First name</Text>
                        <TextInput
                            placeholder=""
                            style={styles.textInput}
                            autoCapitalize="words"
                            returnKeyType={"next"}
                            ref={(input) => { fnInput = input; }}
                            onSubmitEditing={() => { lnInput.focus(); }}
                            blurOnSubmit={false}
                            onChangeText={(val) => setFirstname(val)}
                        />
                        {data.check_FirstName ?
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
                    {data.isValidFirstName ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>First name must be atleast 4 characters long.</Text>
                        </Animatable.View>
                    }


                    <View style={styles.action}>
                        {/* <FontAwesome
                            name="user-o"
                            color="#fff"
                            size={20}
                        /> */}
                        <Text style={styles.text_footer}>Last name</Text>
                        <TextInput
                            ref={(input) => { lnInput = input; }}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { emailInput.focus(); }}
                            blurOnSubmit={false}
                            editable={data.isValidFirstName}
                            placeholder=""
                            style={styles.textInput}
                            autoCapitalize="words"
                            onChangeText={(val) => setLastname(val)}
                        />
                        {data.check_LastName ?
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
                    {data.isValidLastName ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Last name must be atleast 4 characters long.</Text>
                        </Animatable.View>
                    }


                    <View style={styles.action}>
                        {/* <FontAwesome
                            name="envelope-o"
                            color="#fff"
                            size={20}
                        /> */}
                        <Text style={styles.text_footer}>Email</Text>
                        <TextInput
                            ref={(input) => { emailInput = input; }}
                            keyboardType='email-address'
                            returnKeyType={"next"}
                            onSubmitEditing={() => { dobInput.focus(); }}
                            blurOnSubmit={false}
                            editable={data.isValidLastName}
                            placeholder=""
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textEmailChange(val)}
                        />
                        {data.check_textEmailChange ?
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
                            <Text style={styles.errorMsg}>Email is incorrect.</Text>
                        </Animatable.View>
                    }


                    <View style={styles.action}>
                        {/* <Feather
                            name="calendar"
                            color="#fff"
                            size={20}
                        /> */}
                        <Text style={styles.text_footer}>Date of Birth</Text>
                        <TextInput
                            ref={(input) => { dobInput = input; }}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { phoneInput.focus(); }}
                            blurOnSubmit={false}
                            editable={data.isValidEmail}
                            placeholder="yyyy/mm/dd"
                            style={styles.textInput}
                            onChangeText={(val) => setDOB(val)}
                        />
                        {data.check_DOB ?
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
                    {data.isValidDOB ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Must not be below 21 years of age</Text>
                        </Animatable.View>
                    }

                    <View style={styles.action}>
                        {/* <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            /> */}
                        <Text style={styles.text_footer}>Phone</Text>
                        <TextInput
                            ref={(input) => { phoneInput = input; }}
                            keyboardType='numeric'
                            returnKeyType={"next"}
                            onSubmitEditing={() => { streetnumberInput.focus(); }}
                            blurOnSubmit={false}
                            // editable={data.isValidCountry}                
                            placeholder=""
                            style={styles.textInput}                            // 
                            onChangeText={(val) => setPhone(val)}
                        />
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35, fontWeight: "900",
                    }]}>Address</Text>
                    <View style={{ paddingLeft: 10 }}>

                        <View style={styles.action}>
                            {/* <FontAwesome
                                name="address-card"
                                color="#05375a"
                                size={20}
                            /> */}
                            <Text style={[styles.text_footer, {
                                marginTop: 5
                            }]}>Street number</Text>
                            <TextInput
                                ref={(input) => { streetnumberInput = input; }}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { streetInput.focus(); }}
                                blurOnSubmit={false}
                                //  editable={data.isValidDOB}                    
                                placeholder=""
                                style={styles.textInput}
                                autoCapitalize="words"
                                onChangeText={(val) => setStreetNumber(val)}
                            />
                        </View>


                        <View style={styles.action}>
                            {/* <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            /> */}
                            <Text style={styles.text_footer}>Street</Text>
                            <TextInput
                                ref={(input) => { streetInput = input; }}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { cityInput.focus(); }}
                                blurOnSubmit={false}
                                // editable={data.isValidStreetNumber}

                                placeholder=""
                                style={styles.textInput}
                                autoCapitalize="words"
                                onChangeText={(val) => setStreet(val)}
                            />
                        </View>

                        <View style={styles.action}>
                            {/* <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            /> */}
                            <Text style={styles.text_footer}>City</Text>
                            <TextInput
                                ref={(input) => { cityInput = input; }}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { pcInput.focus(); }}
                                blurOnSubmit={false}
                                // editable={data.isValidStreet}

                                placeholder=""
                                style={styles.textInput}
                                autoCapitalize="words"
                                onChangeText={(val) => setCity(val)}
                            />
                        </View>

                        <View style={styles.action}>
                            {/* <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            /> */}
                            <Text style={styles.text_footer}>Postal code</Text>
                            <TextInput
                                ref={(input) => { pcInput = input; }}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { stateInput.focus(); }}
                                blurOnSubmit={false}
                                // editable={data.isValidCity}

                                placeholder=""
                                style={styles.textInput}
                                autoCapitalize="words"
                                onChangeText={(val) => setPostalcode(val)}
                            />
                        </View>

                        <View style={styles.action}>
                            {/* <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            /> */}
                            <Text style={styles.text_footer}>State</Text>
                            <TextInput
                                ref={(input) => { stateInput = input; }}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { countryInput.focus(); }}
                                blurOnSubmit={false}
                                // editable={data.isValidPostalCode}

                                placeholder=""
                                style={styles.textInput}
                                autoCapitalize="words"
                                onChangeText={(val) => setState(val)}
                            />
                        </View>

                        <View style={styles.action}>
                            {/* <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            /> */}
                            <Text style={styles.text_footer}>Country</Text>
                            <TextInput
                                ref={(input) => { countryInput = input; }}
                                // editable={data.isValidRegion}                                
                                placeholder=""
                                style={styles.textInput}
                                autoCapitalize="words"
                                onChangeText={(val) => setCountry(val)}
                            />
                        </View>
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorMsg}>
                            {errortext}
                        </Text>
                    ) : null}

                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                        </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            // onPress={() => {}}
                            onPress={handleSubmitButton}
                        >
                            <LinearGradient
                                colors={['#FFA07A', '#FF6347']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#FF6347',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#FF6347'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6347'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: windowHeight / 16,
        paddingLeft: windowWidth / 4,
    },
    footer: {
        flex: Platform.OS === 'ios' ? 5 : 5,
        //backgroundColor: '#fff',
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
        color: '#fff',
        fontSize: 14,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        opacity: 0.5,
    },
    action: {
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#ccc',
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
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#ccc',
        fontSize: 10,
        opacity: 0.4,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});
