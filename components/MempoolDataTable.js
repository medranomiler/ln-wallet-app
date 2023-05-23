import { View, Text, StyleSheet } from 'react-native'
import { getIncomingTx } from "../hooks/getIncomingTx"
import { getBlocks } from "../hooks/getBlocks"
import { getHashrate } from "../hooks/getHashrate"
import React, { useState, useEffect } from 'react'

const MempoolDataTable = () => {
    const [ blocksToHalving, setBlocksToHalving ] = useState('')
    const [ incomingTx, setIncomingTx ] = useState(0)
    const [ hashrate, setHashrate ] = useState('')

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

    useEffect(() => {
      const useGetHashrate = async () => {
        console.log("getting the current hashrate for table")
        const currentHashrate = await getHashrate()       
        setHashrate(currentHashrate)
      }
      useGetHashrate()
    }, [])

  return (
    <View style={styles.dataTable}>
        <Text style={styles.dataHeading}>Current Hashrate</Text>
        <Text style={styles.data}>{hashrate} EH/s</Text>
        <Text style={styles.dataHeading}>Incoming Transactions</Text>
        <Text style={styles.data}>{incomingTx} vB/s</Text>
        <Text style={styles.dataHeading}>Blocks to Halving</Text>
        <Text style={styles.data}>{blocksToHalving}</Text>
    </View>  
  )
}

export default MempoolDataTable

const styles = StyleSheet.create({
    dataTable: {
      backgroundColor: '#e2e8f0',
      padding: 10,
      borderRadius: 10,
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
  