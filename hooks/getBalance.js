import axios from 'axios';
import { getValueFor } from './getKeys';

export const getBalance = async () => {
  try {
    const apiKey = await getValueFor('apiKey');
    const res = await axios.get('https://legend.lnbits.com/api/v1/wallet', {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.data;
    const walletName = data.name;
    const walletBalance = Math.floor(data.balance * 0.001);
    console.log('received wallet details');
    return [walletName, walletBalance];
  } catch (error) {
    console.error(error);
  }
};


