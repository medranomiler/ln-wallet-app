import axios from 'axios';
import { getValueFor } from "./getKeys"

export const getHistory = async () => {
    console.log("getting transactions")
    try {
        const adminKey = await getValueFor("adminKey")
        const res = await axios.get('https://legend.lnbits.com/api/v1/payments', {
            headers: {
                'X-Api-Key': adminKey,
                'Content-Type': 'application/json'
            }
        })
        const data = await res.data
        const transactionData = data.length > 1 && data.sort((a, b) => new Date(b.time) - new Date(a.time)).map(transaction => ({
            id: transaction.checking_id,
            memo: transaction.memo,
            time: new Date(transaction.time * 1000).toLocaleDateString(),
            amount: transaction.amount* 0.001,
            type: transaction.amount < 0 ? "out" : "in"
        }))

        return transactionData

    } catch (error) {
        console.error(error)
    }
}

