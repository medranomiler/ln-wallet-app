import React from 'react'
import axios from "axios"

export const getIncomingTx = async () => {
    try {
        const response = await axios.get('https://mempool.space/api/v1/statistics/2h')
        const data = await response.data
        const objects = data
    
        // Calculate the sum of vbytes_per_second
        const sum = objects.reduce((accumulator, obj) => accumulator + obj.vbytes_per_second, 0)
    
        // Calculate the average
        const average = Math.floor(sum / objects.length)
    
        console.log('Average vbytes_per_second:', average)
        return average
        
      } catch (error) {
        console.error('Error:', error)
      }
    }


