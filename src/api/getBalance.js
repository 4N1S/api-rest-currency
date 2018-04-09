import resource from 'resource-router-middleware';
import ethers from 'ethers';
import { provider } from '../models/infura-config';
import btcinfo from 'btcinfo-node';

let responseapi;

export default ({ config, db }) => resource({
	mergeParams: true,

	/** GET / - List all entities */
	index({ params }, res) {
		let currency=params.currency,
			address=params.address;
		var client = new btcinfo("testnet");

		if(currency=="btc"){
			// Check length of address 
			if(address.length==34){
				var getBalance= new Promise((resolve,reject) => {
					client.getBalance(address, (error, data) => {
						if(!error){
							resolve(data);
						}else{
							reject(error);
						}
					});	
				});
				getBalance.then((data,error)=>{

					var balance=data.balance/Math.pow(10, 8);
					responseapi={
								  "status": "success",
								  "data": {
								  	"balance":balance +" BTC"
								  },
								  "message":"Balance Wallet on currency "+currency+" "
								};


				},function(error){
					responseapi={
								  "status": "Error",
								  "data":null,
								  "message": "Bad format parameter: 'address'"
								};

				})

			}else{
				responseapi={
							  "status": "Error",
							  "data":null,
							  "message": "Bad format parameter: 'address'"
							};

			}

		}if(currency=="eth"){
			if(address.length==42){
				let etherString;
				provider.getBalance(address).then(function(balance) {

				    // balance is a BigNumber (in wei); format is as a sting (in ether)
				    etherString = ethers.utils.formatEther(balance);
					responseapi={
								  "status": "success",
								  "data": {
								  	"balance":etherString+" ETH"
								  },
								  "message":"Balance Wallet on currency "+currency+" "

								};

				});
			}else{
				responseapi={
							  "status": "Error",
							  "data":null,
							  "message": "Bad format parameter: 'address'"
							};

			}
		}else if(!params.currency || !params.address){
			responseapi={
						  "status": "Error",
						  "data":null,
					  	  "message": "Missing parameter: 'currency or address'"
						};

		}
		res.json(responseapi);	

	}
});
