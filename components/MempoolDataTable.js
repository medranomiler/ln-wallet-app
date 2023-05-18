import { View, Text, StyleSheet } from 'react-native'
import { getIncomingTx } from "../hooks/getIncomingTx"
import React, { useState, useEffect } from 'react'
import { getBlocks } from "../hooks/getBlocks"

const MempoolDataTable = () => {
    const [ blocksToHalving, setBlocksToHalving ] = useState('')
    const [ incomingTx, setIncomingTx ] = useState(0)

    useEffect(() => {
      const useGetBlocks = async () => {
        const sortedBlocks = await getBlocks()
        const currentBlock = sortedBlocks[0].height
        setBlocksToHalving(840000 - currentBlock)
      }
      useGetBlocks()
    }, [])

    useEffect(() => {
      const useGetIncomingTx = async () => {
        const avg = await getIncomingTx()       
        setIncomingTx(avg)
      }
      useGetIncomingTx()
    }, [])

  return (
    <View style={styles.dataTable}>
        <Text style={styles.dataHeading}>Blocks to Halving</Text>
        <Text style={styles.data}>{blocksToHalving}</Text>
        <Text style={styles.dataHeading}>Incoming Transactions</Text>
        <Text style={styles.data}>{incomingTx} vB/s</Text>
        
    </View>  
  )
}

export default MempoolDataTable

const styles = StyleSheet.create({
    dataTable: {
      alignSelf: 'center',
      width: 350,
      backgroundColor: '#e2e8f0',
      padding: 4,
      borderRadius: 10,
    //   top: -200
    },
    dataHeading: {
      color: "black", 
      fontSize: 30, 
      fontWeight: "bold", 
      textAlign: "center"
    },
    data: {
      color: "#F2A900", 
      fontSize: 24, 
      fontWeight: "bold", 
      textAlign: "center"
    }
  });
  