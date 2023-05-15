import axios from 'axios';
import { getValueFor } from './getKeys';

export const payInvoice = async (invoice) => {
  try {
    console.log('sending payment');
    const adminKey = await getValueFor('adminKey');
    const response = await axios.post(
      'https://legend.lnbits.com/api/v1/payments',
      {
        out: true,
        bolt11: invoice,
      },
      {
        headers: {
          'X-Api-Key': adminKey,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.data;
    console.log(data);
    const message = 'Payment Sent!';
    return message;
  } catch (error) {
    const message = 'Error Sending Payment';
    return message;
  }
};
