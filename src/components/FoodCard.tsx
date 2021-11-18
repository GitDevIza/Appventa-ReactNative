import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { Product } from '../redux'
import { BASE_URL } from '../utils'
import { ButtonAddRemove } from './ButtonAddRemove'

interface FoodCardProps{
	item: Product;
	onTap: Function;
	onUpdateCart: Function;
}

const widthScreen = Dimensions.get('screen').width;

const FoodCard: React.FC<FoodCardProps> = ({ item, onTap, onUpdateCart }) => {


	const didUpdateCart = (unit: number) => {
		item.quantity = unit;
		onUpdateCart(item)
	}

	const didAddButton = () => {
		let unit = isNaN(item.quantity) ? 0 : item.quantity;
		didUpdateCart(unit + 1);
	}

	const didRemoveButton = () =>{
		let unit = isNaN(item.quantity) ? 0 : item.quantity;
		didUpdateCart(unit > 0 ? unit - 1 : unit);
	}

	return (<View style={styles.container}>
		<Image source={{ uri: `${BASE_URL}${item.images[0]}`}} style={styles.imageFood} />
		<TouchableOpacity onPress={() => onTap(item)} style={styles.foodCard} >
			<View style={styles.viewText}>  
				<Text>{item.name}</Text>
				<Text>{item.category}</Text>
			</View>
			<View style={styles.viewPrice}>
				<Text style={styles.priceText}>{item.price}</Text>
				<ButtonAddRemove 
				onAdd={ didAddButton } 
				onRemove={ didRemoveButton }
				unit={item.quantity} />
			</View>
		</TouchableOpacity>
	</View>)
}

const styles = StyleSheet.create({
	container: { 
		display: 'flex',
		flex: 1, 
		width: widthScreen -20,
		margin: 10,
		borderRadius: 20,
		backgroundColor: '#FFF',
		height: 100,
		justifyContent: 'flex-start',
		borderWidth: 1,
		borderColor: '#E5E5E5',
		flexDirection: 'row'
	},
	navigation: {flex: 2, backgroundColor: 'red'},
	body: { flex: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'},
	footer: { flex: 1, backgroundColor: 'cyan'},
	imageFood: {
		width: 100,
		height: 100,
		borderRadius: 10,
		backgroundColor: '#EAEAEA'
	},
	viewText:{
		display:'flex',
		flex: 7,
		padding: 10
	},
	foodCard:{
		display:'flex',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	viewPrice:{
		display: 'flex',
		flex: 5,
		padding: 10,
		justifyContent: 'space-around',
		alignItems: 'center',
		marginRight: 10
	},
	priceText:{
		fontSize: 18,
		fontWeight: '600',
		color: '#7C7C7C'
	}
})

export { FoodCard }