import axios from 'axios';
const apiToken = '1Q4XAB7I5JSMK9IZVP4Y169C754EHTIM8M';
const ApiAxiosWallet = axios.create({
  baseURL: 'https://api.bscscan.com/api/',
});
const WalletApi = {
  accountBalance(payload) {
    let url = `https://api.bscscan.com/api?module=account&action=balance&address=${payload}&apikey=${apiToken}`;
    return ApiAxiosWallet.get(url);
  },
  accountHistory(payload) {
    let url = `https://api.bscscan.com/api?module=account&action=txlist&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&address=${payload}&apikey=${apiToken}`;
    return ApiAxiosWallet.get(url);
  },
};
export default WalletApi;
