import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getBlocks } from "../hooks/getBlocks"

const Blocks = () => {
    const [blocks, setBlocks] = useState([])
    const [blocksToHalving, setBlocksToHalving] = useState('')

    useEffect(() => {
        const useGetBlocks = async () => {
            const sortedBlocks = await getBlocks()
            const currentBlock = sortedBlocks[0].height
            setBlocksToHalving(840000 - currentBlock)
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

    return (
        <>
        <View style={{height: 260, padding: 10, backgroundColor: "#e2e8f0", marginVertical: 8, borderRadius: 10}}>
        <Text style={styles.mempool}>Recent Blocks</Text>
        <View style={{alignSelf: "center", width: "94%"}}>
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer} horizontal={true}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {blocks && blocks.map((block) => {
                    return (
                        <View style={styles.block} key={block.nonce}>
                            <Text style={styles.blockHeight}>{block.height}</Text>
                            <Text style={styles.blocktext}>~ {Math.floor(block.extras.medianFee)} sat/vB</Text>
                            <Text style={styles.blocktextSize}>{(block.size / 1000000).toFixed(2)} MB</Text>
                            <Text style={styles.blocktext}>{block.tx_count} transactions</Text>
                            <Text style={styles.blocktext}>{formatTimestamp(block.timestamp)}</Text>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
        </View>
        </View>
        </>
    )
}

export default Blocks

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#e2e8f0',
        borderBottomColor: "black",
    },
    mempool: {
        color: "black",
        fontSize: 36,
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
        color: "white",
        // fontWeight: "bold",
    },
    blocktextSize: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    blockHeight: {
        marginVertical: 1,
        fontSize: 26,
        fontWeight: "bold",
        color: "white"
    },
})