// Zinsrechner dazu gepsckt

import React from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import BodyNav from './sources/screens/screens-body/body-index';
import MeasureNav from './sources/screens/screens-measure/measure-index';
import MoneyNav from './sources/screens/screens-money/money-index';
import {Entypo, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import UnitsNav from "./sources/screens/screens-units/units-index";

export default class App extends React.Component {
	render() {
		return (<AppDrawerNavigator/>)
	}
}

const CustomAppDrawer = (props) => (
	<SafeAreaView style={{flex: 1}}>
		<View style={{height: 150, alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
			<Image source={require('./assets/icon.png')} style={{height: 120, width: 120}}/>
		</View>
		<ScrollView>
			<DrawerItems {...props} />
		</ScrollView>
	</SafeAreaView>);

const AppDrawerNavigator = createDrawerNavigator({
	'Körper ': {
		screen: BodyNav, navigationOptions: {
			drawerIcon: ({tintColor}) => {
				return <MaterialIcons name="accessibility" size={22} color={tintColor}/>
			}
		}
	}, "Einheiten    ": {
		screen: UnitsNav, navigationOptions: {
			drawerIcon: ({tintColor}) => {
				return <MaterialIcons name="compare-arrows" size={22} color={tintColor}/>
			}
		}
	}, 'Messen ': {
		screen: MeasureNav, navigationOptions: {
			drawerIcon: ({tintColor}) => {
				return <Entypo name="ruler" size={22} color={tintColor}/>
			}
		}
	}, 'Geld ': {
		screen: MoneyNav, navigationOptions: {
			drawerIcon: ({tintColor}) => {
				return <MaterialIcons name="attach-money" size={22} color={tintColor}/>
			},
		}
	},
}, {
	contentComponent: CustomAppDrawer
})