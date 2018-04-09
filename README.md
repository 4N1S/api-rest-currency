## api-rest-currency

This api use Ethers.js/bitcoinjs & boilerplate for building REST APIs with ES6 and Express.


## Getting Started

```sh
# clone it
git clone git@github.com:4N1S/api-rest-currency.git
cd api-rest-currency

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start
```

## Methods

* [createWallet](#createWallet)
* [getBalance](#getBalance)
* [transaction](#transaction)

### createWallet

**Examples**
Request:GET

    /api/createWallet/{currency}

***Response***

```javasctipt
{
	"status":"success",
	"data":{
		"address":"0x03703d1e61835D0CCFbEEEF5e77fe1e7C25d6211",
		"privateKey":"0x15a1d94da6978137a9554031e7b15431dead3cd75bf0adc0a231d496e3924084"
	},
	"message":""Wallet Create on currency "{currency}"
}
```

### getBalance

**Examples**
Request:GET

    /api/getBalance/{currency}/{address}

***Response***

```javasctipt
{
	"status":"success",
	"data":{
		"balance":"1.7 {currency}"
	},
	"message":"Balance Wallet on currency "{currency}"
}
```

### transaction

**Examples**
Request:POST

    /api/transaction/{currency} 

    param:(required object JSON)
    privatkey:privateKey of the source ETH address
    destination:the ETH/BTC destination address
    amount:amount the number of ETH to be send


***Response***

***ETHEREUM BLOCKCHAIN TRANSACTION

```javasctipt

{
	"status":"success",
	"data":{
		"Transaction":"pending",
		"from":"0x1636b4285dC9486AE1F1E7684f714F772DdC32eF","to":"0xD648a6753256583288348156dCCe590dfC66301a",
		"hash":"0x35e64f68809fb24f90fdadaa921ffd0d84c83aa1c76ea6ab5893e6ea3c6823ad",
		"urltx":"https://rinkeby.etherscan.io/tx/0x35e64f68809fb24f90fdadaa921ffd0d84c83aa1c76ea6ab5893e6ea3c6823ad"
	},
	"message":"Wallet Create on currency eth "
}
```

***BITCOIN BLOCKCHAIN TRANSACTION 
```javasctipt

{
	"status":"success",
	"data":{
		"Transaction":"pending",
		"from":"mmMPaW6LmHS83NdDTgtJSRJSnZbB88FLGU",
		"to":"mmB8qSGRh7BHUzyzCTDpq16WV2EUR1xLEX"
	},
	"message":"Transaction Create on currency btc "
}
```

## Library Reference
- [ethers.js](https://github.com/ethers-io/ethers.js/)
- [boilerplate](https://github.com/developit/express-es6-rest-api)
- [bitcoinjs](https://github.com/bitcoinjs/bitcoinjs-lib)
- [btcinfo-node](https://github.com/4N1S/btcinfo-node)




## License

See [LICENSE](LICENSE) for more info.

MIT
