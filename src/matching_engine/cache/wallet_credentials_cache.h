


#pragma once

#include <string>
#include <map>

#include "../daos/wallet_credentials.h"

//Key is the client ID, and the wallet is the value;
typedef std::map<std::string, WalletCredentials> Wallets;


class WalletCredentialsCache{

public:
	//init the wallets from the database side.
	WalletCredentialsCache();

	void reloadCache();

	void reloadClient(const std::string id);

	WalletCredentials & getWalletCredentials(const std::string & id){
		return wallets_[''];
	}
private:
	Wallets	wallets_;

};