import React, { useContext, useState, useRef } from 'react'
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

import Button from '../components/Button'
import RegisterInput from '../components/RegisterInput'
import { ThemeContext } from '../styles/ThemeContext'

import * as SecureStore from 'expo-secure-store';

export default function Login({ navigation }) {

    const theme = useContext(ThemeContext)
    const styles = createStyles(theme, Dimensions.get('window').height)
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        'ITC Giovanni': require('../assets/fonts/itc_giovanni_std_book.otf')
    })

    
    const [formData, setFormData] = useState({username: "", password: ""})
    const changeFormData = (targetInput, newInputValue) => {
        setFormData(oldFormData => ({...oldFormData, [targetInput]: newInputValue }))
    }
    const handleFormSubmission = async () => {
        try{
            const resLogin = await axios.post("/login", formData)
            const sessionId = resLogin.data

            SecureStore.setItemAsync("sessionId", sessionId);
            navigation.navigate('map')
        }catch(err){
            console.log(err)
        }
    }


    
    if (!fontsLoaded) return <AppLoading />
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.titleAndInputs}>
                <Text style={styles.h1}>Welcome Back</Text>
                {/* Message others, find that one special encounter. */}
                <RegisterInput
                    placeholderText="Username"
                    extraStyles={styles.registerInput}
                    text={formData.username}
                    onTextChange={(newVal)=> changeFormData('username', newVal)}
                />
                <RegisterInput
                    placeholderText="Password"
                    secureTextEntry={true}
                    extraStyles={styles.registerInput}
                    text={formData.password}
                    onTextChange={(newVal)=> changeFormData('password', newVal)}
                />
            </View>
            <View style={styles.submit}>
                <Button
                    text="NEXT ➔"
                    priority={1}
                    onPress={handleFormSubmission}
                    extraStyles={{ paddingVertical: 10 }}
                />
            </View>
        </SafeAreaView>
    )

}

const createStyles = (theme, vh) => (StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.colors.background,
    },
    titleAndInputs: {
        marginTop: 0.2 * vh,
        justifyContent: "flex-end",
        width: "90%"
    },
    registerInput: {
        marginBottom: 20,
    },
    submit: {
        justifyContent: "center",
        width: "90%",
        position: "absolute",
        bottom: 0.09 * vh,
    },
    h1: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Poppins_700Bold',
        color: theme.colors.primary,
        marginBottom: 30,
    },
    h2: {
        textAlign: 'center',
        fontFamily: 'ITC Giovanni',
        fontSize: 21,
        color: '#885A60',
        marginBottom: 30,
    }
}))
