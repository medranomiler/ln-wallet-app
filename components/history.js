import { View, Text, ScrollView, RefreshControl, StyleSheet  } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { getHistory } from "../hooks/getHistory"
import { useAuth } from "../context/auth"
import { Feather } from '@expo/vector-icons';



const History = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [ transactions, setTransactions ] = useState([])
    const { user } = useAuth()

    const onRefresh = useCallback(() => {
      setRefreshing(true)
      useGetHistory()
      setTimeout(() => {
        setRefreshing(false)
      }, 2000)
    }, [])

    const useGetHistory = async () => {
        const transactionData = await getHistory(user)
        setTimeout(() => {
          setTransactions(transactionData)
        }, 2000)   
        
    }

    useEffect(()=>{
        useGetHistory()
      }, [])


      
  return (
<View style={{marginHorizontal: 25}}>
      <View style={{flexDirection: 'row', backgroundColor: '#e2e8f0', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <Text style={styles.flex}></Text>
        <Text style={styles.flexThree}>Memo</Text>
        <Text style={styles.flexTwo}>Date</Text>
        <Text style={styles.flexTwo}>Sats</Text>
      </View>
          <View style={{height: 300}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#fff'}}
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {transactions && transactions.map(row => (
        <View key={row.id} style={{flexDirection: 'row', backgroundColor: '#fff'}}>
          <Text style={styles.flex}>
            {row.type == "in"? <Feather name="arrow-down-left" size={24} color="black" />: <Feather name="arrow-up-right" size={24} color="black" />}
          </Text>
          <Text style={styles.flexThree}>{row.memo}</Text>
          <Text style={styles.flexTwo}>{row.time}</Text>
          <Text style={styles.flexTwo}>{row.amount}</Text>
        </View>
      ))}
    </ScrollView>
    </View>
    </View>
  )
}

export default History


const styles = StyleSheet.create({
  flex: {
    padding: 10,
    flex: 1
  },
  flexTwo: {
    padding: 10, 
    flex: 2, 
    textAlign: "center"
  },
  flexThree: {
    padding: 10, 
    flex: 3, 
    textAlign: "center"
  },

})
