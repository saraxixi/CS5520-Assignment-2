import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Item({itemName, date, time}) {
  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>{itemName}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.time}>{time}</Text>
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
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },

  itemName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },

  date: {
    color: 'blue',
  },

  time: {
    color: 'blue',
  }
})