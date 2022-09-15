import React, { useContext, useEffect, useRef } from 'react'
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '../components/Button'
import RegisterInput from '../components/RegisterInput'
import { ThemeContext } from '../styles/ThemeContext'
import { useState } from 'react/cjs/react.development'


export default function Register({ navigation }) {
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme)
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        'ITC Giovanni': require('../assets/fonts/itc_giovanni_std_book.otf')
    })


    const abstractFormInputs = {
        "fullName": "",
        "email": "",
        "username": "",
        "password":""
    }
    
    const [formData, setFormData]  = useState(abstractFormInputs)
    const changeFormData = (targetInput, newInputValue) => {
        setFormData(oldFormData => ({...oldFormData, [targetInput]: newInputValue }))
    }
    
    const [formError, setFormError] = useState(abstractFormInputs)


    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <SafeAreaView style={styles.screen}>
                <View style={styles.titleAndInputs}>
                    <Text style={styles.h1}>Join the Club</Text>
                    <Text style={styles.h2}>Message others, find that one special encounter.</Text>

                    <RegisterInput
                        placeholderText="Full Name"
                        extraStyles={styles.registerInput}
                        text={formData.fullName}
                        onTextChange={(newVal) => changeFormData('fullName', newVal)}
                    />
                    <RegisterInput
                        placeholderText="Email"
                        extraStyles={styles.registerInput}
                        text={formData.email}
                        onTextChange={(newVal) => changeFormData('email', newVal)}
                    />
                    <RegisterInput
                        placeholderText="Username"
                        extraStyles={styles.registerInput}
                        text={formData.username}
                        onTextChange={(newVal) => changeFormData('username', newVal)}
                    />
                    <RegisterInput
                        placeholderText="Password"
                        secureTextEntry={true}
                        extraStyles={styles.registerInput}
                        text={formData.password}
                        onTextChange={(newVal) => changeFormData('password', newVal)}
                    />
                    <Text>{formError.general}</Text>

                </View>
                <View style={styles.submit}>
                    <Button
                        text="NEXT ➔"
                        priority={1}
                        onPress={() => {
                            //check if any for input is empty 
                            if(! Object.values(formData).filter(input => !input.trim()).length > 0) {
                                navigation.navigate('registerFinal', {
                                    formData: formData
                                })
                            } else {
                                setFormError(oldFormError => ({...oldFormError, general: "please input all required data"}))
                            }
                        }}
                        extraStyles={{ paddingVertical: 10 }}
                    />
                </View>
            </SafeAreaView>
        )
    }

}

const createStyles = (theme) => (StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.colors.background,
    },
    titleAndInputs: {
        flex: 12,
        justifyContent: "flex-end",
        width: "90%"
    },
    registerInput: {
        marginBottom: 20,
    },
    submit: {
        flex: 7,
        justifyContent: "center",
        width: "90%",
    },
    h1: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Poppins_700Bold',
        color: theme.colors.primary,
    },
    h2: {
        textAlign: 'center',
        fontFamily: 'ITC Giovanni',
        fontSize: 21,
        color: '#885A60',
        bottom: 20,
        marginBottom: 30,
    },
    errorText: {
        color: theme.colors.primary,
        fontSize: 21,
    }
}))