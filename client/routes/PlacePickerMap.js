import React, {useContext} from 'react'
import {View, Pressable, Text, Dimensions, StyleSheet} from 'react-native'
import MapView from 'react-native-maps';
import mapStyle from "../mapStyle.json"


import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { SafeAreaView } from 'react-native-safe-area-context'

import Marker from '../assets/images/marker'
import Button from '../components/Button';
import { ThemeContext } from '../App'



export default function PlacePickerMap() {

    const theme = useContext(ThemeContext)
    const styles = createStyles(theme, Dimensions.get('window').width, Dimensions.get('window').height)

  return (
    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Pressable style={styles.markerContainer}> 
            <Marker />
        </Pressable>

        <View style={styles.dropMarkerButtonContainer}>
          <Button text = "drop marker" priority={1} />
        </View>
        <MapView
            style={styles.map}
            customMapStyle={mapStyle}
            showsCompass={false}
            initialRegion={{
            latitude: 40.504428,
            longitude: -74.453132,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
        >       
        </MapView> 

    </View>
  )
}


const createStyles = (theme, vw, vh,  ) => (StyleSheet.create({
    map: {
        width: 1 * vw,
        height: 1.1 * vh,
        zIndex: 0,
        position: 'absolute'
      },
      dropMarkerButtonContainer: {
        marginBottom: 0.08 * vh,
        zIndex: 20,
        width: 0.94 * vw
        
      },
      markerContainer: {
        position: 'absolute',
        height: 0.09 * vh,
        top: 0.4 * vh,
        left: 0.5 * vw - 0.035 * vh,
        aspectRatio: 1,
        zIndex:1,

      }
}));