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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {

  // Stack Navigator for Activities
  function ActivitiesStack() {
    return (
      <Stack.Navigator>
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
      <Stack.Navigator>
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

  return (
    <ItemsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{headerShown: false}}>
          <Tab.Screen 
            name="ActivitiesTab" 
            component={ActivitiesStack} 
            options={{
              tabBarLabel: 'Activities',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="running" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="DietTab" 
            component={DietStack}
            options={{
              tabBarLabel: 'Diet',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="fastfood" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="SettingsTab" 
            component={Settings}
            options={() => ({
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color }) => (
                <SimpleLineIcons name="settings" size={24} color={color} />
              ),
              headerRight: () => (
                <Button title="Add" onPress={() => (console.log("onPress"))}/>
              ),
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ItemsProvider>

  );
}
