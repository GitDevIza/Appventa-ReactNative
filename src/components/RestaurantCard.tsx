import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native'
import { BASE_URL } from '../utils'
import { Restaurant } from '../redux'

const screenWidth = Dimensions.get('screen').width;

interface RestaurantProps{
	item: Restaurant | Product;
	onTap: Function	
}

const RestaurantCard: React.FC<RestaurantProps> = ({item, onTap}) => {

	return (
		<TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
			<Image style={styles.imageContainer}
			source={{ uri: `${BASE_URL}${item.images[0]}`}}
			 />
		</TouchableOpacity>
		)
}

const styles = StyleSheet.create({
	container: {
		width: screenWidth - 20,
		height: 230,
		justifyContent: 'space-around',
		alignItems: 'center',
		margin: 10,
		borderRadius: 20
	},
	imageContainer: {
		width: screenWidth - 20,
		height: 220,
		borderRadius: 20,
		backgroundColor: '#EAEAEA'
	}
});

export {RestaurantCard}