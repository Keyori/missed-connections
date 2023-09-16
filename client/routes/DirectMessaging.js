import React, {useContext} from 'react'
import { View, Text, Dimensions, TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


import { ThemeContext } from '../styles/ThemeContext'


export default function DirectMessaging() {
  
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme,Dimensions.get('window').width)


    

    return (
        <SafeAreaView style = {{flex:1,backgroundColor: 'white'}}>
            <View style={styles.opIdentificationContainer}>
                <View style = {styles.opIcon} />
                <View style = {styles.opNameContainer}>
                    <Text numberOfLines = {1} style= {styles.opName}>livingston dinning hall</Text>
                    <Text style = {styles.opNameContextClue}>missed connection at</Text>
                </View>
            </View>


            <View style={styles.messageBlobsContainer}>

                <View style={styles.opMessageBlob}>
                    <Text style={styles.opMessageBlobText}>why  monday before tuesday </Text>
                </View>

                <View style={styles.messageBlob}>
                    <Text style={styles.messageBlobText}>why fish live in water </Text>
                </View>
                
                <View style={styles.messageBlob}>
                    <Text style={styles.messageBlobText}>why we are here </Text>
                </View>

                <View style={styles.opMessageBlob}>
                    <Text style={styles.opMessageBlobText}>hmm </Text>
                </View>

                <View style={styles.opMessageBlob}>
                    <Text style={styles.opMessageBlobText}>difficult question, difficult question, very difficult question   </Text>
                </View>

            </View>
            <View style={styles.response}>
                <TextInput
                    placeholder="send a chat"
                    textAlign="left"
                    style={styles.responseBox}
                    selectionColor="#5F747D"
                    placeholderTextColor = "#5F747D"
                />
                <Text style={styles.shadowBox}>Send a chat</Text>
            </View>
        </SafeAreaView>
  )
}

const createStyles = (theme, vw, circleWidth=60) =>({
    opIdentificationContainer: {
        height: 100,
        borderBottomWidth:2,
        borderColor: '#E8E8E8',
        alignItems: 'center',
        paddingLeft: 0.06*vw,
        flexDirection: 'row',
        backgroundColor: 'white',
        width: 0.96 * vw,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    opIcon: {
        width: circleWidth,
        height: circleWidth,
        borderRadius: circleWidth/2,
        backgroundColor: '#9DC2D1'
    },
    opNameContainer: {
        marginLeft: 20,
        marginTop: 5,        
        width: 0.7 * vw
    },
    opName: {
        fontFamily:"Poppins_600SemiBold",
        fontSize: 17,
        lineHeight: 20,
        color: '#45545A'
    },
    opNameContextClue: {
        fontSize: 10.5,
        fontFamily: 'Poppins_400Regular',
        textTransform: 'uppercase',
        top:-3,
        color: '#B6C7CE'

    },
    messageBlobsContainer: {
        width: 0.96 * vw,
        marginRight: 'auto',
        marginLeft: 'auto',
        justifyContent: 'flex-start',
        flex: 1,
    },
    messageBlob: {
        alignSelf: 'flex-end',
        marginTop: 10 
    },
    opMessageBlob: {
        alignSelf: 'flex-start',
        marginTop: 10, 
        maxWidth: 0.8 * vw
    },
    messageBlobText: {
        color: '#FCFEFF',
        backgroundColor: '#9DC2D1',
        fontFamily: 'Poppins_400Regular',
        borderRadius: 10,
        borderBottomRightRadius: 0,
        padding: 7
    },
    opMessageBlobText: {
        color: '#405259',
        backgroundColor: '#DAE4E9',
        fontFamily:'Poppins_400Regular',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        padding: 7,

    },
    response: {
        width: 0.94 * vw,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
        marginTop: 40
    },
    shadowBox: {
        backgroundColor: '#BDBDBD',
        width: '100%',
        fontSize: 18,
        borderRadius: 8,
        padding: 9,
        paddingLeft: 20,
    },
    responseBox: {
        borderColor: '#BDBDBD',
        borderWidth: 2,
        padding: 9,
        paddingLeft: 20,
        fontSize: 17,
        borderRadius: 10,
        width: '100%',
        color: '#45545A',
        backgroundColor: 'white',
        zIndex: 10,
        position: 'absolute',
        bottom: 3,
        fontFamily: 'Poppins_400Regular'
    },
})