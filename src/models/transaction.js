import btcinfo from 'btcinfo-node';
import bitcoin from 'bitcoinjs-lib';

function sendTransaction(privkeyWif,to,amountbtc,network){
	var network="testnet"; // or null 
	var testnet = bitcoin.networks.testnet
	var client = new btcinfo(network);
	var keyPair = bitcoin.ECPair.fromWIF(privkeyWif, testnet);
	var from = keyPair.getAddress();
	console.log("from",from);

	var getUtxo= new Promise((resolve,reject) => {
		client.getUtxo(from, (error, data) => {
			if(!error){
				resolve(data);
			}else{
				reject(error);
			}
		});	
	});

	var getFee= new Promise((resolve,reject) => {
		client.getFee((error, data) => {
			if(!error){
				resolve(data);
			}else{
				reject(error);
			}
		});	
	});

	 getFee.then((data,error)=>{
		var feePerByte=data.fastestFee;

		 getUtxo.then((data)=>{

		  	// Initialize a private key using WIF
		  	let amtSatoshi=Math.floor(amountbtc*Math.pow(10, 8));; // Attention en satoshi
		  	//Construction de la transaction 
		  	var txb = new bitcoin.TransactionBuilder(testnet); // Attention pas oublier network
		  	//Inputs informations of Utxo
		  	var ninputs = 0;
		  	var availableSat = 0;
		  	var txinput=[];
			  	for (var i = 0; i < data.length; i++) {
			  		var utxo = data[i];
			  		if (utxo.confirmations >= 6) {
			  			txinput.push({
			  				txid:utxo.txid,
			  				vout:utxo.vout
			  			});
			  			availableSat += utxo.satoshis;
			  			txb.addInput(utxo.txid, utxo.vout);

			  			ninputs++;
			  			if (availableSat >= amtSatoshi) break;
			  		}
			  	}
			if (availableSat < amtSatoshi) throw "You do not have enough in your wallet to send that much.";
	  		var change = availableSat - amtSatoshi;
	  		var numOutputs=(change > 0) ? 2 : 1
	  		var fee= (ninputs*180 + numOutputs*34 + 10 + ninputs)*feePerByte;
		  	//Ouput amount, fee, balance
		    txb.addOutput(to, amtSatoshi - fee);//Amount- fee A calculer
		    txb.addOutput(from, change);

		    // Signed Transaction
		    for (var i = 0; i < ninputs; i++) {
		    	txb.sign(i, keyPair);

		    }
		    //Hexa transaction final 
		    var transaction=txb.build().toHex();
		    console.log("transaction hexa",transaction);

		    // Push transaction
		    var pushtx= new Promise((resolve,reject) => {
		    	client.pushtx(transaction,(error, data) => {
		    		if(!error){
		    			resolve(data);
		    		}else{
		    			reject(error);
		    		}
		    	});	
		    });
		    pushtx.then((data)=> {
		      console.log('yay got transfer successful',data);
		      return data;
		    },function(error){
			console.log("E!:",error);
		
			});


		},function(error){
			console.log("E!:",error);
		
		});	
 	});

}
export default sendTransaction;
