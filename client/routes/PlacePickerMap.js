import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Animated, Text, Dimensions, StyleSheet, Pressable } from 'react-native'

import MapView from 'react-native-maps';
import mapStyle from "../styles/mapStyle.json"
import { debounce } from 'throttle-debounce';


import { SafeAreaView } from 'react-native-safe-area-context'

import MarkerSVG from '../assets/images/marker'
import Button from '../components/Button';
import { ThemeContext } from '../styles/ThemeContext'
import RegisterInput from '../components/RegisterInput'



export default function PlacePickerMap({route, navigation}) {

  const theme = useContext(ThemeContext)
  const styles = createStyles(theme, Dimensions.get('screen').width, Dimensions.get('screen').height)


  const mapRef = useRef();
  
  
  const zoomAnim = new Animated.Value(13.4)
  const interpolatedZoomAnim = zoomAnim.interpolate({
    inputRange: [10, 15],
    outputRange: [1.5, 0.5],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const handleZoomChange = async () => zoomAnim.setValue((await mapRef.current.getCamera()).zoom)

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = ()=>{
    setIsModalVisible(old => !old)
    setLocationName('')
  }
  
  const [locationName, setLocationName] = useState("");
  const handleLocationName = newLocationName => setLocationName(newLocationName)
  
  const submitData = async () => {
    const data = {
      mainText: locationName,
      geomtry: (await mapRef.current.getCamera()).center
    }
    navigation.goBack()
    route.params.callback(data)
  }



  return (
    <View style={styles.mainContainer}>
      <View pointerEvents="none" style={styles.markerContainer}>
        <Animated.View style={[styles.marker,{transform: [{ scale:   interpolatedZoomAnim }]}]}>
          <MarkerSVG />
        </Animated.View>
      </View>

      <View style={styles.dropMarkerButtonContainer}>
        {!isModalVisible && <Button text="drop marker" priority={1}  onPress={toggleModal}/>}
      </View>

      {isModalVisible &&
        <Pressable onPress={toggleModal} style={styles.modalBackground}>
          <Pressable  style ={styles.modalContainer}>
            <RegisterInput 
              placeholderText="Enter your location's name"
              keyboardType="default"
              text={locationName}
              extraStyles={styles.inputContainer}
              autoFocus
              onTextChange={handleLocationName}
            />
            <View  pointerEvents={''+locationName.length>1 ? 'auto' : 'none'} style={{opacity: locationName.length>1 ? 1 : 0 }}>
              <Button text="confirm location"  onPress={submitData}/>
            </View>
          </Pressable>
        </Pressable>
      }

      <MapView
        ref={mapRef}
        style={styles.map}
        customMapStyle={mapStyle}
        onRegionChange={handleZoomChange}
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


const createStyles = (theme, vw, vh,) => (StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    width: 1 * vw,
    height: 1 * vh,
    zIndex: 0,
    position: 'absolute'
  },
  dropMarkerButtonContainer: {
    marginBottom: 0.08 * vh,
    zIndex: 20,
    width: 0.94 * vw
  },
  markerContainer: {
    width: 1 * vw,
    height: 1 * vh,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  marker: {
    width: 75,
    height: '100%',
    top: -20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  modalBackground: {
    zIndex: 100,
    backgroundColor: '#00000080',
    height: 1.1 * vh,
    width: 1 * vw,
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    zIndex: 101,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    marginHorizontal: 0.04 * vw,
    borderRadius: 10
  },

  inputContainer:{
    marginBottom: 70
  }
}));