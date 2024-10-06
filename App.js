import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import Settings from './screens/Settings';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Activities" 
          component={Activities} 
          options={{
            tabBarLabel: 'Activities',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="running" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Diet" 
          component={Diet}
          options={{
            tabBarLabel: 'Diet',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="fastfood" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings" 
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
