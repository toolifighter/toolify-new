import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Measure from './measure';
import Measure2 from './measure2';
import {FontAwesome} from '@expo/vector-icons';

const MeasureNav = createBottomTabNavigator ({
  Höhe: {
    screen: Measure,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <FontAwesome name="arrows-v" size={26} color={tintColor} />
      },
    },
  },
  Distanz: {
    screen: Measure2,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <FontAwesome name="arrows-h" size={26} color={tintColor} />
      },
    },
  },
})

export default MeasureNav;