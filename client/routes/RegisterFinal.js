import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ThemeContext } from '../styles/ThemeContext'
import axios from 'axios'
import { object, string, number, date, InferType } from 'yup';


import Button from '../components/Button'
import RadioButtonGroup from '../components/RadioButtonGroup'

import * as SecureStore from 'expo-secure-store';

export default function RegisterFinal({ route, navigation }) {
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme)



    const formSchema = object().shape({
        "gender": string().trim().required(),
        "graduationYear": number().required()
    })
    const [formData, setFormData] = useState({...route.params.formData, graduationYear: undefined, gender:undefined })
    const [formError, setFormError] = useState({})
    const changeFormData = (targetInput, newInputValue) => {
        setFormData(oldFormData => ({...oldFormData, [targetInput]: newInputValue }))
    }

    
    const [isFormSubmissionLoading, setIsFormSubmissionLoading] = useState(false);
    const handleFormSubmission = async () => {    
        try{
            const validFormData = await formSchema.validate(formData, {abortEarly: false})
        }
        catch(err){
            return setFormError(err.inner.reduce((a,validationError) => ({...a, [validationError.path] : validationError.message}), {}))       
        }
        try{
            setIsFormSubmissionLoading(true)
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
            return setFormError({generic: err.response.data.trim() ? err.response.data : 'an unexpected server error occured'})
        }
    }
    
    const genderOptions = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }]
    const classLevelOptions = [{ label: '2022', value: 2022 }, { label: '2023', value: 2023 }, { label: '2024', value: 2024 }, { label: '2025', value: 2025 }]
    
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.questions}>
                <Text style={styles.h3}>How do you describe yourself?</Text>
                
                <View style={styles.inputContainer}>
                    <RadioButtonGroup
                        options={genderOptions}
                        selectedOptionValue={formData.gender}
                        onPress={({ value: newVal }) => changeFormData("gender",newVal)}
                    />
                    {formError["gender"] && <Text style={styles.errorText}>{formError["gender"]}</Text>}

                </View>

                <Text style={styles.h3}>When do you graduate?</Text>
                <RadioButtonGroup
                    options={classLevelOptions}
                    selectedOptionValue={formData.graduationYear}
                    onPress={({ value: newVal }) => changeFormData("graduationYear",newVal)}
                />
                {formError["graduationYear"] && <Text style={styles.errorText}>{formError["graduationYear"]}</Text>}

        
            
            </View>


            <View style={styles.submit}>
                {formError.generic && <Text style={styles.errorTextGeneric}>{formError.generic}</Text>}
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
    errorTextGeneric:{
        fontFamily: 'Poppins_400Regular',
        color: theme.colors.primary,
        fontSize: 14,
    },
}))