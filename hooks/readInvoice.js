import { axios } from "axios"

export const decodeInvoice = async (invoice) => {
  console.log(invoice)
    try {
    const response = await fetch(`https://legend.lnbits.com/lndhub/ext/decodeinvoice?invoice=${invoice}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await response.json()
    console.log(data)
    return data
    
  } catch (error) {
    console.error(error);
  }
}