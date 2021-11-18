import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

import { HomeScreen } from './src/screens/HomeScreen';
import { LandingScreen } from './src/screens/LandingScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { RestaurantScreen } from './src/screens/RestaurantScreen';
import { FoodDetailScreen } from './src/screens/FoodDetailScreen';
import { CartScreen } from './src/screens/CartScreen';
import { LoginScreen } from './src/screens/LoginScreen'

import { Provider } from 'react-redux'
import { store } from './src/redux'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator} from 'react-navigation-tabs';

import { getToken } from './src/loaders/SendPhoneToken'

const switchNavigator = createSwitchNavigator({
  landingStack:{
  screen: createStackNavigator({
    Landing: LandingScreen,
    //search address screen
    },{
      defaultNavigationOptions: {
        headerShown: false
      }
    })
  },
  homeStack: createBottomTabNavigator({
    home: {
      screen: createStackNavigator({
        HomePage: HomeScreen,
        SearchPage: SearchScreen,
        RestaurantPage: RestaurantScreen,
        FoodDetailPage: FoodDetailScreen
      },{
        defaultNavigationOptions:{
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/home-color.png') : require('./src/images/home-gray.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
    // Home tab Icon
    Offer: {
      screen: createStackNavigator({
        OfferPage: HomeScreen
      },{
        defaultNavigationOptions:{
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/sale-color.png') : require('./src/images/sale-gray.png')  
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
    //Home tab Icon
    Cart: {
      screen: createStackNavigator({
        CartPage: CartScreen,
        LoginPage: LoginScreen,
      },{
        defaultNavigationOptions:{
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/buy-color.png') : require('./src/images/buy-gray.png');
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
    // Home tab Icon
    Account: {
      screen: createStackNavigator({
        LoginPage: LoginScreen
      },{
        defaultNavigationOptions:{
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/user-color.png') : require('./src/images/user-gray.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    }
  })
})

const AppNavigation = createAppContainer(switchNavigator);


export default class App extends React.Component {

  componentDidMount(){
    getToken()
  }

  render(){
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );

  }
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30.
  }
})