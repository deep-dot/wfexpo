
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableHighlight,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import tw from "twrnc";
//import axios from 'axios';
//import { useTheme } from 'react-native-paper';
//import { AuthContext } from '../../../components/context';
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from "react-redux";
import { selectJobsDone } from '../../../slices/navSlice';

const CompletedJobsScreen = () => {
    // const { jobsDone } = useSelector((state) => state.jobsDone);
    const jobsDone = useSelector(selectJobsDone);
    const navigation = useNavigation();


    let listData = [];
    if (jobsDone) {
        listData = jobsDone.map((job, index) => ({
            key: `${index}`,
            createdAt: job.createdAt,
            title: job.pickuptime + ' - ' + job.dropofftime,
            details: job.pickupaddress.description + ' - ' + job.dropoffaddress.description,
            jobdetail: job,
        }));
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const onLeftActionStatusChange = rowKey => {
        console.log('onLeftActionStatusChange', rowKey);
    };

    const onRightActionStatusChange = rowKey => {
        console.log('onRightActionStatusChange', rowKey);
    };

    const onRightAction = rowKey => {
        console.log('onRightAction', rowKey);
    };

    const onLeftAction = rowKey => {
        console.log('onLeftAction', rowKey);
    };

    const VisibleItem = props => {
        const {
            data,
            rowHeightAnimatedValue,
            removeRow,
            leftActionState,
            rightActionState,
        } = props;
        // console.log('props data==', data.index)
        if (rightActionState) {
            Animated.timing(rowHeightAnimatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {
                removeRow();
            });
        }

        return (
            <Animated.View
                style={[styles.rowFront, { height: rowHeightAnimatedValue }]}>
                <TouchableHighlight
                    style={styles.rowFrontVisible}
                    onPress={() => {
                        navigation.navigate("JobdetailScreen", { title: 'Job Detail', data: data });
                        // dispatch(setOrigin(null))
                    }}
                    underlayColor={'#aaa'}>
                    <View>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={styles.title} numberOfLines={1}>
                                {data.item.createdAt.substring(0, 10)}
                            </Text>
                            <Text style={styles.title} numberOfLines={1}>
                                {data.item.title}
                            </Text>
                        </View>
                        <Text style={styles.details} numberOfLines={1}>
                            {data.item.details}
                        </Text>
                    </View>
                </TouchableHighlight>
            </Animated.View>
        );
    };

    const renderItem = (data, rowMap) => {
        const rowHeightAnimatedValue = new Animated.Value(60);

        return (
            <VisibleItem
                data={data}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                removeRow={() => deleteRow(rowMap, data.item.key)}
            />
        );
    };

    const HiddenItemWithActions = props => {
        const {
            swipeAnimatedValue,
            leftActionActivated,
            rightActionActivated,
            rowActionAnimatedValue,
            rowHeightAnimatedValue,
            onClose,
            onDelete,
        } = props;

        if (rightActionActivated) {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 75,
                useNativeDriver: false
            }).start();
        }

        return (
            <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
                <Text>Left</Text>
                {!leftActionActivated && (
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={onClose}>
                        <MaterialCommunityIcons
                            name="close-circle-outline"
                            size={25}
                            style={styles.trash}
                            color="#fff"
                        />
                    </TouchableOpacity>
                )}
                {!leftActionActivated && (
                    <Animated.View
                        style={[
                            styles.backRightBtn,
                            styles.backRightBtnRight,
                            {
                                flex: 1,
                                width: rowActionAnimatedValue,
                            },
                        ]}>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={onDelete}>
                            <Animated.View
                                style={[
                                    styles.trash,
                                    {
                                        transform: [
                                            {
                                                scale: swipeAnimatedValue.interpolate({
                                                    inputRange: [-90, -45],
                                                    outputRange: [1, 0],
                                                    extrapolate: 'clamp',
                                                }),
                                            },
                                        ],
                                    },
                                ]}>
                                <MaterialCommunityIcons
                                    name="trash-can-outline"
                                    size={25}
                                    color="#fff"
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </Animated.View>
        );
    };

    const renderHiddenItem = (data, rowMap) => {
        const rowActionAnimatedValue = new Animated.Value(75);
        const rowHeightAnimatedValue = new Animated.Value(60);

        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {/* <StatusBar backgroundColor="#FF6347" barStyle="light-content"/> */}
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                disableRightSwipe
                onRowDidOpen={onRowDidOpen}
                leftActivationValue={100}
                rightActivationValue={-200}
                leftActionValue={0}
                rightActionValue={-500}
                onLeftAction={onLeftAction}
                onRightAction={onRightAction}
                onLeftActionStatusChange={onLeftActionStatusChange}
                onRightActionStatusChange={onRightActionStatusChange}
            />
        </View>
    );
};

export default CompletedJobsScreen

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f4f4f4',
        flex: 1,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#05375a',
    },


    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisible: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    details: {
        fontSize: 12,
        color: '#999',
    },
});
