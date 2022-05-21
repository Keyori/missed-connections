import React, { useContext, useState } from 'react'
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import { View, Text, StyleSheet, Dimensions, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

import Button from '../components/Button'
import RegisterInput from '../components/RegisterInput'
import { ThemeContext } from '../App'
import XSign from '../assets/images/x';
import LocationTextInput from '../components/LocationTextInput'
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

    const [location, setLocation] = useState({description: '',geometry:{location:{lng:0,lat:0}}});

    const handleLocationCallBack = locationObj => {
        setLocation(locationObj)
    }
    const isValidPost = postText => postText.length > 5

    async function handlePublish() {
        console.log(postText)
        try{
            const sessionId = await SecureStore.getItemAsync("sessionId");
            console.log(sessionId)
            const responseData = await axios.post("http://localhost:3000/api/posts", {
                sessionId: sessionId,
                content: postText,
                longitude: location.geometry.location.lng,
                latitude:location.geometry.location.lat,
                location: location.description,
                campus: -1,
            })
            console.log(responseData)
            navigation.pop();
        }
        catch(err){
            console.log(err)
        }
    }
    if (!fontsLoaded) return <AppLoading />
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.tabContainer}>
                <Pressable onPress = {()=>navigation.pop()}style={{ alignSelf: 'center', padding: 5 }}>
                    <XSign  />
                </Pressable>
                <Button
                    text="connect"
                    priority={isValidPost(postText) ? 1 : 2}
                    onPress={handlePublish}
                    extraStyles={isValidPost(postText)  ? styles.connectButton : {...styles.connectButton, opacity: 0.4} }
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
            />

            <View style={styles.metaDataContainer}>

                <View style={styles.metaDataItem}>
                    <SearchSvg fill ={theme.colors.primary} style = {styles.icon}/>
                    <View style={styles.input}>
                        <LocationTextInput callback = {handleLocationCallBack} style = {LocationTextInputStyles(theme, Dimensions.get('window').width)}/>
                    </View>
                </View>

                {/* <View style={{...styles.metaDataItem, borderBottomWidth: 0}}>
                    <Clock fill ={theme.colors.primary} style = {styles.icon}/>
                    <View style={styles.input}>
                        Text
                    </View>
                </View> */}
            </View>
        </SafeAreaView>

    )
}


const LocationTextInputStyles = (theme, vw)=>({
    container: {
        position: 'relative',
        flexDirection: 'column-reverse',
    },
    textInput:{
        fontSize: 18,
        color: theme.colors.faint,
        paddingVertical: 0,
        fontFamily: 'Poppins_400Regular',
        borderRadius: 10,
        borderWidth: 2,
        borderColor:'#E1E1E1'
    },
    listView: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: theme.colors.faint,
        backgroundColor: 'white',
        width: 0.92 * vw,
        right: 0.27 * vw
    },
    row: {
        borderRadius: 10,
        zIndex: 100
    },
    description: {
        fontFamily: 'Poppins_400Regular'
    }
})

const createStyles = (theme, vw) => (StyleSheet.create({
    screen: {
        height: "100%",
        paddingHorizontal: 30,
        justifyContent: "flex-end",
        backgroundColor:"white"
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
    metaDataContainer: {
        paddingBottom: 15,
        width: 1 * vw,
        paddingHorizontal: "8%",
        alignSelf: 'center'
    },
    metaDataItem: {
        paddingTop: 8,
        alignContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: 0.92 * vw, 
        alignSelf: 'center',
        paddingHorizontal: 0.08 * vw,
    },
    icon: {
        paddingLeft: 60,

    },
    input: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    metadataTextTitle: {
        fontFamily: 'Poppins_400Regular',
        color: theme.colors.primary,
        fontSize: 18,
        paddingRight: 10
    },
    dataPickerCta:{
        fontFamily: 'Poppins_400Regular',
        color: theme.colors.faint,
        fontSize:18,
        lineHeight:30,

    },


}))