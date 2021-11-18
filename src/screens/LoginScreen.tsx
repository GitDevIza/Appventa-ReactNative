import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, onUserLogin, onUserSignup, UserState, onVerifyOTP, onOTPrequest } from '../redux'
import { TextField, ButtonWithTitle  } from '../components'
import { useNavigation } from '../utils';

interface loginScreenProps{
	onUserSignup: Function,
	onUserLogin: Function,
	userReducer: UserState,
	onVerifyOTP: Function,
	onOTPrequest: Function
}

const _LoginScreen: React.FC<loginScreenProps> = ({onUserLogin, onUserSignup, userReducer, onVerifyOTP, onOTPrequest}) => {

	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [title, setTitle] = useState('Login');
	const [isSignup, setSignup] = useState(false);

	const [otp, setOtp] = useState('')
	const [verified, setVerified] = useState(true)
	const [requestOptTitle, setRequestOptTitle] = useState('Request a new OTP in')
	const [canRequestOtp, setCanRequestOtp] = useState(false)

	let countDown: number;

	const { user } = userReducer;

	const { navigate } = useNavigation()

	useEffect(() => {

		if(user.verified !== undefined){
			if(user.verified === true){
				navigate('CartPage')
			}else{
				setVerified(user.verified);
				//check for start timer
				onEnableOtpRequest();
			}
		}



		return () => {
			clearInterval(countDown);
		}



	},[user])



	const onTapOption = () => {
		setSignup(!isSignup)
		setTitle(!isSignup? 'Signup' : 'Login')
	}

	const onTapAutenticate = () => {
		if(isSignup){
			onUserSignup(email, phone, password)
		}else{
			onUserLogin(email, password);
		}
	}

	const onEnableOtpRequest = (() => {
			const otpDate = new Date();
			otpDate.setTime(new Date().getTime() + (2 * 60 * 1000));
			const otpTime = otpDate.getTime()

			countDown = setInterval(function(){
				const currentTime = new Date().getTime();
				const totalTime = otpTime - currentTime;

				let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60))
				let seconds = Math.floor((totalTime % (1000 * 60 )) / 1000 )

				setRequestOptTitle(`Request a new OTP in ${minutes}:${seconds}`)

				if(minutes < 1 && seconds < 1){
					setRequestOptTitle(`Request a new OTP`);
					setCanRequestOtp(true);
					clearInterval(countDown);
				}


			}, 1000);
	})

	const onTapVerify = () => {
		onVerifyOTP(otp, user)
	}

	const onTapRequestNewOTP = () => {
		setCanRequestOtp(false)
		onOTPrequest(user)
	}

	if(!verified){
		//show OTP page
		return (
			<View style={styles.container}>
				<View style={styles.body}>
					<Image source={ require('../images/verify_otp.png')} style={{ height:150, width:150 }} ></Image>
					<Text>`Enter your OTP sent to your mobile number`</Text>
					<TextField style={{ alignItems: 'center', justifyContent: 'center'}} isOTP={true} placeholder='Enter OTP code' onTextChange={setOtp} />
					<ButtonWithTitle title={'verify OTP'} onTap={onTapVerify} width={340} height={50} />
					<ButtonWithTitle disable={!canRequestOtp} title={requestOptTitle} onTap={onTapRequestNewOTP} width={340} height={50} isNoBg={true} />

				</View>
			</View>
		)

	}else{
		//reload time new OTP
		return (
			<View style={styles.container}>
				<View style={styles.navigation}><Text style={{ fontSize: 25 }}>Login</Text></View>
				<View style={styles.body}>
					<TextField placeholder='Email' onTextChange={setEmail} />
					{isSignup && 
						<TextField placeholder='Phone number' onTextChange={setPhone} />
					}
					<TextField placeholder='Password' onTextChange={setPassword} isSecure={true} />
					<ButtonWithTitle title={title} onTap={onTapAutenticate} width={340} height={50} />
					<ButtonWithTitle title={!isSignup ? 'No Account? Signup Here' : 'Have an Account? Login Here'} onTap={onTapOption} width={340} height={50} isNoBg={true} />

				</View>
				<View style={styles.footer}><Text>Footer Content</Text></View>
			</View>
		)
	}


}

const styles = StyleSheet.create({
	container: { flex: 1},
	navigation: {flex: 2, paddingTop: 50, paddingLeft: 30},
	body: { flex: 10, justifyContent: 'center', alignItems: 'center'},
	footer: { flex: 1}
})

const mapToStateProps = (state: ApplicationState) => ({
	userReducer: state.userReducer
})

const LoginScreen = connect(mapToStateProps, {onUserSignup, onUserLogin, onVerifyOTP, onOTPrequest})(_LoginScreen)



export { LoginScreen }