import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import {
	Poppins_400Regular,
	Poppins_400Regular_Italic,
	Poppins_500Medium,
  Poppins_600SemiBold,
	Poppins_700Bold,
	Poppins_800ExtraBold,
	useFonts,
} from "@expo-google-fonts/poppins";

import Map from "./routes/Map";
import Login from "./routes/Login";
import Register from "./routes/Register";
import VerifyEmail from "./routes/VerifyEmail";
import Feed from "./routes/Feed";
import Profile from "./routes/Profile";
import Boarding from "./routes/Boarding";
import { theme, darkTheme } from "./styles/Theme";
import { ThemeContext } from "./styles/ThemeContext";
import CreatePost from "./routes/CreatePost";
import RegisterFinal from "./routes/RegisterFinal";
import DirectMessaging from "./routes/DirectMessaging";
import PlacePickerMap from "./routes/PlacePickerMap";

/**
 * configure axios
 */
import axios from "axios";
axios.defaults.baseURL = "http://192.168.1.161:8000/api";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	const [fontsLoaded, fontError] = useFonts({
		Poppins_400Regular,
		Poppins_400Regular_Italic,
		Poppins_500Medium,
    Poppins_600SemiBold,
		Poppins_700Bold,
		Poppins_800ExtraBold,
		"ITC Giovanni": require("./assets/fonts/itc_giovanni_std_book.otf"),
	});

	useEffect(() => {
		const isUserLoggedIn = async () => {
			const sessionId = await SecureStore.getItemAsync("sessionId");
			setLoggedIn(() => {
				if (
					sessionId !== null ||
					sessionId !== undefined ||
					sessionId !== ""
				)
					return true;
				else return false;
			});
		};

		isUserLoggedIn();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
  onLayoutRootView();

	return (
			<ThemeContext.Provider value={darkMode ? darkTheme : theme}>
					<NavigationContainer>
						<Stack.Navigator
							initialRouteName={!loggedIn ? "boarding" : "map"}
							screenOptions={{
								headerShown: false,
								cardStyleInterpolator: ({ current }) => ({
									cardStyle: { opacity: current.progress },
								}),
							}}
						>
							<Stack.Screen
								name="boarding"
								component={Boarding}
							/>
							<Stack.Screen
								name="createPost"
								component={CreatePost}
							/>
							<Stack.Screen name="map" component={Map} />
							<Stack.Screen name="login" component={Login} />
							<Stack.Screen
								name="register"
								component={Register}
							/>
							<Stack.Screen
								name="registerFinal"
								component={RegisterFinal}
							/>
							<Stack.Screen
								name="verifyEmail"
								component={VerifyEmail}
							/>
							<Stack.Screen name="feed" component={Feed} />
							<Stack.Screen
								name="profile"
								component={DirectMessaging}
							/>
							<Stack.Screen
								name="placePickerMap"
								component={PlacePickerMap}
							/>
						</Stack.Navigator>
					</NavigationContainer>
			</ThemeContext.Provider>
	);
}
