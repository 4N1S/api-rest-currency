import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import createWallet from './createWallet';
import getBalance from './getBalance';
import transaction from './transaction';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// Create Wallet by currency
	api.use('/createWallet/:currency/', createWallet({ config, db }));
	api.use('/createWallet/', createWallet({ config, db }));

	// Getbalance by currency & address
	api.use('/getBalance/:currency/:address/', getBalance({ config, db }));
	api.use('/getBalance', getBalance({ config, db }));

	// Create & Push Transaction by currency
	api.use('/transaction/:currency', transaction({ config, db }));
	api.use('/transaction', transaction({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
