import axios from "axios"

export const getHashrate = async () => {
    try{
        console.log("getting hashrate")
        const response = await axios.get("https://mempool.space/api/v1/mining/hashrate/3d")
        const data = await response.data
        const currentHashrate = data.currentHashrate
        const currentHashrateExahash = (currentHashrate / 10 ** 18).toLocaleString(undefined, { maximumFractionDigits: 2 })
        return currentHashrateExahash
    }catch(error){
        console.error(error)
        return { error: "Unable to get current hashrate" }
    }
}

