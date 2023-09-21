import React, { useState, useEffect, useContext } from "react";
import {
	Platform,
	StyleSheet,
	KeyboardAvoidingView,
	FlatList,
	Text,
} from "react-native";
import IconButton from "../components/IconButton";
import * as SplashScreen from "expo-splash-screen";

import { ThemeContext } from "../styles/ThemeContext";

import Post from "../components/Post";
import axios from "axios";


export default function Feed({ route, navigation }) {
	const theme = useContext(ThemeContext);
	const styles = createStyles(theme);

	/**
	 * Generate mock post data. In the future this should fetch the backend for a list of relevant posts depending on the original post that the user clicked.
	 */

	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`/posts/${route.params.pid}`);
				setPosts(data);
			} catch (err) {
				console.error(JSON.stringify(err));
			}
		};
		fetchData();
	}, []);

	return (
		<>
			{posts.length == 0 ? (
				<></>
			) : (
				<FlatList
					data={posts}
					pagingEnabled
					renderItem={({ item: post, i }) => (
						<Post
							key={i}
							campus={post.campus}
							location={post.location_name}
							date={new Date(post.happened_at).toDateString()}
							textContent={post.message}
						/>
					)}
					showsVerticalScrollIndicator={false}
					decelerationRate="normal"
					disableIntervalMomentum
				/>
			)}
		</>
	);
}

const createStyles = (theme) => StyleSheet.create({});
