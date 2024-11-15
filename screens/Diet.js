import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import ItemList from '../components/ItemList'
import { ItemsContext } from '../components/ItemsContext'
import Styles, { commonStyles } from '../components/Styles'
import { ThemeContext } from '../components/ThemeContext'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../firebase/FirebaseSetup'
import PressableButton from '../components/PressableButton'

export default function Diet({ navigation }) {
  const [diets, setDiets] = useState([])
  const {theme} = useContext(ThemeContext)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'diets'), (snapshot) => {
      let newAarry = [];
      snapshot.forEach((docSnapshot) => {
        newAarry.push({...docSnapshot.data(), id: docSnapshot.id});
      });
      console.log(newAarry);
      setDiets(newAarry);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={theme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer}>
      {diets.length > 0 ? (
        <FlatList
          data={diets}
          renderItem={({ item }) => (
            <PressableButton
              pressedFunction={() => navigation.navigate('AddEditDiet', { diets: item })}
            >
            <ItemList itemName={item.description} date={item.date} value={item.calories} isSpecial={item.isSpecial} type={'Diet'}/>
            </PressableButton>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  )
}