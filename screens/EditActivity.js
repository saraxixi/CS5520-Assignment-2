import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function EditActivity({ route, navigation }) {
  const { item } = route.params;
  
  return (
    <View style={styles.container}>
      <Text>Editing: {item.itemName}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Duration: {item.duration} min</Text>
      <Button title="Save Changes" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({})