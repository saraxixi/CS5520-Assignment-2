import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native'
import Checkbox from 'expo-checkbox';
import React, {useState, useContext} from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { commonStyles } from '../components/Styles'
import { ThemeContext } from '../components/ThemeContext'
import { updateDB } from '../firebase/FirebaseHelper'
import PressableButton from '../components/PressableButton'

export default function EditActivity({ route, navigation }) {
  const { item } = route.params;
  const { theme } = useContext(ThemeContext)

  const [activity, setActivity] = useState(item.itemName)
  const [duration, setDuration] = useState(item.duration.toString())
  const [date, setDate] = useState(new Date(item.date))
  const [isSpecialLocal, setIsSpecialLocal] = useState(item.isSpecial)

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
      Alert.alert('Invalid Input', 'Please check your input value') 
      return
    }

    const durationValue = parseInt(duration, 10);
    if (isNaN(durationValue) || durationValue <= 0) {
      Alert.alert('Invalid Input', 'Please check your input value') 
      return
    };

    const isSpecial = (activity === 'Running' || activity === 'Weights') && durationValue > 60;

    const newActivity = {
      id: Date.now().toString(),
      itemName: activity,
      date: date.toDateString(),
      duration: durationValue,
      isSpecial: isSpecialLocal,
    };

    Alert.alert('Important', 'Are you sure you want to save these change?', [
      { text: 'No' },
      { text: 'Yes', 
        onPress: () => {
          updateDB(newActivity, item.id, 'activities');
          navigation.goBack();
        }
      }
    ]);
  };

  function onCancel () {
    navigation.goBack();
  };

  function showDatePicker () {
    if (!date) {
      setDate(new Date());
    }
    setShowPicker(prev => !prev);
  }

  function onDateChange (event, selectedDate) {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  }

  return (
    <View style={theme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer}>
      <View style={commonStyles.activityContainer}>
        <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>Activity *</Text>
        <DropDownPicker
          open={ open }
          value={ activity }
          items={ items }
          setOpen={setOpen}
          setValue={setActivity}
          placeholder="Select an activity"
          style={styles.dropDown}
          dropDownContainerStyle={styles.dropDownContainer}
        />
      </View>

      <View style={commonStyles.subContaniner}>
        <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>Duration (min) *</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      </View>

      <View style={commonStyles.subContaniner}>
        <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>Date *</Text>
        <TextInput
          style={commonStyles.input}
          value={date ? date.toDateString() : ''}
          onPress={showDatePicker}
          onBlur={() => setShowPicker(false)}
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

      <View style={styles.bottomContainer}>
          {item.isSpecial && (
            <View style={styles.checkboxContainer}>
              <View style={styles.textContainer}>
              <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>
                This item is special. Select the checkbox if you would like to approve it.
              </Text>
              </View>

              <View style={styles.checkbox}>
                <Checkbox value={!isSpecialLocal} onValueChange={(value) => setIsSpecialLocal(!value)} />
              </View>
            </View>
          )}
        <View style={commonStyles.buttonContainer}>
          {/* <Button title="Save" onPress={onSave} />
          <Button title="Cancel" onPress={onCancel} color="red" /> */}
        </View>
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

  dropDownContainer: {
    backgroundColor: '#fff',
    borderColor: '#3b3c7e',
  },

  input: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
  },

  bottomContainer: {
    marginTop: 250,
  },

  textContainer: {
    flex: 1,
  },

  checkboxContainer: {
    flexDirection: 'row',
  },

  checkbox: {
    marginRight: 10,
  },

  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  },
})