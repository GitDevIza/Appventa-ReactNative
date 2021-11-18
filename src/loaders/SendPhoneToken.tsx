import * as Notifications from "expo-notifications";
import * as Permissions from 'expo-permissions';


const getToken = async() => {
	const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

	console.log( status );

	if( status !== 'granted'){
		return;
	}

	const token = await Notifications.getExpoPushTokenAsync();

	console.log(token);

	return token;
}	

export { getToken }




