import Web3 from 'web3';
let web3;

// const test = async(res) => {
//   window.ethereum.enable().then(accounts=>{console.log(accounts)})
// }

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
  // test(web3)

} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/231200b2fba74be59ab0a36d20625d1a'
  );
  web3 = new Web3(provider);
}

export default web3;
