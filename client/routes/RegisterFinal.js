import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ThemeContext } from '../styles/ThemeContext'
import axios from 'axios'


import Button from '../components/Button'
import RadioButtonGroup from '../components/RadioButtonGroup'

import * as SecureStore from 'expo-secure-store';

export default function RegisterFinal({ route, navigation }) {
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme)


    const [formData, setFormData] = useState({...route.params.formData, })
    const [gender, setGender] = useState("unknown");
    const [graduationYear, setGraduationYear] = useState("unknown");
    let [error, setError] = useState("")
    
    
    const generateValueFromLabel = option => ({ ...option, value: option.value === undefined ? option.label.toLowerCase() : option.value })
    const genderOptions = [{ label: 'Male' }, { label: 'Female' }, { label: 'Other' }].map(generateValueFromLabel)
    const classLevelOptions = [{ label: '2022' }, { label: '2023' }, { label: '2024' }, { label: '2025' }].map(generateValueFromLabel)

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.questions}>
                <Text style={styles.h3}>How do you describe yourself?</Text>
                <RadioButtonGroup
                    options={genderOptions}
                    selectedOptionValue={gender}
                    onPress={({ value }) => setGender(value)}
                />

                <Text style={styles.h3}>When do you graduate?</Text>
                <RadioButtonGroup
                    options={classLevelOptions}
                    selectedOptionValue={graduationYear}
                    onPress={({ value }) => setGraduationYear(value)}
                />
                {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>


            <View style={styles.submit}>
                <Button
                    text="VERIFY YOUR ACCOUNT"
                    priority={1}
                    onPress={async () => {
                        if (gender != "unknown" && graduationYear != "unknown") {
                            try {
                                const registerData = await axios.post('http://localhost:3000/api/register', {
                                    username: username,
                                    password: password,
                                    fullName: fullName,
                                    gradYear: graduationYear,
                                    gender: gender
                                })
                                console.log(JSON.stringify(registerData))
                                const {data: {sessionId: sessionId}} =await axios.post("http://localhost:3000/api/login", {
                                    username: username,
                                    password: password,
                                })

                                console.log(sessionId)
                                SecureStore.setItemAsync("sessionId", sessionId);
                                navigation.navigate('map')

                                }catch (err) { console.trace(err); setError("An error has occurred.") }
                            } else {
                            setError("Please enter fill in all your information.")
                        }
                    }}
                    extraStyles={{ paddingVertical: 10 }}
                />
            </View>
        </SafeAreaView>
    )
}

const createStyles = theme => (StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.colors.background
    },
    questions: {
        flex: 7,
        justifyContent: "flex-end",
        marginHorizontal: 30,
        alignItems: "flex-start"
    },
    submit: {
        flex: 4,
        justifyContent: "center",
        width: "90%",
        alignSelf: "center"
    },
    h3: {
        fontFamily: 'Poppins_400Regular',
        color: theme.colors.primary,
        fontSize: 21,
        marginTop: 30,
    },
    errorText: {
        color: theme.colors.primary,
        fontSize: 21,
    }
}))