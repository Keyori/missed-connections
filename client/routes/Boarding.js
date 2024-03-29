import React, { useContext } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'

import Button from '../components/Button'
import DesignPatternSmall from '../assets/images/design_pattern_small'
import DesignPatternBig from '../assets/images/design_pattern_big'
import { ThemeContext } from '../styles/ThemeContext'


export default function Boarding({ navigation }) {
    const theme  = useContext(ThemeContext)
    const styles = createStyles(theme)
    

    

    return (
        <View style={styles.container}>

            <DesignPatternSmall style={styles.designPattern} />
            <DesignPatternBig style={styles.designPattern} />

            <View style={styles.headersContainer}>
                <View>
                    <Text style={styles.h1}>Missed Connections</Text>
                    <Text style={styles.h2}>Connect with those you've seen around  campus</Text>
                </View>

                <View style={styles.ctaContainer}>
                    <Button
                        text={"get started".toUpperCase()}
                        onPress={() => navigation.navigate('register')}
                        extraStyles={styles.button}
                    />

                    <Button
                        text={"log in".toUpperCase()}
                        priority={2}
                        onPress={() => navigation.navigate('map')}
                        extraStyles={styles.button}
                    />
                </View>

            </View>
        </View>
    )
}

 //vh stands for viewport height. it will allow for responsive styling based on the user screen size. 
const vh = Dimensions.get("window").height;
const createStyles = (theme) => ( 
    StyleSheet.create({
        container: {
            height: '100%',
            alignItems: 'center',
            backgroundColor: theme.colors.background,
            justifyContent: 'center',

        },
        headersContainer: {
            width: "85%",
            justifyContent: "center",
            height: '100%',
            justifyContent: 'space-between',
        },
        designPattern: {
            position: 'absolute',
            right: 0,
            top: 0
        },
        h1: {
            marginTop: 0.25 * vh, //take 30% of the viewport height 
            paddingTop: 20,
            fontSize: 48,
            lineHeight: 42,
            fontFamily: 'Poppins_800ExtraBold',
            color: theme.colors.primary
        },
        h2: {
            fontSize: 21,
            lineHeight: 22,
            fontFamily: 'ITC Giovanni',
            color: theme.colors.foreground
        },
        ctaContainer: {
            marginBottom: 0.125 * vh
        },
        button: {
            paddingVertical: 10
        }
    })
)


