import React, { useContext, useState, useEffect } from 'react'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import { View, Text, StyleSheet, Dimensions, TextInput, Pressable, Keyboard, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

import Button from '../components/Button'
import RegisterInput from '../components/RegisterInput'
import { ThemeContext } from '../App'
import XSign from '../assets/images/x';
import PlacesAutocomplete from '../components/PlacesAutocomplete'
import SearchSvg from '../assets/images/search_icon'
import Clock from '../assets/images/clock'

import * as SecureStore from 'expo-secure-store';

export default function CreatePost({ navigation }) {
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme, Dimensions.get('window').width)

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        'ITC Giovanni': require('../assets/fonts/itc_giovanni_std_book.otf')
    })

    const [postText, setPostText] = useState("");
    const handlePostText = text => { setPostText(text) };

    const [location, setLocation] = useState({ mainText: '', geometry: { location: { lng: 0, lat: 0 } } });


    const isValidPost = postText => postText.length > 5

    async function handlePublish() {
        console.log(postText)
        try {
            const sessionId = await SecureStore.getItemAsync("sessionId");
            console.log(sessionId)
            const responseData = await axios.post("http://localhost:3000/api/posts", {
                sessionId: sessionId,
                content: postText,
                longitude: location.geometry.location.lng,
                latitude: location.geometry.location.lat,
                location: location.mainText,
                campus: -1,
            })
            console.log(responseData)
            navigation.pop();
        }
        catch (err) {
            console.log(err)
        }
    }



    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',() => {
                setKeyboardVisible(true); 
            }
        );
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',() => {
                setKeyboardVisible(false); 
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    const [isPlacesAutocompleteVisible, setIsPlacesAutocompleteVisible] = useState(false)
    const showPlacesAutocomplete = () => setIsPlacesAutocompleteVisible(true)


    if (!fontsLoaded) return <AppLoading />
    return (
        <KeyboardAvoidingView behavior='padding'> 
            <SafeAreaView style={styles.screen}>{
                !isPlacesAutocompleteVisible ?
                <> 
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
                    autoFocus
                />


                <View style={styles.metaDataContainer(isKeyboardVisible)}>

                    <View style={styles.metaDataItem}>
                        <SearchSvg fill={theme.colors.primaryExtraLight} style={styles.icon} />
                        <Pressable style={styles.inputButton(isKeyboardVisible)} onPressIn= {showPlacesAutocomplete}>
                            <Text numberOfLines = {1} style={styles.inputText}>{!location.mainText.trim() ? "where did it happen?" : location.mainText}</Text>
                        </Pressable>
                    </View>

                    <View style={styles.metaDataItem}>
                        <Clock fill={theme.colors.primaryExtraLight} style={styles.icon} />
                        <Pressable style={styles.inputButton(isKeyboardVisible)}>
                            <Text numberOfLines={1} style={styles.inputText}>when?</Text>
                        </Pressable>
                    </View>
                </View>
                </>
                :
                <PlacesAutocomplete 
                    placeholderText = "where did it happen"
                    autoFocus
                    onKeyboardDidHide = {()=> setIsPlacesAutocompleteVisible(false)}
                    onSelectPrediction = {(data)=> {
                        setIsPlacesAutocompleteVisible(false); 
                        setLocation(data);
                    }}
                    />
            }
            </SafeAreaView>
            </KeyboardAvoidingView>
    )
}

const createStyles = (theme, vw) => (StyleSheet.create({
    screen: {
        height: "100%",
        paddingHorizontal: 30,
        backgroundColor: "white"
    },
    connectButton: {
        alignSelf: 'center',
        top: -3
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        height: 70,
        borderBottomColor: "#e6e6e6",
        borderBottomWidth: 2,
    },
    postText: {
        flex: 8,
        marginTop: 100,
        fontFamily: 'Poppins_500Medium',
        lineHeight: 30,
        fontSize: 20,
    },
    metaDataContainer: (isKeyboardVisible) => ({
        paddingBottom: 15,
        width: 0.92 * vw,
        paddingHorizontal: "8%",
        alignSelf: 'center',
        justifyContent: 'flex-end',
        flexDirection: isKeyboardVisible ? 'row' : 'column',
    }),
    metaDataItem: {
        paddingTop: 8,
        alignItems: 'center',
        justifyContent: "flex-start",
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 5
    },
    icon: {

    },
    inputButton: (isKeyboardVisible)=> ({
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#C4C4C4",
        paddingTop: 10,
        paddingBottom: 7,
        paddingHorizontal: 10,
        marginLeft: 0.05 * vw,
        width: isKeyboardVisible ? "60%" : "100%"
    }),
    inputText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 17,
        color: "#AFAFAF",
    },

}))