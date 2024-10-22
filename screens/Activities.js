import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import ItemList from '../components/ItemList'
import { ItemsContext } from '../components/ItemsContext'
import Styles, { commonStyles } from '../components/Styles'
import { ThemeContext } from '../components/ThemeContext'

export default function Activities({}) {
  const { items } = useContext(ItemsContext)
  const { theme } = useContext(ThemeContext)

  return (
    <View style={theme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer}>
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