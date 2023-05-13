import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { getBitcoinPrice } from "../hooks/getBitcoinPrice"
import { getBlocks } from "../hooks/getBlocks"
import { Stack } from "expo-router"

export default function Mempool() {

    const [ btcPrice, setBtcPrice ] = useState('')
    const [ blocks, setBlocks ] = useState([])

    useEffect(() => {
      const useGetBitcoinPrice = async () => {
        const price = await getBitcoinPrice()
        console.log(price)
        setBtcPrice(price)
      }
      useGetBitcoinPrice()
    }, [])

    useEffect(() => {
      const useGetBlocks = async () => {
        const sortedBlocks = await getBlocks()
        setBlocks(sortedBlocks)
      }
      useGetBlocks()
    }, [])
    
      return(
        <>
        <SafeAreaView style={{ backgroundColor: '#f8fafc' }}>
        <Stack.Screen
        options={{
          headerStyle: { 
            backgroundColor: '#f8fafc',
          },
          headerTitle: "",
        }}
      />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
          <View style={{flex: 1, alignItems: "center"}}>
            <Text style={{color: "black", fontSize: 36, fontWeight: "bold"}}>$ {btcPrice}</Text>
          </View>  
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}></ScrollView>        
            {blocks && blocks.map((block) => {  
              return(
                <View style={styles.block} key={block.nonce}>
                  <View style={{flexDirection: "column", alignItems: "center"}}>
                    <Text style={{marginVertical: 1, fontSize: 24, fontWeight: "bold", color: "white"}}>{block.height}</Text>
                  </View>
                  <Text style={{color: "white"}}>{block.size / 1000000} MB</Text>
                  <Text style={{color: "white"}}>{block.tx_count} transactions</Text>
                  <Text style={{color: "white"}}>{block.extras.totalFees} total fees</Text>
                </View>  

              )
            })}
          </ScrollView>
          </SafeAreaView>
          </>
      )
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
  },
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 'auto',
    width: 160,
    height: 160,
    padding: 10,
    fontFamily: 'System',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
    backgroundColor: "#6A5ACD",
  },
});
