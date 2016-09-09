



#pragma once

#include <string>

typedef struct _AssetBalance{
	std::string Asset;
    double Balance;
}AssetBalance;


class Wallet{

public:
	double getBalance(std::string asset);

    void addBalance(std::string asset, double amount);

    void setBalance(std::string asset, double amount);

    AssetBalance getAssetBalance(std::string asset);

private:	
	static std::string CLIENT_BALANCE = "ClientBalance";

    std::string balances_;	

};