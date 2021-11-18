CartScreen

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { ApplicationState, ShoppingState, Product, onUpdateCart, UserState } from '../redux'

import { useNavigation, checkExistence } from '../utils';

import { SearchBar, ButtonWithIcon, FoodCard, ButtonWithTitle } from '../components'

interface CartScreenProps{
	userReducer: UserState,
	shoppingReducer: ShoppingState,
	onUpdateCart: Function,
}

const _CartScreen: React.FC<CartScreenProps> = (props) => {

	const { navigate } = useNavigation();

	const [totalAmount, setTotalAmount] = useState(0)
	
	const [isEditing, setIsEditing] = useState(false)
	const [keyword, setKeyword] = useState('')
	
	const { availableFoods } = props.shoppingReducer;
	const { Cart, user } = props.userReducer;

	const onTapFood = (item: Product) => {
		navigate('FoodDetailPage', { product: item })
	}



	const onCalculateAmount = () =>{

		if(Array.isArray(Cart)){
			let total = 0;
			Cart.map(prod => {
				total += prod.price * prod.quantity
			})

			setTotalAmount(total);
		}
	}

	useEffect(() =>{
			onCalculateAmount()
	},[Cart]);

	const onVAlidateOrder = () => {
		if(!user.verified){
			navigate('LoginPage')
		}else{
			console.log('Now we can order')
		}
	}

	if(Cart.length > 0){
		return(
			<View style={styles.container}>
				<View style={styles.navigation}>
					<View style={styles.searchBar}>
						
					</View>
				</View>

				<View style={styles.body}>
					<FlatList 
						showsVerticalScrollIndicator={false}
						data={ Cart }
						renderItem={({item}) => <FoodCard onTap={onTapFood} item={checkExistence(item, Cart)} onUpdateCart={props.onUpdateCart} />}
						keyExtractor={(item) => `${item._id}` }
					/>
				</View>

				<View style={styles.footer}>
					<View style={styles.amountView}>
						<Text style={{ fontSize: 18 }}>Total</Text>
						<Text style={{ fontSize: 18 }}>{totalAmount}</Text>
					</View>
					<ButtonWithTitle title={"Order Now"} onTap={onVAlidateOrder} height={50} width={320} />
				</View>

			</View>
		)
	}else{
		return(<View style={{ flex:1, display:'flex', justifyContent: 'center', alignItems: 'center'}}>
			<Text style={{ fontSize: 25, fontWeight: '700'}}>Your Cart is Empty!!</Text>
		</View>)
	}

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
	amountView:{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 20,
		paddingRight: 20,

	},
	navigation: { flex: 1, marginTop:40},
	body: { flex: 10, justifyContent:'center', alignItems:'center'},
	footer: { flex: 3, backgroundColor: 'white', padding: 10}
})

const mapStateToProps = (state: ApplicationState) => ({
	shoppingReducer: state.shoppingReducer,
	userReducer: state.userReducer
})

const CartScreen = connect(mapStateToProps, { onUpdateCart })(_CartScreen)

export { CartScreen }