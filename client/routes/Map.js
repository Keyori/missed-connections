import React, { useContext, useRef , useEffect} from 'react';
import MapView, { Heatmap, Marker } from 'react-native-maps';
import { StyleSheet, TextInput, View, FlatList, Image, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Color from 'color';
import axios from 'axios';

import NavBar from '../components/NavBar';
import MapControls from '../components/MapControls';
import IconButton from '../components/IconButton'
import MakePostSvg from '../assets/images/make_post_icon';
import ExploreSvg from '../assets/images/explore_icon'
import mapStyle from "../mapStyle.json"

import { ThemeContext } from '../App';
import { useState } from 'react/cjs/react.development';


export default function Map({ navigation }) {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme, Dimensions.get('window').width, Dimensions.get('window').height)
  const [posts, setPosts] = useState([]) 
  
  useEffect(async ()=>{
    try{
      const {data} = await axios.get("http://192.168.100.195:3000/api/1.0/posts/map") ;
     setPosts(Object.entries(data) );
    }catch(err){
        console.log(err)
    }
  },[])



  /**
   * Map business logic. 
  */
  const mapRef = useRef();
  const handleAnimateToRegion = region => { mapRef.current.animateToRegion(region) }
  const handleMarkerPress = (e, post, campus) => {
    console
    navigation.navigate("feed", { pid: post.pid, campus: campus, postCoordinate: e.nativeEvent.coordinate })
  }


  /**
   * color each campus with its gradient  
  */
  const generateGradient = baseColor => {
    const color = Color(baseColor)
    const colorArr = [color.fade(0.8), color.fade(0.5), color.fade(0.2), color, color.lighten(0.2)]
    return colorArr.map(color => color.hsl().string())
  }


  return (
    <View style={styles.container}>
      <MapControls animateToRegion={handleAnimateToRegion} />

      <View style={styles.ctaContainer}>
        <IconButton
          icon={<ExploreSvg height={25} width={25} />}
          buttonDimensions={[44, 38]}
          priority={2}
          extraStyles={{ marginBottom: 13 }}
        />

        <IconButton
          icon={<MakePostSvg height={20} width={20} />}
          buttonDimensions={[44, 38]}
          onPress = {()=>navigation.navigate("createPost")}
        />

      </View>
      <NavBar navigation={navigation} />

      <MapView
        ref={mapRef}
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
        {posts.map((campusPosts, i) => campusPosts[1].map((point, j) =>
          <Marker
            key={"" + i + j}
            icon={require('../assets/images/icon.png')}
            onPress={(e)=>handleMarkerPress(e, point, campusPosts[0])}
            coordinate={{ latitude: point.latitude, longitude: point.longitude}}
          />
        ))}

        {posts.map((campusPosts, i) => (
          <Heatmap
            points={campusPosts[1]}
            key={i}
            radius={50}
            gradientSmoothing={100}
            heatmapMode="POINTS_DENSITY"
            opacity={1}
            gradient={{ colors: generateGradient(theme.colors[campusPosts[0]]), startPoints: [0.1, 0.25, 0.5, 0.75, 1], colorMapSize: 200 }}
          />
        ))}
      </MapView>

    </View>

  );
}

const createStyles = (theme, vw, vh) => (StyleSheet.create({
  container: {
    flex: 1
  },
  ctaContainer: {
    position: "absolute",
    bottom: 90,
    right: 0.07 * vw,
    alignSelf: 'flex-end',
    zIndex: 1
  },
  map: {
    width: 1 * vw,
    height: 1.1 * vh,
    zIndex: 0,

  }

}));