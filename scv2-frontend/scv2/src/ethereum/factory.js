import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x420E8eDb9c76fae324E63683864d7FF90C8467A3'
);

export default instance;

