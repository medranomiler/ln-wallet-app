import axios from "axios"

export const getBlocks = async () => {
    try{
        const response = await axios.get('https://mempool.space/api/v1/blocks')
        const sortedBlocks = response.data.sort()
        return sortedBlocks
    }catch(error){
        console.error(error)
        return { error: "Unable to get mempool blocks" }
    }
}

