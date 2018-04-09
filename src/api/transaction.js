import resource from 'resource-router-middleware';
import ethers from 'ethers';
import { provider } from '../models/infura-config';
import sendTransaction from '../models/transaction';
import bitcoin from 'bitcoinjs-lib';
import btcinfo from 'btcinfo-node';

let responseapi;
export default ({ config, db }) => resource({
	mergeParams: true,

	index({ params }, res) {
	  responseapi={
	       			  "status": "error",
	       			  "data": null,
				  	  "message": "Only Method POST"
	       			};
	  res.json(responseapi);		

	},
	/** POST / - Create a new entity */
	create({ body,params }, res) {
		console.log(params);
		let currency=params.currency;

		if(currency=="eth"){
			const privateKey = body.privateKey;
			//New instance Wallet with Privatkey
			let wallet = new ethers.Wallet(privateKey);
			//Connect wallet on provider network
			wallet.provider = ethers.providers.getDefaultProvider(config.network);
			if(body.destination && body.amount && body.privateKey){
				let transaction = {
				    to: body.destination,
				    value: ethers.utils.parseEther(body.amount)
				};
				// Estimation gaz
				const estimateGasPromise = wallet.estimateGas(transaction);

				estimateGasPromise.then(function(gasEstimate) {
				    transaction.gasLimit = gasEstimate;

				    // Send the transaction
				    let sendTransactionPromise = wallet.sendTransaction(transaction);

				    sendTransactionPromise.then(function(transactionHash) {
				       responseapi={
				       			  "status": "success",
				       			  "data": {
				       			  	"Transaction":"pending",
				       			  	"from": transactionHash.from,
				       			  	"to":transactionHash.to,
				       			  	"hash": transactionHash.hash,
				       			  	"urltx":"https://"+config.network+".etherscan.io/tx/"+transactionHash.hash+""
				       			  },
							  	  "message": "Wallet Create on currency "+currency+" "
				       			};
				       res.json(responseapi);

				      });

				});
			}else{
				responseapi={
							"status": "error",
						 	"data": null,
						 	"message": "Missing parameter: required 'privatkey,from address, amount'"
							};
				res.json(responseapi);
			}
		}
		if(currency=="btc"){
			if(body.destination && body.amount && body.privateKey){	
			var from=(body.privateKey=="cQWWTV8Yqo67bt75bXTprVod2RFGrxKAuewnaqikSvLGhfLDXF1W") ? "cQneBhJPz3AumSfroM1esW46TLUR8tZi71DNARhpPA1nw4kSbUoS" : "cQWWTV8Yqo67bt75bXTprVod2RFGrxKAuewnaqikSvLGhfLDXF1W";	

					var wif        = body.privateKey,
					    to         = body.destination,
					 	privKeyWIF = body.privateKey,
					 	btc        = body.amount,// Recommeneded 0.001,
					 	network    = "testnet",
					 	testnet    = bitcoin.networks.testnet,
					 	keyPair    = bitcoin.ECPair.fromWIF(privKeyWIF, testnet),
					 	from       = keyPair.getAddress();

					sendTransaction(privKeyWIF,to,btc,network);	

					responseapi={
						       		"status": "success",
						       		"data": {
						       			  	"Transaction":"pending",
						       			  	"from": from,
						       			  	"to":to
						       			  },
									  	  "message": "Transaction Create on currency "+currency+" "
					       		};							    

				res.json(responseapi);
			}else{
				responseapi={
							"status": "error",
						 	"data": null,
						 	"message": "Missing parameter: required 'privatkey,from address, amount'"
							};
				res.json(responseapi);
			}

		}			
		else if(!params.currency){
			responseapi={
						  "status": "Error",
						  "data":null,
					  	  "message": "Missing parameter: 'currency'"
						};
			res.json(responseapi);
		}
	}

});
