import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React,  { useContext, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ItemsContext } from '../components/ItemsContext'
import Styles, { commonStyles } from '../components/Styles'
import { ThemeContext } from '../components/ThemeContext'

export default function AddDiet({navigation}) {
  const {theme} = useContext(ThemeContext)
  const {addDiet} = useContext(ItemsContext)
  const [description, setDescription] = useState('')
  const [calories, setCalories] = useState('')
  const [date, setDate] = useState(null)
  const [showPicker, setShowPicker] = useState(false)

  function onSave() {
    if (!description || calories.trim() === '' || !date) {
      Alert.alert('Error', 'Please enter all fields')
      return
    }

    if (isNaN(parseInt(calories, 10)) || calories <= 0) {
      Alert.alert('Error', 'Please enter a valid number for calories')
      return
    }

    const newDiet = {
      id: Date.now().toString(),
      description: description,
      date: date.toDateString(),
      calories: calories,
      isSpecial: calories > 800,
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
    <View style={theme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer}>
      <View style={commonStyles.subContaniner}>
        <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>Description *</Text>
        <TextInput
          style={commonStyles.descriptionInput}
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={commonStyles.subContaniner}>
        <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>Calories *</Text>
        <TextInput
          style={commonStyles.input}
          value={calories}
          onChangeText={setCalories}
        />
      </View>

      <View style={commonStyles.subContaniner}>
        <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>Date *</Text>
        <TextInput
        style={commonStyles.input}
        value={date ? date.toDateString() : ''}
        onFocus={showDatePicker}
        placeholder='Select a date'
        />
        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="inline"
            onChange={onDateChange}
          />
        )}
      </View>
      
      <View style={commonStyles.buttonContainer}>
        <Button title="Save" onPress={onSave} />
        <Button title="Cancel" color={'red'} onPress={onCancel} />
      </View>
    </View>
  )
}