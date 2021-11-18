import { Address } from 'expo-location'

// category
export interface Category{
	_id: string,
	id: string,
	title: String,
	icon: String,
	background: string,
	__v: Number
}

// Food Model
export interface Product{
	_id: string;
	name: string;
	description: string;
	category: string;
	price: string;
	unit: string;
	offerts: [String];
	image: [string];
	quantity: Number;
	__v: Number
}

//Restaurant Model
export interface Restaurant{
	_id: string;
	name: string;
	foodType: string;
	address: string;
	phone: string;
	images: string;
	foods: [Product];
}

// Get Array
export interface FoodAvailability{
	categories: [Category];
	restaurants: [Restaurant];
	foods: [Product]
}

//todo: Modify later
//User Model
export interface UserModel{
	email: String,
	token: String,
	verified: boolean
}

export interface UserState{
	user: UserModel;
	location: Address;
	error: string | undefined;
	Cart: [Product]
}

export interface ShoppingState{
	availability: FoodAvailability;
	availableFoods: [Product]
	//other models
}
//