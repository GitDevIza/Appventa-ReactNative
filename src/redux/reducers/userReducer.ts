import { Address } from  'expo-location'
import { UserAction } from '../actions'
import { UserModel, UserState, Product } from '../models'


const initialState: UserState = {
	user: {} as UserModel,
	location: {} as Address,
	error: undefined,
	Cart: {} as [Product]
}


const UserReducer = (state: UserState = initialState, action: UserAction) => {
	
	switch(action.type){
		case 'ON_UPDATE_LOCATION':
			return{
				...state,
				location: action.payload
			}

		case 'ON_UPDATE_CART':
			if(!Array.isArray(state.Cart)){
				return{
					...state,
					Cart: [action.payload]
				}
			}

			const existingProd = state.Cart.filter(item => item._id ===	action.payload._id );

			if(existingProd.length > 0){
				let updateCart = state.Cart.map((prod)=>{
					if(prod._id === action.payload._id){
						prod.quantity = action.payload.quantity
					}

					return prod;
				})

				return{
					...state,
					Cart: updateCart.filter(item => item.quantity > 0)
				}


			}else{
				return{
					...state,
					Cart: [...state.Cart, action.payload]
				}
			}

		case 'ON_USER_LOGIN':
			console.log(action.payload) 
			return {
				...state,
				user:action.payload
			}

		default:
			return state;
	}
}

export{ UserReducer }