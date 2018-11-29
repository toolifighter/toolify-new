import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {FontAwesome, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Velocity from './velocity-screen';
import Distance from './distance-screen';
import Mass from './mass-screen';
import Other from './other-screen';

const UnitsNav = createBottomTabNavigator ({
	Geschwindigkeit: {
		screen: Velocity,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => {
				return <MaterialCommunityIcons name="speedometer" size={26} color={tintColor} />
			},
		},
	},
	Weg: {
		screen: Distance,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => {
				return <FontAwesome name="arrows-h" size={26} color={tintColor} />
			},
		},
	},
	Masse: {
		screen: Mass,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => {
				return <MaterialCommunityIcons name="arrow-collapse-down" size={26} color={tintColor} />
			},
		},
	},
	Weiteres: {
		screen: Other,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => {
				return <Entypo name="dots-two-horizontal" size={26} color={tintColor} />
			},
		},
	},
});

export default UnitsNav;