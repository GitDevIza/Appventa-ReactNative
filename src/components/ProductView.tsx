import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, Dimensions } from 'react-native'
import { Product } from '../redux'
import { BASE_URL } from '../utils'
import { ButtonAddRemove } from './ButtonAddRemove'
import { Number, Currency } from "react-intl-number-format"

interface ProductViewProps{
	item: Product;
	onUpdateCart: Function;
}


const screenWidth = Dimensions.get('screen').width;

const ProductView: React.FC<ProductViewProps> = ({item, onUpdateCart}) => {

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


	const priceProd = item.price * item.quantity;


	return( 
		<View style={styles.bodyFood}>
			<View style={styles.contentInfoProd}>
				<View style={styles.borderInfo}>
					<Image source={{ uri: `${BASE_URL}${item.images[0]}`}} style={styles.imageProd} />
					<View style={styles.priceButton}>
						<Text style={styles.textPrice}>S/ {isNaN(priceProd)? '0.00' : priceProd+'.00'}</Text>
					</View>
					<View style={styles.contDivisore}>
						<Text style={styles.textCategor}>{item.category}</Text>
					</View>
					<View style={styles.contDivisore}>
						<Text style={styles.textNameProd}>{item.unit} de {item.name}</Text>
					</View>
					<View>
						<Text style={styles.pricesUnity}>S/ {item.price} x UN</Text>
					</View>
					<View style={styles.contButtonAddRemove}>
						<ButtonAddRemove onAdd={ didAddButton } onRemove={didRemoveButton } unit={item.quantity} />
					</View>
	
				</View>
			</View>
		</View>
		)
}



const styles = StyleSheet.create({
	bodyFood: { flex: 11, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', paddingLeft: 15, paddingRight: 15, paddingTop: 15},
	contentInfoProd: { 
		justifyContent: 'flex-start',
		width: screenWidth-40,
		paddingBottom: 2,
		paddingTop: 1,
		borderRadius: 15,
		backgroundColor: "#c8c8c878",
		shadowColor: "#c8c8c878",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 2,
		elevation: 8
	},
	borderInfo: {
		alignItems: 'center',
		backgroundColor: "white",
		width:screenWidth - 42,
		paddingLeft: 1,
		paddingTop: 10,
		paddingBottom: 10,
		borderWidth: 4,
		borderColor: "white",
		borderRadius:15
	},
	imageProd: { 
		width: 200, 
		height: 140, 
		alignItems: 'center',
		borderRadius: 15,
	},
	textPrice: {
		fontSize:18,
		color:"white"
	},
	priceButton:{ marginTop: 25, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, backgroundColor: "#5bb45b", alignItems: "center", borderRadius:10 },
	contDivisore:{
		marginTop:18,
	},
	textCategor:{
		color: "#5bb45b",
		fontSize: 16,
		fontWeight: "bold"
	},
	textNameProd:{
		fontSize: 23,
		fontWeight: "bold",
		color: "#666666"
	},
	contButtonAddRemove: {
		marginTop: 25,
		height: 50
	},
	pricesUnity: {
		fontSize: 16,
		color: 'gray',
		fontWeight: "bold"
	}
});

export { ProductView }