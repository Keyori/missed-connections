
import { useContext, useEffect, useState, useRef } from 'react';
import { Dimensions, TextInput, StyleSheet, View, Text, FlatList, Pressable, Keyboard } from 'react-native';
import axios from 'axios';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';


import PlaceIcon from "../assets/images/place_picker_icon"
import SearchSvg from '../assets/images/search_icon'
import { ThemeContext } from '../App'

//google places api key
const PLACES_API_KEY = "AIzaSyDGf63pZ431mpQEyLVoVI204wrq4te_aGc"


export default function PlacesAutocomplete({ navigation, placeholderText="Search Location", onSelectPrediction, onKeyboardDidHide=()=>{}, displaySearchIcon=true, autoFocus, width = 0.92}) {

    const theme = useContext(ThemeContext)
    const styles = createStyles(theme, Dimensions.get('window').width, Dimensions.get('window').height, width)
    let [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium });



    // controlled input controller. 
    const [dropdown, setDropdown] = useState({ isOpen: false, query: "" })
    const handleQuery = newText => setDropdown({ isOpen: newText.trim().length > 0, query: newText })


    /**
     * Smart Delete
     * 
     * eases of the process of deleting a selected prediction. When a user selects a prediction it will replace the dropdown query. 
     * if the user wants to create a new prediction he need to delete the current query and start typing from scratch again. In place of deleting every char of the prediction, 
     * this will delete the whole prediction if the user presses backspace more then 4 times.  
     */
    const queryKeyHistory = useRef([]).current
    const handleKeyPress = e => {
        queryKeyHistory.unshift(e.nativeEvent.key)
        queryKeyHistory.length = 4;

        //if all of the past 4 keys have been backspace then delete the entire word 
        if (queryKeyHistory.find(el => el !== "Backspace") === undefined) {
            queryKeyHistory.fill("")
            setDropdown(old => ({ ...old, query: "" }))

        }
    }



    /**
     * listen to dropdown.query and fetches predictions from the google place api.
     * includes throttling that limiting api calls to 1 per 800ms max. 
     */
    const [predictions, setPredictions] = useState([])
    const dropdownTimeoutId = useRef()
    useEffect(() => {
        clearTimeout(dropdownTimeoutId.current)

        if (!dropdown.query.trim()) return

        dropdownTimeoutId.current = setTimeout(async () => {
            //https://maps.googleapis.com/maps/api/place/autocomplete/json
            let result;
            try {
                const { data } = await axios.get("http://192.168.1.237:3000", {
                    params: {
                        key: PLACES_API_KEY,
                        input: dropdown.query.trim(),
                        language: 'en',
                        location: '40.501666, -74.450201',
                        radius: 5000,
                        strictbounds: true,
                    }
                })
                result = data.predictions;
            }
            catch (err) {
                console.trace(err);
                result = ['error'];
            }
            setPredictions(result)
            return () => clearTimeout(dropdownTimeoutId.current)
        }, 800)
    }, [dropdown.query])





    /**
     * when a user selects a prediction set the dropdown.query to the place name and fetch its coordinates using google geocode api. 
     */
    const handlePredictionPress = async (prediction) => {
        setDropdown(old => ({ query: prediction.structured_formatting.main_text, isOpen: false }))
        try {
            const { data } = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?", {
                params: {
                    key: PLACES_API_KEY,
                    place_id: prediction.place_id,
                }
            })
            const geometry =  {latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng}
            
            Keyboard.dismiss()
            onSelectPrediction({...geometry, mainText: prediction.structured_formatting.main_text });
        
        } catch (err) {
            console.trace(err)
        }
    } 


    /**
     *  hide predictions dropdown when the user hides his keyboard 
     */
    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',() => {
            setDropdown(old => ({...old, isOpen: false}))
            onKeyboardDidHide()
          }
        );
        return () => {keyboardDidHideListener.remove();};
      }, []);




    if (!fontsLoaded) return <AppLoading />
    return (
        <View style={styles.container}>
            <View style={styles.response}>
                {displaySearchIcon && <SearchSvg height={19} width={19} style={styles.icon} />}
                <TextInput
                    placeholder={placeholderText}
                    textAlign="left"
                    style={styles.responseBox(displaySearchIcon)}
                    selectionColor="#F17F8C"
                    placeholderTextColor="#AFAFAF"
                    defaultValue={dropdown.query}
                    onKeyPress={handleKeyPress}
                    onChangeText={handleQuery}
                    autoFocus = {autoFocus}
                />
                <Text style={{ ...styles.responseBox(displaySearchIcon), ...styles.shadowBox }}></Text>
            </View>
            {
                dropdown.isOpen && predictions.length > 1 && predictions[0] !== "error" &&
                <View style={styles.predictionsContainer}>
                    <FlatList
                        data={predictions}
                        keyboardShouldPersistTaps="always"
                        keyExtractor={item => item.place_id}
                        renderItem={({ item, index }) => (
                            <Pressable style={styles.predictionContainer(index)} onPressIn={() => handlePredictionPress(item)}>
                                <View style={styles.iconContainer}>
                                    <PlaceIcon types = {item.types} fill = "#8D8D8D"/>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.mainText} numberOfLines={1} >{item.structured_formatting.main_text}</Text>
                                    <Text style={styles.secondaryText} numberOfLines={1} >{item.terms.slice(1, 3).map(el => el.value).join(", ")} </Text>
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            }
        </View>


    )
}

const createStyles = (theme, vw, vh, width, ) => (StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    predictionsContainer: {
        height: 1 * vh,
        width: 1 * vw,
        paddingHorizontal: 0.04 * vw,
        paddingVertical: 15,
        marginTop: 0.02 * vh,
        borderColor: "#C4C4C4",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: 'white',
    },
    predictionContainer: (i) => ({
        flexDirection: 'row',
        paddingVertical: 9,
        alignItems: 'center',
        borderColor: "#F6F6F6",
        borderTopWidth: i === 0 ? 0 : 2,
    }),
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        top: 5
    },
    mainText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
        color: "#404040",
        height: 30
    },
    secondaryText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        color: "#B0AFB7",
        top: -8
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#EBEBEB',
        marginRight: 15,
        alignItems: "center",
        justifyContent: 'center'
    },

    icon: {
        position: 'absolute',
        left: 18,
        top: 20,
        zIndex: 3
    },
    shadowBox: {
        backgroundColor: "#C4C4C4",
        zIndex: 1,
        position: 'absolute',
        bottom: -3
    },
    responseBox: (displaySearchIcon)=>({
        fontFamily: "Poppins_400Regular",
        marginBottom: 5,
        fontSize: 19,
        borderColor: "#C4C4C4",
        borderWidth: 2,
        borderRadius: 10,
        paddingTop: 17,
        paddingBottom: 10,
        lineHeight: 20,
        paddingLeft: displaySearchIcon?  50 : 20,
        paddingRight: displaySearchIcon? 10 : 20,
        color: "#404040",
        backgroundColor: "white",
        zIndex: 2,
        alignSelf: 'stretch',
        width: width * vw
    }),
}));