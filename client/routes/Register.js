import React, { useContext, useEffect, useRef } from 'react'
import { useFonts, Poppins_700Bold,Poppins_400Regular } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { object, string, number, date, InferType } from 'yup';

import Button from '../components/Button'
import RegisterInput from '../components/RegisterInput'
import { ThemeContext } from '../styles/ThemeContext'
import { useState } from 'react/cjs/react.development'


export default function Register({ navigation }) {
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme)
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular,
        'ITC Giovanni': require('../assets/fonts/itc_giovanni_std_book.otf')
    })


    const formSchema = object().shape({
        "fullName": string().trim().required(),
        "email": string().trim().required().email(),
        "username": string().trim().required(),
        "password": string().trim().required()
            .matches(/.{7}/, 'your password must have at least 8 characters ')
            .matches(/[&!$@*]/, 'your password must contain special characters &!$@*')
            .matches(/[1-9]/, 'your password must contain numbers')
            .matches(/[A-Z]/, 'your password must contain capital letters')
    })

    const [formData, setFormData] = useState({})
    const [formError, setFormError] = useState({})
    const changeFormData = async (targetInput, newInputValue) => {
        setFormData(oldFormData => ({ ...oldFormData, [targetInput]: newInputValue }))

    }

    const handleFormSubmission = async () => {

        try{
            
            const validFormData = await formSchema.validate(formData, {abortEarly: false})
            navigation.navigate('registerFinal', {
                formData: validFormData
            })

        }catch(err){
            //convert an array of validation error into an obj with [key=path of the error] : message]
            setFormError(err.inner.reduce((a,validationError) => ({...a, [validationError.path] : validationError.message}), {}))
        }
    }


    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <SafeAreaView style={styles.screen}>
                <View style={styles.titleAndInputs}>
                    <Text style={styles.h1}>Join the Club</Text>
                    <Text style={styles.h2}>Message others, find that one special encounter.</Text>

                    <View style={styles.inputContainer}>
                        <RegisterInput
                            placeholderText="Full Name"
                            extraStyles={[styles.registerInput, formError["fullName"] ? styles.registerInputError :{}]}
                            text={formData.fullName}
                            onTextChange={(newVal) => changeFormData('fullName', newVal)}
                        />
                        {formError["fullName"] && <Text style={styles.errorText}>{formError["fullName"]}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <RegisterInput
                            placeholderText="Email"
                            extraStyles={[styles.registerInput, formError["email"] ? styles.registerInputError :{}]}
                            text={formData.email}
                            onTextChange={(newVal) => changeFormData('email', newVal)}
                        />
                        {formError["email"] && <Text style={styles.errorText}>{formError["email"]}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <RegisterInput
                            placeholderText="Username"
                            extraStyles={[styles.registerInput, formError["username"] ? styles.registerInputError :{}]}
                            text={formData.username}
                            onTextChange={(newVal) => changeFormData('username', newVal)}
                        />
                        {formError["username"] && <Text style={styles.errorText}>{formError["username"]}</Text>}
                    </View>
                    
                    
                    <View style={styles.inputContainer}>
                        <RegisterInput
                            placeholderText="Password"
                            secureTextEntry={true}
                            extraStyles={[styles.registerInput, formError["password"] ? styles.registerInputError :{}]}
                            text={formData.password}
                            onTextChange={(newVal) => changeFormData('password', newVal)}
                        />
                        {formError["password"] && <Text style={styles.errorText}>{formError["password"]}</Text>}
                    </View>
                    
                    <Text>{formError.general}</Text>

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
    registerInputError: {
        borderColor:  theme.colors.primaryExtraLight, 
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
        fontSize: 14,
        position: 'absolute',
        bottom: 0,
        right:0,
        fontFamily: 'Poppins_400Regular',
    }
}))