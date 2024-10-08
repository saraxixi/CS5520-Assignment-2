import { Alert, StyleSheet, Text, TextInput, View, Button} from 'react-native'
import React, { useState, useContext }from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ItemsContext } from '../components/ItemsContext'

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

  const onSave = () => {
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
      time: `${date.getHours()}:${date.getMinutes()}`,
      duration: durationValue,
      isSpecial
    };

    addActivity(newActivity);
    navigation.goBack();
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const showDatePicker = () => {
    setShowPicker(true);
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  }

  return (
    <View style={styles.container}>
      <Text>Activity *</Text>
      <DropDownPicker
        open={ open }
        value={ activity }
        items={ items }
        setOpen={setOpen}
        setValue={setActivity}
        placeholder="Select an activity"
        style={styles.dropDown}
      />
      <Text>Duration *</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <Text>Date *</Text>
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
          display="default"
          onChange={onDateChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={onSave} />
        <Button title="Cancel" onPress={onCancel} color="red" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c5c5f1',
  },
})