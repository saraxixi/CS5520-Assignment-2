import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React,  { useContext, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ItemsContext } from '../components/ItemsContext'

export default function AddDiet({navigation}) {
  const {addDiet} = useContext(ItemsContext)
  const [description, setDescription] = useState('')
  const [calories, setCalories] = useState('')
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  function onSave() {
    if (!description || calories.trim() === '' || !date) {
      Alert.alert('Error', 'Please enter all fields')
      return
    }

    const newDiet = {
      id: Date.now().toString(),
      description: description,
      date: date.toDateString(),
      calories: calories,
    }

    addDiet(newDiet)
    navigation.goBack()

    console.log(newDiet)
  }

  function onCancel() {
    navigation.goBack()
  }

  function showDatePicker() {
    setShowPicker(true)
  }

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || date
    setShowPicker(false)
    setDate(currentDate)
  }

  return (
    <View style={styles.container}>
      <View style={styles.descriptionContaniner}>
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View>
        <Text style={styles.label}>Calories *</Text>
        <TextInput
          style={styles.input}
          value={calories}
          onChangeText={setCalories}
        />
      </View>

      <View>
        <Text style={styles.label}>Date *</Text>
        <TextInput
        style={styles.input}
        value={date.toDateString()}
        onFocus={showDatePicker}
        placeholder='Select a date'
        />
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="inline"
            onChange={onDateChange}
          />
        )}
      </View>

      <Button title="Save" onPress={onSave} />
      <Button title="Cancel" color={'red'} onPress={onCancel} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#c5c5f1',
  },

  descriptionContaniner: {
    flexDirection: 'column',
  },

  label: {
    marginBottom: 5,
  },

  input: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
  },

  descriptionInput: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    height: 150,
  }
})