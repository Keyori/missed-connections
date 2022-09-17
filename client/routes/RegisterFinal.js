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


    /**
     * route.params.formData: 
     *  "fullName": "",
        "email": "",
        "username": "",
        "password":""
     */
    const [formData, setFormData] = useState({...route.params.formData, graduationYear: undefined, gender:undefined })
    const changeFormData = (targetInput, newInputValue) => {
        setFormData(oldFormData => ({...oldFormData, [targetInput]: newInputValue }))
    }

    const [formError, setFormError] = useState({})
    
    const handleFormSubmission = async () => {    
        try{
            if(formData.gender === undefined || formData.graduationYear === undefined){
                setFormError(oldFormData => ({...oldFormData, generic: "please enter all info"}))
                console.log("error")
                return;
            }

            const resCreateAccount = await axios.post('/create-account', {
                ...formData,
                firstName: formData.fullName.split(" ")[0],
                lastName: "",
            })
            const resLogin = await axios.post("/login", {
                    username: formData.username,
                    password: formData.password,
            })
            
            const sessionId =  resLogin.data
            SecureStore.setItemAsync("sessionId", sessionId);
            navigation.navigate('map')
        
        }catch(err){
            console.log(err);
        }
    }
    
    const genderOptions = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }]
    const classLevelOptions = [{ label: '2022', value: 2022 }, { label: '2023', value: 2023 }, { label: '2024', value: 2024 }, { label: '2025', value: 2025 }]
    
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.questions}>
                <Text style={styles.h3}>How do you describe yourself?</Text>
                <RadioButtonGroup
                    options={genderOptions}
                    selectedOptionValue={formData.gender}
                    onPress={({ value: newVal }) => changeFormData("gender",newVal)}
                />

                <Text style={styles.h3}>When do you graduate?</Text>
                <RadioButtonGroup
                    options={classLevelOptions}
                    selectedOptionValue={formData.graduationYear}
                    onPress={({ value: newVal }) => changeFormData("graduationYear",newVal)}
                />
                {formError.generic && <Text style={styles.errorText}>please enter all the info</Text>}
            </View>


            <View style={styles.submit}>
                <Button
                    text="VERIFY YOUR ACCOUNT"
                    priority={1}
                    onPress={handleFormSubmission}
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
        fontSize: 14,
        position: 'absolute',
        bottom: -20,
        fontFamily: 'Poppins_400Regular',
    },
}))