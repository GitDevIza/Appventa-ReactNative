import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'

interface ButtonAddRemoveProps{
	onAdd: Function;
	unit: number;
	onRemove: Function;
}

const ButtonAddRemove: React.FC<ButtonAddRemoveProps> = ({onAdd, unit, onRemove}) => {
	
	if(unit > 0){
		return(
			<View style={styles.optionView}>
				<TouchableOpacity style={styles.btnPlusMinus} onPress={() => onAdd()}>
					<Text style={styles.textAdd}>+</Text>
				</TouchableOpacity>
				<View styles={styles.viewMount}>
					<Text style={styles.textMount}>{unit}</Text>
				</View>
				<TouchableOpacity style={styles.btnPlusMinus} onPress={() => onRemove()}>
						<Text style={styles.textAdd}>-</Text>
				</TouchableOpacity>
			</View>
		)
	}else{
		return (
			<TouchableOpacity style={styles.btn} onPress={() => onAdd()}>
				<Text style={styles.textAddInit}>Add</Text>
			</TouchableOpacity>
		)
	}
	

}

const styles = StyleSheet.create({
	btn: {
		display:'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
		height: 40,
		alignSelf: 'center',
		borderRadius: 30,
		backgroundColor: '#f15b5b'
	},
	btnPlusMinus: {
		display:'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius:5,
		borderWidth: 0.5,
		height: 30,
		width: 30,
		color: '#f15b5b'
	},
	viewMount: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
	},
	optionView:{
		flex: 1,
		display:'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems:'center'
	},
	textAdd: {
		fontSize: 18,
		color: '#f15b5b'
	},
	textAddInit: {
		fontSize: 16,
		color: '#FFF'
	},
	textMount:{
		fontSize: 25,
		fontWeight: '600',
		textAlign: 'center',
		color: '#f15b5b',
		paddingLeft: 10,
		paddingRight: 10

	}
})

export { ButtonAddRemove }