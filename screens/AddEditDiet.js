import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React,  { useContext, useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import Styles, { commonStyles } from '../components/Styles'
import { ThemeContext } from '../components/ThemeContext'
import { writeToDB, updateDB } from '../firebase/FirebaseHelper'
import PressableButton from '../components/PressableButton'
import Checkbox from 'expo-checkbox';

export default function AddEditDiet({ route, navigation}) {
  const {theme} = useContext(ThemeContext)

  const isEdit = route.params?.diets !== undefined

  const [description, setDescription] = useState(isEdit ? route.params.diets.description : null)
  const [calories, setCalories] = useState(isEdit ? route.params.diets.calories.toString() : '')
  const [date, setDate] = useState(isEdit ? new Date(route.params.diets.date) : null)
  const [isSpecialLocal, setIsSpecialLocal] = useState(isEdit ? route.params.diets.isSpecial : false)
  const [userChangedCheckbox, setUserChangedCheckbox] = useState(false);

  const [showPicker, setShowPicker] = useState(false)

  function onSave() {
    if (!description || calories.trim() === '' || !date) {
      Alert.alert('Invalid Input', 'Please check your input value') 
      return
    }

    if (isNaN(parseInt(calories, 10)) || calories <= 0) {
      Alert.alert('Invalid Input', 'Please check your input value') 
      return
    }

    const autoSpecial = calories > 800

    const newDiet = {
      id: isEdit ? route.params.diets.id : Date.now().toString(),
      description: description,
      date: date.toDateString(),
      calories: calories,
      isSpecial: userChangedCheckbox ? isSpecialLocal : autoSpecial,
    }

    if (isEdit) {
      Alert.alert('Important', 'Are you sure you want to save these changes?', [
        { text: 'No' },
        {
          text: 'Yes',
          onPress: () => ([
            updateDB(newDiet, newDiet.id, 'diets'),
            navigation.goBack()
          ])
        },]
      );
    } else {
      writeToDB(newDiet, 'diets');
      navigation.goBack();
    }
  }

  function onCancel() {
    navigation.goBack()
  }

  function showDatePicker() {
    if (!date) {
      setDate(new Date())
    }
    setShowPicker(prev => !prev)
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
          {isEdit && route.params.diets.isSpecial && (
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
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    marginTop: 200,
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