import axios from 'axios'
import { getValueFor } from "./getKeys"

export const generateInvoice = async (invoiceAmount, invoiceMemo) => {
  try {
    console.log("generating invoice")
    const apiKey = await getValueFor("apiKey")
    const response = await axios.post(
      "https://legend.lnbits.com/api/v1/payments", 
    {
        out: false,
        amount: invoiceAmount,
        memo: invoiceMemo,
    }, 
    {
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json"
      },
    }
    )
    const data = await response.data
    console.log(data)
    const invoiceHash = data.payment_request
    return invoiceHash
  } catch (error) {
    console.error(error)
  }
}