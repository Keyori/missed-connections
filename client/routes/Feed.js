import React, { useContext} from 'react';
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
    if (!fontsLoaded) return <AppLoading />



    /**
     * Generate mock post data. In the future this should fetch the backend for a list of relevant posts depending on the original post that the user clicked.
     */


    const posts = [
        {key: 0, campus: 'livingston',location: 'Livingston Student Center', date: 'Yesterday',textContent:"We met Wednesday morning at the train station!!! You're a sophomore, bio major but thinking about going into education and I'm a freshman poli sci major! You had a mask on that said Rogan upside down with I think an alien? You were trying to go to the airport. You were so frickn nice and our conversation actually stopped me from having an anxiety attack. The train came and I was so worried about getting on I didn't get to say goodbye, I thought you were also boarding but I lost sight of you 41) I never got your name and I regret it es 0-4 pls hmu you seemed so cool"}, 
        {key: 1, campus: 'collegeAve',location: 'College Avenue Student Center', date: 'Dec 16',textContent: "To the guy with brown fluffy hair who dropped a bowl at Brower on 11/15, the bowl was LOUD, you look really cute though so I hope you're single 👀"},
        {key: 2,campus: 'busch',location: 'B Bus', date: '3/31',textContent: '"to the cute brown girl on the B bus. you had a gray jansport bag with a van gogh and rutgers R pin. i made eye contact with you for a solid second and i was locked in. your eyes were so mesmerizing. i would love to get some coffe and get lost those dark brown eyes forever."'},
        {key: 3,campus: 'busch',location: 'Werblin Recreation Center, Sonny A.', date: 'Feb 14', textContent: "Met a super awesome guy in science class... hmu"},
        {key: 4,campus: 'busch',location: 'Busch Student Center', date: '2:30pm', textContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quidem provident accusamus tenetur delectus soluta perferendis odit sit. Assumenda et distinctio ducimus, voluptatibus enim quo repudiandae saepe dolorum. Odit, maiores?Zepi dolor sit, amet consectetur adipisicing elit. Accusantium quidem provident accusamus tenetur delectus soluta perferendis odit sit. Assumenda et distinctio ducimus, voluptatibus enim quo repudiandae saepe dolorum. Odit?Zepi dolor sit, amet consectetur adipisicing elit. Accusantium quidem provident accusamus tenetur delectus soluta perferendis odit sit. Assumenda et distinctio ducimus, voluptatibus enim quo repudiandae saepe dolorum. OditZepi dolor sit, amet consectetur adipisicing elit. Accusantium quidem provident accusamus tenetur delectus soluta perferendis odit sit. Assumenda et distinctio ducimus, voluptatibus enim quo repudiandae saepe dolorum. Odit"}
    ]
    if (route.params!== undefined && route.params.campus !== undefined) posts[0].campus = route.params.campus  

    const campuses = ["livingston","busch","cookDoug","collegeAve"]
    // axios.get("http://localhost:3000/api/posts")
    // .then(resp => resp.data)
    // .then(data => {
    //     for (let i = 0; data[i]; i++){
    //         console.log(data[i])
    //         posts[posts.length] = {
    //             key: posts.length,
    //             campus: (data[i].campus > -1 ? campuses[data[i].campus] : "busch"),
    //             location: data[i].location,
    //             textContent: data[i].content
    //         }
    //     }
    // })

    return (

            <FlatList 
                data = {posts}
                pagingEnabled
                renderItem = {({item, index}) => <Post key = {index} campus = {item.campus} location = {item.location} date = {item.date} textContent = {item.textContent}/>}
                showsVerticalScrollIndicator = {false}
                decelerationRate= "normal"
                disableIntervalMomentum
                 
            />
    )
}


const createStyles = (theme) => (
    StyleSheet.create({    })
)