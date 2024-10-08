import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Item({itemName, date, value, isSpecial, type}) {
  const valueLabel = type === 'Activity' ? 'min' : '';

  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>{itemName}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.icon}>
          {isSpecial ? <Ionicons name="warning" size={24} color="#FFC300" /> : null}
        </View>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.value}>{`${value} ${valueLabel}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#3b3c7e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10
  },

  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'white',
    // padding: 5,
    borderRadius: 5,
  },

  itemName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },

  date: {
    color: 'blue',
    backgroundColor: 'white',
    padding: 5,
    marginRight: 10,
  },

  value: {
    color: 'blue',
    backgroundColor: 'white',
    padding: 5,
  },

  icon: {
    marginRight: 10
  }
})