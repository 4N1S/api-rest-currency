import resource from 'resource-router-middleware';
import ethers from 'ethers';
import { provider } from '../models/infura-config';
import bitcoin from 'bitcoinjs-lib';
let responseapi;

export default ({ config, db }) => resource({
	mergeParams: true,

	/** GET / - List all entities */
	index({ params }, res) {
		let currency=params.currency;

		if(currency=="btc"){	
			const testnet = bitcoin.networks.testnet
		    let keyPair = bitcoin.ECPair.makeRandom({ network: testnet })
		    let wif = keyPair.toWIF()
		    let address = keyPair.getAddress()
		    console.log(address);
		    console.log(wif);
			responseapi={
						  "status": "success",
						  "data": {
						  	"address":address,
						  	"privateKey":wif
						  },
						  "message": "Wallet Create on currency "+currency+" "
						};

		}if(currency=="eth"){
			const wallet = ethers.Wallet.createRandom();
			responseapi={
						  "status": "success",
						  "data": {
						  	"address":wallet.address,
						  	"privateKey":wallet.privateKey
						  },
						  "message": "Wallet Create on currency "+currency+" "
						};

	
		} else if(!params.currency){
			responseapi={
						  "status": "Error",
						  "data":null,
					  	  "message": "Missing parameter: 'currency'"
						};
		}
		res.json(responseapi);	

	}
});
