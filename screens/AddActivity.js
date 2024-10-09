import { Alert, StyleSheet, Text, TextInput, View, Button} from 'react-native'
import React, { useState, useContext }from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ItemsContext } from '../components/ItemsContext'
import { commonStyles } from '../components/Styles'

export default function AddActivity({navigation}) {
  const { addActivity } = useContext(ItemsContext)

  const [activity, setActivity] = useState(null)
  const [duration, setDuration] = useState('')
  const [date, setDate] = useState(new Date())

  const [showPicker, setShowPicker] = useState(false)
  const [open, setOpen] = useState(false)
  const [items] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  function onSave () {
    if (! activity || duration.trim() === '' || ! date) {
      Alert.alert('Error', 'Please enter all fields')
      return
    }

    const durationValue = parseInt(duration, 10);
    if (isNaN(durationValue) || durationValue <= 0) {
      Alert.alert('Error', 'Please enter a valid number for duration')
      return
    };

    const isSpecial = (activity === 'Running' || activity === 'Weights') && durationValue > 60;

    const newActivity = {
      id: Date.now().toString(),
      itemName: activity,
      date: date.toDateString(),
      duration: durationValue,
      isSpecial
    };

    addActivity(newActivity);
    navigation.goBack();

    console.log(newActivity);
  };

  function onCancel () {
    navigation.goBack();
  };

  function showDatePicker () {
    setShowPicker(true);
  }

  function onDateChange (event, selectedDate) {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  }

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.activityContainer}>
        <Text style={commonStyles.label}>Activity *</Text>
        <DropDownPicker
          open={ open }
          value={ activity }
          items={ items }
          setOpen={setOpen}
          setValue={setActivity}
          placeholder="Select an activity"
          style={styles.dropDown}
        />
      </View>

      <View style={commonStyles.subContaniner}>
        <Text style={commonStyles.label}>Duration (min) *</Text>
        <TextInput
          style={commonStyles.input}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      </View>

      <View style={commonStyles.subContaniner}>
        <Text style={commonStyles.label}>Date *</Text>
        <TextInput
          style={commonStyles.input}
          value={date.toDateString()} // Correct method usage
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

      <View style={commonStyles.buttonContainer}>
        <Button title="Save" onPress={onSave} />
        <Button title="Cancel" onPress={onCancel} color="red" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dropDown: {
    backgroundColor: 'lightgray',
    marginBottom: 20,
    elevation: 3
  },
})