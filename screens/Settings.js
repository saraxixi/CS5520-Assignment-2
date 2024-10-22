import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useContext} from 'react'
import { ThemeContext } from '../components/ThemeContext'
import Styles, { commonStyles } from '../components/Styles'

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <View style={theme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer}>
      <View style={commonStyles.themeButtonContainer}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    </View>
  )
}