import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {FontAwesome, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Unit from './unit-screen';
import Other from './other-screen';

const UnitsNav = createBottomTabNavigator ({
	Umrechner: {
		screen: Unit,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => {
				return <MaterialCommunityIcons name="speedometer" size={26} color={tintColor} />
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