#pragma once

#include <assert>
#include "Transaction.h"
#include "../../daos/bitcoin/Orders.h"


class Swap: public Transaction{
public:
	typedef struct Swapee_T{
		std::string multisigCustomer_;
		std::string asset_;
		double      amount_;
		std::string clientId_;
		std::string origAsset_;
	} Swapee;

public:
	Swap(const std::string & swapFrom_, const std::string & swapTo_, const Orders & orders)
	:swapFrom_(swapFrom), swapTo_(swapTo){
	}

	inline std::string toJson(){
		assert(false);
		return "";
	}
private:
	std::string transactionId_;
	Swapee      & swapFrom_;
	Swapee      & swapTo_;
};