import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, Dimensions } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { ButtonWithIcon, FoodCard, ButtonAddRemove, ProductView } from '../components';
import { ApplicationState, Restaurant, Product, UserState, onUpdateCart } from '../redux';

import { BASE_URL, checkExistence } from '../utils'

import { useNavigation } from '../utils/useNavigation';

interface FoodDetailProps{
	userReducer: UserState,
	navigation: { getParam: Function, goBack: Function },
	onUpdateCart: Function,
	Cart: [Product]
}

const screenWidth = Dimensions.get('screen').width;

const _FoodDetailScreen: React.FC<FoodDetailProps> = (props) => {

	const { getParam, goBack } = props.navigation;

	const food = getParam('product') as Product;
	const { Cart } = props.userReducer;

	const { navigate } = useNavigation();

 
	return (
	<View style={styles.container}>
		<View style={styles.navigation}>
			<ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
			<Text style={styles.title}>{food.name}</Text>
		</View>
		<ProductView item={checkExistence(food, Cart)} onUpdateCart={props.onUpdateCart}  />
		{/*<View style={styles.body}>
			<ImageBackground style={styles.imagesBack} source={{ uri: `${BASE_URL}${food.images[0]}`}}>
				<View style={styles.contentInfo}>
					<Text style={styles.textInfo}>{food.name}</Text>
					<Text style={styles.textInfo2}>{food.category}</Text>
				</View>
			</ImageBackground>

			<ScrollView>
				<View style={{ display: 'flex', height: 250, padding: 20}} >
					<Text>Food will be ready whitin {food.readyTime} Minutes(s)</Text>
					<Text>{food.description}</Text>
				</View>
				<View style={{ height: 120 }}>
					<FoodCard item={food} onTap={() => {} } />
				</View>
			</ScrollView>
		</View>*/}
	</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#F2F2F2'},
	title:{
		fontSize: 18,
		fontWeight: '600',
		marginLeft: 10,
	},
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




	imagesBack:{
		width: screenWidth,
		height: 300,
		justifyContent: 'flex-end'
	},
	contentInfo:{
		height: 120,
		backgroundColor: 'rgba(0,0,0,0.6)',
		padding: 10
	},
	textInfo:{
		color:'#FFF',
		fontSize: 30,
		fontWeight: '700',
	},
	textInfo2:{
		color:'#FFF',
		fontSize: 25,
		fontWeight: '700',
	},
	navigation: {
		flex: 1,
		marginTop: 43,
		paddingLeft: 10,
		flexDirection: 'row',
		alignItems:'center'
	},
	body: { flex: 11, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF' },
	footer: { flex: 1, backgroundColor: 'cyan'}
})

const mapStateProps = (state: ApplicationState) => ({
	userReducer: state.userReducer,
})

const FoodDetailScreen = connect(mapStateProps, { onUpdateCart })(_FoodDetailScreen)

export { FoodDetailScreen }