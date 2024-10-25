import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../components/Styles';
import { ThemeContext } from '../components/ThemeContext';
import { writeToDB, updateDB } from '../firebase/FirebaseHelper';
import PressableButton from '../components/PressableButton';

export default function AddEditActivity({ route, navigation }) {
  const { theme } = useContext(ThemeContext);

  // Determine if the screen is for editing by checking if an item is passed
  const isEdit = route.params?.activity !== undefined;

  // Initialize states with passed activity if editing, otherwise use default values
  const [activity, setActivity] = useState(isEdit ? route.params.activity.itemName : null);
  const [duration, setDuration] = useState(isEdit ? route.params.activity.duration.toString() : '');
  const [date, setDate] = useState(isEdit ? new Date(route.params.activity.date) : null);
  const [isSpecialLocal, setIsSpecialLocal] = useState(isEdit ? route.params.activity.isSpecial : false);
  const [userChangedCheckbox, setUserChangedCheckbox] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [items] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  function onSave() {
    if (!activity || duration.trim() === '' || !date) {
      Alert.alert('Invalid Input', 'Please check your input value');
      return;
    }

    const durationValue = parseInt(duration, 10);
    if (isNaN(durationValue) || durationValue <= 0) {
      Alert.alert('Invalid Input', 'Please check your input value');
      return;
    }

    const autoSpecial = (activity === 'Running' || activity === 'Weights') && durationValue > 60;

    const newActivity = {
      id: isEdit ? route.params.activity.id : Date.now().toString(),
      itemName: activity,
      date: date.toDateString(),
      duration: durationValue,
      isSpecial: userChangedCheckbox ? isSpecialLocal : autoSpecial,
    };

    if (isEdit) {
      Alert.alert('Important', 'Are you sure you want to save these changes?', [
        { text: 'No' },
        {
          text: 'Yes',
          onPress: () => ([
            updateDB(newActivity, newActivity.id, 'activities'),
            navigation.goBack()
          ])
        },]
      );
    } else {
      writeToDB(newActivity, 'activities');
      navigation.goBack();
    }
  }

  function onCancel() {
    navigation.goBack();
  }

  function showDatePicker() {
    if (!date) {
      setDate(new Date());
    }
    setShowPicker((prev) => !prev);
  }

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  }

  return (
    <View style={theme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer}>
      <View style={commonStyles.activityContainer}>
        <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>
          Activity *
        </Text>
        <DropDownPicker
          open={open}
          value={activity}
          items={items}
          setOpen={setOpen}
          setValue={setActivity}
          placeholder="Select an activity"
          style={styles.dropDown}
          dropDownContainerStyle={styles.dropDownContainer}
        />
      </View>

      <View style={commonStyles.subContaniner}>
        <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>
          Duration (min) *
        </Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      </View>

      <View style={commonStyles.subContaniner}>
        <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>
          Date *
        </Text>
        <TextInput
          style={commonStyles.input}
          value={date ? date.toDateString() : ''}
          onPress={showDatePicker}
          onBlur={() => setShowPicker(false)}
          placeholder="Select a date"
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
          {isEdit && route.params.activity.isSpecial && (
            <View style={styles.checkboxContainer}>
              <View style={styles.textContainer}>
                <Text style={theme === 'light' ? commonStyles.lightLabel : commonStyles.darkLabel}>
                  This item is special. Select the checkbox if you would like to approve it.
                </Text>
              </View>

              <View style={styles.checkbox}>
                <Checkbox 
                  value={!isSpecialLocal}
                  onValueChange={(value) => {
                    setIsSpecialLocal(!value)
                    setUserChangedCheckbox(true)
                  }} 
                />
              </View>
            </View>
          )}
        <View style={commonStyles.buttonContainer}>
          <PressableButton
            pressedFunction={onCancel}
            componentStyles={{ backgroundColor: 'red', paddingVertical: 8, paddingHorizontal: 60, borderRadius: 5 }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
          </PressableButton>

          <PressableButton
            pressedFunction={onSave}
            componentStyles={{ backgroundColor: 'blue', paddingVertical: 8, paddingHorizontal: 60, borderRadius: 5 }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Save</Text>
          </PressableButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    backgroundColor: 'lightgray',
    marginBottom: 20,
    elevation: 3,
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
});
