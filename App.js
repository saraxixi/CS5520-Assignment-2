import { StatusBar } from 'expo-status-bar';
import { Alert, View } from 'react-native';
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
import AddEditActivity from './screens/AddEditActivity';
import AddEditDiet from './screens/AddEditDiet';
import { ItemsProvider } from './components/ItemsContext';
import { ThemeProvider } from './components/ThemeContext';
import Styles, { commonHeaderStyles, commonBottomTabStyles, commonStyles } from './components/Styles';
import PressableButton from './components/PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { database } from './firebase/FirebaseSetup';
import { deleteFromDB } from './firebase/FirebaseHelper';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {

  function handleDelete(id, collectionName, navigation) {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
      { text: 'No' },
      { text: 'Yes', 
        onPress: () => {
          deleteFromDB(id, collectionName);
          navigation.goBack();
        }
      }
    ]);

  }
  // Stack Navigator for Activities
  function ActivitiesStack() {
    return (
      <Stack.Navigator screenOptions={commonHeaderStyles}>
        <Stack.Screen
          name="Activities"
          component={Activities}
          options={({ navigation }) => ({
            headerRight: () => (
              <PressableButton
                pressedFunction={() => navigation.navigate('AddEditActivity')}
              >
              <View style={commonStyles.headerButtonContainer}>
                <AntDesign name="plus" size={24} color="white" />
                <FontAwesome5 name="running" size={24} color={"white"} />
              </View>
              </PressableButton>
            ),
          })}
        />
        {/* Add / Edit Activity Screen */}
        <Stack.Screen
          name="AddEditActivity"
          component={AddEditActivity}
          options={({ route, navigation }) => ({
            title: route.params?.activity ? 'Edit Activity' : 'Add Activity', // Conditional title
            headerRight: () =>
              route.params?.activity && ( // Only show delete button for editing
                <PressableButton
                  pressedFunction={() =>
                    handleDelete(route.params.activity.id, 'activities', navigation)
                  }
                >
                  <View style={commonStyles.headerButtonContainer}>
                    <AntDesign name="delete" size={24} color="white" />
                  </View>
                </PressableButton>
              ),
          })}
        />
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
              <PressableButton
                pressedFunction={() => navigation.navigate('AddEditDiet')}
              >
              <View style={commonStyles.headerButtonContainer}>
                <AntDesign name="plus" size={24} color="white" />
                <MaterialIcons name="fastfood" size={24} color="white" />
              </View>
              </PressableButton>
            ),
          })}
        />
        {/* Add / Edit Diet Screen */}
        <Stack.Screen
          name="AddEditDiet"
          component={AddEditDiet}
          options={({ route, navigation }) => ({
            title: route.params?.diets ? 'Edit Diet' : 'Add Diet', // Conditional title
            headerRight: () =>
              route.params?.diets && ( // Only show delete button for editing
                <PressableButton
                  pressedFunction={() =>
                    handleDelete(route.params.diets.id, 'diets', navigation)
                  }
                >
                  <View style={commonStyles.headerButtonContainer}>
                    <AntDesign name="delete" size={24} color="white" />
                  </View>
                </PressableButton>
              ),
          })}
        />
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
