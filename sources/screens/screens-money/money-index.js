import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Zinsber from './zins';
import {MaterialCommunityIcons} from '@expo/vector-icons';


const MoneyNav = createBottomTabNavigator ({
  Zinsen: {
    screen: Zinsber,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <MaterialCommunityIcons name="percent" size={26} color={tintColor} />
      },
    },
  },
})

export default MoneyNav;