import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext }from 'react'

export default function AddActivities() {
  const { addActivity } = useContext(ActivityContext)

  const [activity, setActivity] = useState(null)
  const [duration, setDuration] = useState('')
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [items] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  const OnSave = () => {
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

  const OnCancel = () => {
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
    </View>
  )
}

const styles = StyleSheet.create({})