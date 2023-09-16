import React, { useContext, useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, TextInput, Pressable, Keyboard, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

import DateTimePicker from '../components/DateTimePicker'
import Button from '../components/Button'
import RegisterInput from '../components/RegisterInput'
import { ThemeContext } from '../styles/ThemeContext'
import XSign from '../assets/images/x';
import PlacesAutocomplete from '../components/PlacesAutocomplete'
import SearchSvg from '../assets/images/search_icon'
import Clock from '../assets/images/clock'


import * as SecureStore from 'expo-secure-store';

export default function CreatePost({ navigation }) {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        }
        );
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const theme = useContext(ThemeContext)
    const { width: vw, height: vh } = Dimensions.get('window')
    const styles = createStyles(theme, vw, vh, isKeyboardVisible)


    const [postText, setPostText] = useState("");
    const handlePostText = text => { setPostText(text) };

    const [location, setLocation] = useState({ mainText: '', geometry: { location: { lng: 0, lat: 0 } } });
    const [dateTime, setDateTime] = useState(undefined);

    const isValidPost = postText => postText.length > 5

    async function handlePublish() {
        try {
            const sessionId = await SecureStore.getItemAsync("sessionId");
            const responseData = await axios.post("http://localhost:3000/api/posts", {
                sessionId: sessionId,
                content: postText,
                longitude: location.geometry.location.lng,
                latitude: location.geometry.location.lat,
                location: location.mainText,
                campus: -1,
            })
            navigation.pop();
        }
        catch (err) {
            console.log(err)
        }
    }


    



    const [isPlacesAutocompleteVisible, setIsPlacesAutocompleteVisible] = useState(false)
    const showPlacesAutocomplete = () => setIsPlacesAutocompleteVisible(true)
    
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false)
    const showDateTimePicker =() => setIsDateTimePickerVisible(true);


    //autoFocus textInput on first render. 
    const textInputRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            if (textInputRef.current !== undefined) {
                textInputRef.current.focus()
            }
        }, 100)

    }, [])



    return (
        <KeyboardAvoidingView behavior='padding'>
            <SafeAreaView style={styles.screen}>
                <View style={styles.tabContainer}>
                    <Pressable onPress={() => navigation.pop()} style={{ alignSelf: 'center', padding: 5 }}>
                        <XSign />
                    </Pressable>
                    <Button
                        text="connect"
                        priority={isValidPost(postText) ? 1 : 2}
                        onPress={handlePublish}
                        extraStyles={isValidPost(postText) ? styles.connectButton : { ...styles.connectButton, opacity: 0.4 }}
                        width={100}
                        paddingHorizontal={0}
                        height={32}
                    />
                </View>

                <TextInput
                    style={styles.postText}
                    value={postText}
                    placeholder="Type your missed connection!"
                    placeholderTextColor="#9c9c9c"
                    onChangeText={handlePostText}
                    selectionColor="#F17F8C"
                    multiline
                    textAlignVertical='top'
                    ref={textInputRef}
                />


                <ScrollView 
                    style={styles.metaDataScrollView} 
                    contentContainerStyle={styles.metaDataContainer}
                    horizontal 
                    keyboardShouldPersistTaps= "always"
                    showsHorizontalScrollIndicator = {false}
                    >

                    <View style={styles.metaDataItem("location")}>
                        <SearchSvg fill={theme.colors.primaryExtraLight} style={styles.icon} />
                        <Pressable style={[styles.inputButton, {/*width: 1 * vw*/ }]} onPressIn={showPlacesAutocomplete}>
                            <Text numberOfLines={1} style={styles.inputText}>{!location.mainText.trim() ? "where did it happen?" : location.mainText}</Text>
                        </Pressable>
                    </View>

                    <View style={styles.metaDataItem("date")}>
                        <Clock fill={theme.colors.primaryExtraLight} style={styles.icon} />
                        <Pressable style={styles.inputButton} onPressIn={showDateTimePicker}>
                            <Text style={styles.inputText}>{dateTime === undefined ? 'when?' : dateTime.format('h:mm A - D MMMM ')}</Text>
                        </Pressable>
                    </View>
                </ScrollView>
                
                {isPlacesAutocompleteVisible &&
                    <SafeAreaView style={styles.placesAutocompleteContainer}>
                        <PlacesAutocomplete
                            placeholderText="where did it happen"
                            autoFocus
                            width={0.9}
                            includesPlacePicker
                            onKeyboardDidHide={() => setIsPlacesAutocompleteVisible(false)}
                            onSelectPrediction={(data) => {
                                setLocation(data);
                                setIsPlacesAutocompleteVisible(false);
                            }}
                        />
                    </SafeAreaView>
                }

                {isDateTimePickerVisible &&
                    <DateTimePicker onSelectDateTime={dateTime =>{
                        setDateTime(dateTime)
                        setIsDateTimePickerVisible(false)
                    }}/>
                }
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const createStyles = (theme, vw, vh, isKeyboardVisible) => (StyleSheet.create({
    screen: {
        height: "100%",
        paddingHorizontal: 0.06 * vw,
        backgroundColor: "white"
    },
    connectButton: {
        alignSelf: 'center',
        top: -3
    },
    tabContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        height: 70,
        borderBottomColor: "#c4c4c471",
        borderBottomWidth: 1,
    },
    postText: {
        marginTop: 100,
        fontFamily: 'Poppins_500Medium',
        lineHeight: 30,
        fontSize: 20,
        flex: isKeyboardVisible? 20 : 5
    },
    metaDataScrollView: { 
        alignSelf: 'center',
        width: 1 * vw,
        paddingHorizontal: 0.04 * vw,
    },
    metaDataContainer: {
        paddingBottom: isKeyboardVisible ? 0 : 15,
        flexDirection: isKeyboardVisible ? 'row' : 'column',
    },
    metaDataItem:(metaDataName) =>( {
        paddingTop: 8,
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginTop: 5,
        flex: 1,
        width: isKeyboardVisible? "auto" : 0.9 * vw,
    }),
    icon: {
        alignSelf: 'center'
    },
    inputButton: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: isKeyboardVisible ? "transparent" : "#c4c4c471",  
        paddingTop: isKeyboardVisible ? 0 :  10,
        paddingBottom: isKeyboardVisible ? 0 : 7,
        paddingHorizontal: 10,
        marginLeft: isKeyboardVisible ? 0.01 * vw : 0.05 * vw,
        marginRight: isKeyboardVisible ? 0.1 * vw : 0 ,
        flex: 1,
        height: isKeyboardVisible ? 35 : 52,
        alignSelf: 'center',
    },
    inputText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 17,
        color: "#AFAFAF",
    },
    placesAutocompleteContainer: {
        backgroundColor: 'white',
        height: 1 * vh,
        width: 1 * vw,
        position: 'absolute'
    }

}))