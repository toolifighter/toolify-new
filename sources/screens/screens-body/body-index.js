import {createBottomTabNavigator} from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import React from 'react';
import BMI from './bmi-screen'
import Calories from './calories-screen';
import BodyFat from './bodyfat-screen';
import Promille from './promille';

const BodyBottomTabNavigator = createBottomTabNavigator ({
  Kalorien: {
    screen: Calories,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialIcons name="fitness-center" size={26} color={tintColor} />
      },
    },
  },
  BMI: {
    screen: BMI,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialIcons name="accessibility" size={26} color={tintColor} />
      },
    },
  },
  Körperfettanteil: {
    screen: BodyFat,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialCommunityIcons name="percent" size={26} color={tintColor} />
      },
    },
  },
  Promille: {
      screen: Promille,
	  navigationOptions: {
		  tabBarIcon: ({tintColor}) => {
			  return <Entypo name="drink" size={26} color={tintColor}/>
		  },
	  },
  },
});

export default BodyBottomTabNavigator;