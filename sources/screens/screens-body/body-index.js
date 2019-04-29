import { createBottomTabNavigator } from 'react-navigation';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import React from 'react';
import BMI from './bmi-screen'
import Calories from './calories-screen';
import BodyFat from './bodyfat-screen';

const BodyNav = createBottomTabNavigator({
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
        return <MaterialIcons name="cake" size={26} color={tintColor} />
      },
    },
  },
});

export default BodyNav;