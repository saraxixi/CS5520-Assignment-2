import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import ItemList from '../components/ItemList'
import { ItemsContext } from '../components/ItemsContext'
import Styles, { commonStyles } from '../components/Styles'
import { ThemeContext } from '../components/ThemeContext'

export default function Diet() {
  const {items} = useContext(ItemsContext)
  const {theme} = useContext(ThemeContext)

  return (
    <View style={theme === 'light' ? commonStyles.lightContainer : commonStyles.darkContainer}>
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