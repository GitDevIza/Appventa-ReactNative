import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { BASE_URL } from '../utils'
import { ButtonWithIcon, FoodCard } from '../components';
import { Restaurant, product } from '../redux';

import { useNavigation } from '../utils/useNavigation';

interface RestaurantProps{
	navigation: { getParam: Function, goBack: Function }
}

const screenWidth = Dimensions.get('screen').width;

const RestaurantScreen: React.FC<RestaurantProps> = (props) => {

	const { getParam, goBack } = props.navigation;

	const restaurant = getParam('restaurant') as Restaurant;

	const { navigate } = useNavigation();

	const addresSalePoint = restaurant.address;

	const onTapFood = (item: product) => {
		navigate('FoodDetailPage', { food: item })
	}
 
	return (
	<View style={styles.container}>
		<View style={styles.navigation}>
			<ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
			<Text style={styles.title}>{restaurant.name}</Text>
		</View>
		<View style={styles.body}>
			<ImageBackground style={styles.imagesBack} source={{ uri: `${BASE_URL}${restaurant.images[0]}`}}>
				<View style={styles.contentInfo}>
					<Text style={styles.textInfo}>{restaurant.name}</Text>
				</View>
			</ImageBackground>

			<View style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
				<View style={{ marginTop:20 }}>
					<Text style={{ width: 100}}>Ubicación</Text>
					<Text style={styles.textInfo2}>{addresSalePoint}</Text>
				</View>
				<View style={{ marginTop:20 }}>
					<Text>Teléfono</Text>
					<Text style={styles.textInfo2}>{restaurant.phone}</Text>
				</View>
			</View>

			{/*<FlatList
				showsVerticalScrollIndicator={false}
				data={restaurant.foods}
				renderItem={({item}) => <FoodCard item={item} onTap={ onTapFood } /> }
				keyExtractor={(item) => `${item._id}`}
			 />*/}
		</View>
	</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#F2F2F2'},
	title:{
		fontSize: 16,
		fontWeight: '600',
		marginLeft: 10
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
		color:'blue',
		fontSize: 20,
		fontWeight: '700',
	},
	navigation: {
		flex: 1,
		marginTop: 43,
		paddingLeft: 10,
		flexDirection: 'row',
		alignItems:'center'
	},
	body: { flex: 11, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF'},
	footer: { flex: 1, backgroundColor: 'cyan'}
})

export { RestaurantScreen }