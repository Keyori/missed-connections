import React, { useState, useEffect, useContext} from 'react';
import { Platform, StyleSheet,KeyboardAvoidingView, FlatList } from 'react-native';
import { Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import IconButton from '../components/IconButton';
import { ThemeContext } from '../App';

import Post from "../components/Post"
import axios from 'axios';

export default function Feed({ route, navigation }) {

    const theme = useContext(ThemeContext)
    const styles = createStyles(theme)
    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_400Regular,
        Poppins_400Regular_Italic
    });



    /**
     * Generate mock post data. In the future this should fetch the backend for a list of relevant posts depending on the original post that the user clicked.
     */

    const [posts, setPosts] = useState([]);
    useEffect(async () => {
        try{
            const {data} = await axios.get(`http://192.168.1.237:3000/api/1.0/posts?startPost=${route.params.pid}`) ;
            setPosts(data)

        }catch(err){
            console.trace(err)
        }
    
    }, [])


    // if (route.params!== undefined && route.params.campus !== undefined) posts[0].campus = route.params.campus  

    if (!fontsLoaded) return <AppLoading />
    return (
            <FlatList 
                data = {posts}
                pagingEnabled
                renderItem = {({item, index}) => <Post key = {index} campus = {item.campus} location = {item.location} date = {new Date(item.postedAt).toDateString()} textContent = {item.text}/>}
                showsVerticalScrollIndicator = {false}
                decelerationRate= "normal"
                disableIntervalMomentum
                 
            />
    )
}


const createStyles = (theme) => (
    StyleSheet.create({    })
)