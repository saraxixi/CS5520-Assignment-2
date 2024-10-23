import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PressableButton({children, pressedFunction, componentStyles, pressedStyle}) {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({ pressed }) => {
        return [
        styles.defaultStyle,
        componentStyles,
        pressed && styles.defaultPressedStyle,
        pressed && pressedStyle
        ];
      }}
    >

    <View>{children}</View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 5,
    borderRadius: 5,
  },

  defaultPressedStyle: {
    opacity: 0.2,
  }
})