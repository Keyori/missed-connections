import React, { useContext, useState, useRef } from 'react'
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { object, string, number, date, InferType } from 'yup';

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

    
    const formSchema = object().shape({
        "username": string().trim().required(),
        "password": string().trim().required()
    })
    const [formData, setFormData] = useState({})
    const [formError, setFormError] = useState({})
    const changeFormData = (targetInput, newInputValue) => {
        setFormData(oldFormData => ({...oldFormData, [targetInput]: newInputValue }))
    }

    const [isFormSubmissionLoading, setIsFormSubmissionLoading] = useState(false);
    const handleFormSubmission = async () => {
        try {
            const validFormData = await formSchema.validate(formData, {abortEarly: false})
        }
        catch(err){
            return setFormError(err.inner.reduce((a,validationError) => ({...a, [validationError.path] : validationError.message}), {}))       
        }
        try{
            setIsFormSubmissionLoading(true);
            const resLogin = await axios.post("/login", formData)
            const sessionId = resLogin.data
            SecureStore.setItemAsync("sessionId", sessionId);
            //TODO replace with actual header name
            axios.defaults.headers.common = {
                "AUTH TOKEN": sessionId,
            }
            navigation.navigate('map')
            
        }catch(err){
            setIsFormSubmissionLoading(false);
            return setFormError({generic: err.response.data.trim() ? err.response.data : 'an unexpected server error occured'})
        }


    }

    
    if (!fontsLoaded) return <AppLoading />
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.titleAndInputs}>
                <Text style={styles.h1}>Welcome Back</Text>
                {/* Message others, find that one special encounter. */}
                
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
                        extraStyles={[styles.registerInput, formError["password"] ? styles.registerInputError :{}]}
                        text={formData.password}
                        secureTextEntry
                        onTextChange={(newVal) => changeFormData('password', newVal)}
                    />
                    {formError["password"] && <Text style={styles.errorText}>{formError["password"]}</Text>}
                </View>
                
                {formError.generic && <Text style={styles.errorTextGeneric}>{formError.generic}</Text>}

            </View>
            <View style={styles.submit}>
                <Button
                    text={isFormSubmissionLoading ? 'loading...': 'NEXT ➔'}
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
        registerInputError: {
        borderColor:  theme.colors.primaryExtraLight, 
    },
    errorText: {
        color: theme.colors.primary,
        fontSize: 14,
        position: 'absolute',
        bottom: -3,
        right:0,
        fontFamily: 'Poppins_400Regular',
    },
    errorTextGeneric:{
        fontFamily: 'Poppins_400Regular',
        color: theme.colors.primary,
        fontSize: 14,
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
