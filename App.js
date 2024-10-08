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
import { ItemsProvider } from './components/ItemsContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
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
            component={Diet}
            options={() => ({
              tabBarLabel: 'Diet',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="fastfood" size={24} color={color} />
              ),
              headerRight: () => (
                <Button title="Add" onPress={() => (console.log("onPress"))}/>
              ),
            })}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
