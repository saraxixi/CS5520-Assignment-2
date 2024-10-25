import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useContext} from 'react'
import { ThemeContext } from '../components/ThemeContext'
import Styles, { commonStyles } from '../components/Styles'
import PressableButton from '../components/PressableButton'

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <View style={theme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer}>
      <View style={commonStyles.themeButtonContainer}>
        <PressableButton
          pressedFunction={toggleTheme}
          componentStyles={{backgroundColor: '#3b3c7e', padding: 10}}>
          <Text style={commonStyles.buttonText}>Toggle Theme</Text>
        </PressableButton>
      {/* <Button title="Toggle Theme" onPress={toggleTheme} /> */}
      </View>
    </View>
  )
}