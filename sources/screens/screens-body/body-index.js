import {createBottomTabNavigator} from 'react-navigation';
import BMI from './bmi-screen'
import Calories from './calories-screen';
import { MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons';
import React from 'react';
import BodyFat from './bodyfat-screen';

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
  Körperfettant: {
    screen: BodyFat,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialCommunityIcons name="percent" size={26} color={tintColor} />
      },
    },
  },
})

export default BodyBottomTabNavigator;