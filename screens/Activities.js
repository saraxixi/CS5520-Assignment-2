import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import ItemList from '../components/ItemList'
import { ItemsContext } from '../components/ItemsContext'
import { commonStyles } from '../components/Styles'
import { ThemeContext } from '../components/ThemeContext'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../firebase/FirebaseSetup'

export default function Activities({}) {
  // const { items } = useContext(ItemsContext)
  const [activities, setActivities] = useState([]);
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'activities'), (snapshot) => {
      let newAarry = [];
      snapshot.forEach((docSnapshot) => {
        newAarry.push({...docSnapshot.data(), id: docSnapshot.id});
      });
      setActivities(newAarry);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={theme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer}>
      {activities.length > 0 ? (
        <FlatList
          data={activities}
          renderItem={({ item }) => (
            <ItemList itemName={item.itemName} date={item.date} value={item.duration} isSpecial={item.isSpecial} type={'Activity'}/>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  )
}