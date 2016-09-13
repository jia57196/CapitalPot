



#pragma once

#include <string>
#include <list>

typedef struct _AssetBalance{
	std::string Asset;
    double Balance;
}AssetBalance;

typedef std::list<AssetBalance> AssetBalanceList;

class Wallet{

public:
	double getBalance(std::string asset);

    void addBalance(std::string asset, double amount);

    void setBalance(std::string asset, double amount);

    AssetBalance getAssetBalance(std::string asset);

    AssetBalanceList getBalancesList();

private:	
	static std::string CLIENT_BALANCE = "ClientBalance";

    std::string balances_;	

};