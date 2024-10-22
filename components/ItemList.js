import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Styles, { commonStyles } from '../components/Styles'

export default function ItemList({itemName, date, value, isSpecial, type}) {
  const valueLabel = type === 'Activity' ? 'min' : '';

  return (
    <View style={commonStyles.itemListContainer}>
      <Text style={commonStyles.itemText}>{itemName}</Text>
      <View style={commonStyles.itemDetailsContainer}>
        <View style={commonStyles.icon}>
          {isSpecial ? <Ionicons name="warning" size={24} color="#FFC300" /> : null}
        </View>
        <Text style={commonStyles.itemDate}>{date}</Text>
        <Text style={commonStyles.itemValue}>{`${value} ${valueLabel}`}</Text>
      </View>
    </View>
  )
}