import { FlatList, Text, View } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import ItemList from '../components/ItemList'
import { commonStyles } from '../components/Styles'
import { ThemeContext } from '../components/ThemeContext'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../firebase/FirebaseSetup'
import PressableButton from '../components/PressableButton'

export default function Activities({ navigation }) {
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
            <PressableButton pressedFunction={() => navigation.navigate('EditActivity', {item})}>
            <ItemList itemName={item.itemName} date={item.date} value={item.duration} isSpecial={item.isSpecial} type={'Activity'}/>
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