import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeNavigator} from './HomeNavigator';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={'HomeNavigator'} component={HomeNavigator} />
    </Drawer.Navigator>
  );
};
