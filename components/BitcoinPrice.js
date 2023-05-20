import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getBitcoinPrice } from "../hooks/getBitcoinPrice"

const BitcoinPrice = () => {
    const [ btcPrice, setBtcPrice ] = useState('')

    useEffect(() => {
        const useGetBitcoinPrice = async () => {
          const price = await getBitcoinPrice()
          console.log(price)
          setBtcPrice(price)
        }
        useGetBitcoinPrice()
      }, [])

  return (
    <View>
        <Text style={{    
        color: "#F2A900", 
        fontSize: 48, 
        fontWeight: "bold", 
        textAlign: "center"
    }}>
        $ {btcPrice.toLocaleString("en-US")}
        </Text>     
    </View>
  )
}

export default BitcoinPrice