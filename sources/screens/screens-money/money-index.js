import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Zinsber from './zins';
import Ratenber from './raten';
import Zufall from './numbers'
import Umrechner from './unit-screen'
import {MaterialCommunityIcons} from '@expo/vector-icons';


const MoneyNav = createBottomTabNavigator ({
  Umrechner: {
    screen: Umrechner,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialCommunityIcons name="graphql" size={26} color={tintColor} />
      },
    },
  },
  Zinsen: {
    screen: Zinsber,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialCommunityIcons name="percent" size={26} color={tintColor} />
      },
    },
  },
  Raten: {
    screen: Ratenber,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialCommunityIcons name="all-inclusive" size={26} color={tintColor} />
      },
    },
  },
  Zufall: {
    screen: Zufall,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialCommunityIcons name="dice-5" size={26} color={tintColor} />
      },
    },
  },
})

export default MoneyNav;