import ethers from 'ethers';
import config from '../config.json';

const providers = ethers.providers;

// Connect to Ropsten (the test network)

// You may specify any of:
// - boolean; true = ropsten, false = homestead
// - object; { name: 'ropsten', chainId: 3 } (see ethers.networks);
// - string; e.g. 'homestead', 'ropsten', 'rinkeby', 'kovan'
var network;
if(config.network=="rinkeby"){
 network = providers.networks.rinkeby;
}if(config.network=="ropsten"){
 network = providers.networks.ropsten;
}if(config.network=="kovan"){
 network = providers.networks.kovan;
}if(config.network=="homestead"){
 network = providers.networks.homestead;
}
// Connect to INFUA
const infuraProvider = new providers.InfuraProvider(network,config.api_key);

// Connect to Etherscan
const etherscanProvider = new providers.EtherscanProvider(network);

// This is equivalent to using the getDefaultProvider

export const provider = providers.getDefaultProvider(network);
