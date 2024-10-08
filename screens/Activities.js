import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Item from '../components/Item'

export default function Activities({items}) {
  return (
    <View>
      <Item itemName="Running" date="12/12/2020" time="12:00" />
    </View>
  )
}

const styles = StyleSheet.create({})