import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'

interface textFieldProps{
	placeholder: string;
	isSecure?: boolean;
	onTextChange: Function;
	isOTP?: boolean;
}


const TextField: React.FC<textFieldProps> = ({placeholder, isSecure = false, onTextChange, isOTP = false}) => {

	if(isOTP){
		return (
			<View style={styles.container}>
				<TextInput
				placeholder={placeholder}
				maxLength={6}
				autoCapitalize="none"
				secureTextEntry={true}
				onChangeText={(text) => { onTextChange(text)}}
				style={styles.otpTextField}
				 />
			</View>
		)
	}else{
		return (
			<View style={styles.container}>
				<TextInput
				placeholder={placeholder}
				autoCapitalize="none"
				secureTextEntry={isSecure}
				onChangeText={(text) => { onTextChange(text)}}
				style={styles.textField}
				 />
			</View>
		)
	}


}

const styles = StyleSheet.create({
	container: { 
		width: 340,
		backgroundColor: '#DBDBDB',
		height: 50,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		marginLeft: 30,
		marginRight: 30,
		paddingRight: 10,
		paddingLeft: 20
	},

	navigation: {flex: 2, backgroundColor: 'red'},
	body: { flex: 10, justifyContent: 'center', alignItems: 'center'},
	footer: { flex: 1},
	textField:{
		flex: 1,
		width: 320,
		height: 50,
		fontSize: 18,
		color: '#000'
	},
	otpTextField:{
		flex: 1,
		width: 320,
		height: 50,
		fontSize: 18,
		color: '#000',
		textAlign: 'center'
	}
})

export {TextField}