import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getBitcoinPrice } from "../hooks/getBitcoinPrice"
import { getBlocks } from "../hooks/getBlocks"

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

    function formatTimestamp(timestamp) {
      const secondsAgo = Math.floor((new Date() - timestamp * 1000) / 1000);
      if (secondsAgo < 60) {
        return `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;
      }
      const minutesAgo = Math.floor(secondsAgo / 60);
      if (minutesAgo < 60) {
        return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
      }
      const hoursAgo = Math.floor(minutesAgo / 60);
      if (hoursAgo < 24) {
        return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
      }
      const daysAgo = Math.floor(hoursAgo / 24);
      return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
    }
    
      return(
      <View style={{backgroundColor: '#f8fafc', height: "100%"}}>
            <Text style={styles.btcPrice}>$ {btcPrice}</Text>
            <Text style={styles.mempool}>mempool.space blocks</Text>    
          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer} horizontal={true}>         
            {blocks && blocks.map((block) => {  
              return(
                <View style={styles.block} key={block.nonce}>
                  <Text style={styles.blockHeight}>{block.height}</Text>
                  <Text style={styles.blocktext}>{block.size / 1000000} MB</Text>
                  <Text style={styles.blocktext}>{block.tx_count} transactions</Text>
                  <Text style={styles.blocktext}>{formatTimestamp(block.timestamp)}</Text>
                </View>  
              )
            })}
          </ScrollView>
        </View>
      )
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#f8fafc',
  },
  btcPrice: {
    color: "#F2A900", 
    fontSize: 48, 
    fontWeight: "bold", 
    textAlign: "center"
  },
  mempool: {
    color: "black", 
    fontSize: 48, 
    fontWeight: "bold", 
    textAlign: "center"
  },
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
    width: 180,
    height: 160,
    padding: 10,
    fontFamily: 'System',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
    backgroundColor: "#6A5ACD",
  },
  blocktext: {
    color: "white"
  },
  blockHeight: {
    marginVertical: 1, 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "white"
  }
});
