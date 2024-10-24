import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import Settings from './screens/Settings';
import AddActivity from './screens/AddActivity';
import AddDiet from './screens/AddDiet';
import { ItemsProvider } from './components/ItemsContext';
import { ThemeProvider } from './components/ThemeContext';
import Styles, { commonHeaderStyles, commonBottomTabStyles } from './components/Styles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {

  // Stack Navigator for Activities
  function ActivitiesStack() {
    return (
      <Stack.Navigator screenOptions={commonHeaderStyles}>
        <Stack.Screen
          name="Activities"
          component={Activities}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Add"
                onPress={() => navigation.navigate('AddActivity')}
              />
            ),
          })}
        />
        <Stack.Screen 
          name="AddActivity"
          component={AddActivity}
          options={{ title: 'Add An Activity' }} />
      </Stack.Navigator>
    );
  }

  // Stack Navigator for Diet
  function DietStack() {
    return (
      <Stack.Navigator screenOptions={commonHeaderStyles}>
        <Stack.Screen
          name="Diet"
          component={Diet}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Add"
                onPress={() => navigation.navigate('AddDiet')}
              />
            ),
          })}
        />
        <Stack.Screen 
          name="AddDiet"
          component={AddDiet}
          options={{ title: 'Add A Diet' }} />
      </Stack.Navigator>
    );
  }

  function SettingsStack() {
    return (
      <Stack.Navigator screenOptions={commonHeaderStyles}>
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <ThemeProvider>
    <ItemsProvider>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          ...commonBottomTabStyles,
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'ActivitiesTab') {
              return <FontAwesome5 name="running" size={size} color={color} />;
            } else if (route.name === 'DietTab') {
              return <MaterialIcons name="fastfood" size={size} color={color} />;
            } else if (route.name === 'SettingsTab') {
              return <SimpleLineIcons name="settings" size={size} color={color} />;
            }
          },
        })}
      >
          <Tab.Screen 
            name="ActivitiesTab" 
            component={ActivitiesStack} 
            options={{
              tabBarLabel: 'Activities',
            }}
          />
          <Tab.Screen
            name="DietTab" 
            component={DietStack}
            options={{
              tabBarLabel: 'Diet',
            }}
          />
          <Tab.Screen
            name="SettingsTab" 
            component={SettingsStack}
            options={{
              tabBarLabel: 'Settings',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ItemsProvider>
    </ThemeProvider>

  );
}
