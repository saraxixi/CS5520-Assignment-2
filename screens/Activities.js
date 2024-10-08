import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import ItemList from '../components/ItemList'
import { ItemsContext } from '../components/ItemsContext'

export default function Activities({}) {
  const { items } = useContext(ItemsContext)

  return (
    <View>
      {items.activities.length > 0 ? (
        <FlatList
          data={items.activities}
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

const styles = StyleSheet.create({})