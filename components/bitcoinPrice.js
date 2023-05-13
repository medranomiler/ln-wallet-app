import { View, Text } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { getBitcoinPrice } from "../hooks/getBitcoinPrice"


export const BitcoinPrice = () => {

    const [ btcPrice, setBtcPrice ] = useState('100')

    useEffect(() => {
      const useGetBitcoinPrice = async () => {
        const price = await getBitcoinPrice()
        console.log(price)
        setBtcPrice(price)
      }
      useGetBitcoinPrice()
    }, [])
  

      return(
        <View>
        <Text style={{color: 'black', fontSize: 20}}>{btcPrice}</Text>
        </View>
      )
}