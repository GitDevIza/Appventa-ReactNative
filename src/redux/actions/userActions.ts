import axios from 'axios'
import { Address } from 'expo-location'
import { Dispatch } from 'react'
import { BASE_URL } from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Producty, UserModel} from '../models'

export interface UpdateLocationAction{
	readonly type: 'ON_UPDATE_LOCATION',
	payload: Address
}

export interface UpdateCartAction{
	readonly type: 'ON_UPDATE_CART',
	payload: Product
}

export interface UserErrorAction{
	readonly type: 'ON_USER_ERROR',
	payload: any
}

export interface UserLoginAction{
	readonly type: 'ON_USER_LOGIN',
	payload: UserModel
}

export type UserAction = UpdateLocationAction | UpdateCartAction | UserErrorAction | UserLoginAction;

// User Action trigger from Components

export const onUpdateLocation = (location: Address) => {

	
	return async ( dispatch: Dispatch<UserAction> ) => {
		try{
			const locationString = JSON.stringify(location);
			await AsyncStorage.setItem('user_location', locationString);
			//save our location in local storage
			dispatch({
				type: 'ON_UPDATE_LOCATION',
				payload: location
			})
		} catch(error){
			dispatch({
				type: 'ON_USER_ERROR',
				payload: error
			})
		}
	}
}

export const onUpdateCart = (item: Product) => {

	
	return async ( dispatch: Dispatch<UserAction> ) => {

		dispatch({
			type: 'ON_UPDATE_CART',
			payload: item
		})

	}
}

export const onUserLogin = (email: string, password: string) => {

	
	return async ( dispatch: Dispatch<UserAction> ) => {

		try{
			const response = await axios.post<UserModel>(`${BASE_URL}user/login?email=${email}&password=${password}`);

			if(!response){
				dispatch({
					type: 'ON_USER_ERROR',
					payload: 'User Login Error'
				});
			}else{
				dispatch({
					type: 'ON_USER_LOGIN',
					payload: response.data
				})
			}
		} catch(error){
			dispatch({
				type: 'ON_USER_ERROR',
				payload: error
			})
		}
	}
}

export const onUserSignup = (email: string, phone: string, password: string) => {

	
	return async ( dispatch: Dispatch<UserAction> ) => {

		try{
			const response = await axios.post<UserModel>(`${BASE_URL}user/signup?email=${email}&phone=${phone}&password=${password}`);

			if(!response){
				dispatch({
					type: 'ON_USER_ERROR',
					payload: 'User Login Error'
				});
			}else{
				dispatch({
					type: 'ON_USER_LOGIN',
					payload: response.data
				})
			}
		} catch(error){
			dispatch({
				type: 'ON_USER_ERROR',
				payload: error
			})
		}
	}
}


export const onVerifyOTP = (otp: string, user: UserModel) => {

	
	return async ( dispatch: Dispatch<UserAction> ) => {

		try{

			axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

			const response = await axios.patch<UserModel>(`${BASE_URL}user/verify`, { otp });

			console.log(response);

			if(!response){
				dispatch({
					type: 'ON_USER_ERROR',
					payload: 'User Login Error'
				});
			}else{
				dispatch({
					type: 'ON_USER_LOGIN',
					payload: response.data
				})
			}
		} catch(error){
			dispatch({
				type: 'ON_USER_ERROR',
				payload: error
			})
		}
	}
}

export const onOTPrequest = (user: UserModel) => {

	
	return async ( dispatch: Dispatch<UserAction> ) => {

		try{

			axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

			const response = await axios.get<UserModel>(`${BASE_URL}user/verify`);

			console.log(response);

			if(!response){
				dispatch({
					type: 'ON_USER_ERROR',
					payload: 'User Login Error'
				});
			}else{
				dispatch({
					type: 'ON_USER_LOGIN',
					payload: response.data
				})
			}
		} catch(error){
			dispatch({
				type: 'ON_USER_ERROR',
				payload: error
			})
		}
	}
}