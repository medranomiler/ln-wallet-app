import React, { useState } from "react"
import axios from "axios"

export const getBitcoinPrice = async () => {
    
    try{
        const response = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot')
        const data = response.data
        const price = Math.floor(data.data.amount)
        return price 
    }catch(error){
        console.error(error)
        return { error: "Unable to get bitcoin price" }
    }
  
}
