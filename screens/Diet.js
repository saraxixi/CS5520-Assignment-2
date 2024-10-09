import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import ItemList from '../components/ItemList'
import { ItemsContext } from '../components/ItemsContext'

export default function Diet() {
  const {items} = useContext(ItemsContext)

  return (
    <View>
      {items.diet.length > 0 ? (
        <FlatList
          data={items.diet}
          renderItem={({ item }) => (
            <ItemList itemName={item.description} date={item.date} value={item.calories} isSpecial={item.isSpecial} type={'Diet'}/>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  )
}