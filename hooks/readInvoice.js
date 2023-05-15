import axios from "axios"

export const decodeInvoice = async (invoice) => {
    try {
    const response = await axios.get(`https://legend.lnbits.com/lndhub/ext/decodeinvoice?invoice=${invoice}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await response.data
    return data
  } catch (error) {
    console.error(error);
  }
}