import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { BASE_URL } from '../utils'
import { Category } from '../redux'

interface CategoryProps{
	item: Category;
	onTap: Function;
}

const CategoryCard: React.FC<CategoryProps> = ({item, onTap}) => {
	return (
		<TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
			<Image style={styles.image} source={{ uri: `${BASE_URL}${item.icon}`}} />
		</TouchableOpacity>
		)
}

const styles = StyleSheet.create({
	container: {
		width: 120,
		height: 140,
		justifyContent: 'space-around',
		alignItems: 'center',
		margin: 5
	},
	image: {
		width: 120,
		height: 95,
		borderRadius: 20,
		backgroundColor: '#EAEAEA'
	},
	textStyle: {
		fontSize: 14,
		marginTop: 10,
		color: '#858585'
	}
})

export { CategoryCard }