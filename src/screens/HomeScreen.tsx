import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import { useNavigation } from '../utils';

import { connect } from 'react-redux'
import { SearchBar, ButtonWithIcon, CategoryCard, RestaurantCard } from '../components'
import { onAvailability, onSearchFoods, UserState, AplicationState, ShoppingState, Restaurant, Product } from '../redux'


interface HomeProps{
	userReducer: UserState,
	shoppingReducer: ShoppingState,
	onAvailability: Function,
	onSearchFoods: Function
}

const screenWidth = Dimensions.get('screen').width;

export const _HomeScreen: React.FC<HomeProps> = (props) => {

	const { navigate } = useNavigation();

	const { location } = props.userReducer;
	const { availability } = props.shoppingReducer;

	const { categories, products, salepoints } = availability

	useEffect(() => {
		props.onAvailability(location.postalCode)

		setTimeout(() => {
			props.onSearchFoods(location.postalCode)
		}, 1000)

	}, [])

	const onTapRestaurant = (item: Restaurant) => {
		navigate('RestaurantPage', {restaurant: item});
	}

	const onTapFood = (item: Product) => {
		navigate('FoodDetailPage', {food: item});
	}

	return(
		<View style={styles.container}>
			<View style={styles.navigation}>
				<View style={styles.header}>
					<Text>{`${location.street} ${location.name}, ${location.city}`}</Text>
					<Text>Edit Button</Text>
				</View>
				<View style={styles.searchBar}>
					<SearchBar didTouch={() => {
						navigate('SearchPage')
					}} onTextChange={() => {}} />
					<ButtonWithIcon onTap={() => {}} icon={require('../images/hambar.png')} width={50} height={40} />
				</View>
			</View>
			<View style={styles.body}>
				<View style={{ height: 140 }}>
						<FlatList
							horizontal
							showsHorizontalScrollIndicator={false}
							data={categories}
							renderItem = {({item}) => <CategoryCard item={item} onTap={() => { alert('Category Tapped')}} /> }
							keyExtractor={ (item) => `${item.id}`}
						 />
				</View>
							<View>
								<Text style={styles.restaurantsList}>Puntos de Venta</Text>
							</View>
							 {/*<View>
								<Text style={styles.restaurantsList}>30 Minutes Foods</Text>
							</View>
							<FlatList
								horizontal
								showsHorizontalScrollIndicator={false}
								data={products}
								renderItem = {({item}) => <RestaurantCard item={item} onTap={ onTapFood } /> }
								keyExtractor = { (item) => `${item._id}`}
							 />*/}
							<FlatList
								showsVerticalScrollIndicator={false}
								data={salepoints}
								renderItem = {({item}) => <RestaurantCard item={item} onTap={ onTapRestaurant } /> }
								keyExtractor = { (item) => `${item._id}`}
							 />
			</View>
			<View style="style.footer">
				<Text> Footer </Text>
			</View>
		</View>
	)
}
//background_palta.jpg
const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: '#FFF'
	},
	navigation: {
		flex: 2,
	},
	header:{
		flex:0,
		marginTop: 30,
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	body:{
		flex: 9,
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchBar:{
		display: 'flex',
		height: 60,
		justifyContent: 'space-around',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 4,
	},
	restaurantsList: {
		fontSize:25,
		fontWeight: '600',
		color:'#f15b5b',
		marginLeft:20,
		paddingBottom: 10
	}
})


const mapToStateProps = (state: AplicationState) => ({
	userReducer: state.userReducer,
	shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, {onAvailability, onSearchFoods})(_HomeScreen)

export { HomeScreen }