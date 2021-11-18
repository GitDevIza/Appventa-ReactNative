import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { ApplicationState, ShoppingState, Product, onUpdateCart, UserState } from '../redux'

import { useNavigation, checkExistence } from '../utils';

import { SearchBar, ButtonWithIcon, FoodCard } from '../components'

interface SearchScreenProps{
	userReducer: UserState,
	shoppingReducer: ShoppingState,
	onUpdateCart: Function,
	goBack: Function
}

const _SearchScreen: React.FC<SearchScreenProps> = (props) => {

	const { navigate } = useNavigation() 

	const { goBack } = props.navigation;

	const [isEditing, setIsEditing] = useState(false)
	const [keyword, setKeyword] = useState('')
	
	const { availableFoods } = props.shoppingReducer;
	const { Cart } = props.userReducer;

	const onTapFood = (item: Product) => {
		navigate('FoodDetailPage', { product: item })
	}

	return(
		<View style={styles.container}>
			<View style={styles.navigation}>
				<View style={styles.searchBar}>
					<ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
					<SearchBar onTextChange={setKeyword} onEndEditing={() => setIsEditing(false)} didTouch={() => setIsEditing(true)} />
				</View>
			</View>

			<View style={styles.body}>
				<FlatList 
					showsVerticalScrollIndicator={false}
					data={
						isEditing
						?
						availableFoods.filter((item) => {
							return item.name.includes(keyword)
						})
						: availableFoods
					}
					renderItem={({item}) => <FoodCard onTap={onTapFood} item={checkExistence(item, Cart)} onUpdateCart={props.onUpdateCart} />}
					keyExtractor={(item) => `${item._id}` }
				/>
			</View>
		</View>
	)
}


const styles = StyleSheet.create({
	container: { flex: 1 },
	searchBar:{
		flex:2,
		display: 'flex',
		height: 60,
		justifyContent: 'space-around',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 4,
	},
	navigation: { flex: 1, marginTop:40},
	body: { flex: 10, justifyContent:'center', alignItems:'center'},
	footer: { flex: 1, backgroundColor: 'cyan'}
})

const mapStateToProps = (state: ApplicationState) => ({
	userReducer: state.userReducer,
	shoppingReducer: state.shoppingReducer
})

const SearchScreen = connect(mapStateToProps, { onUpdateCart })(_SearchScreen)

export { SearchScreen }