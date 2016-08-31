

#pragma once

#include "Transaction.h"
#include <assert>

class CashIn: public Transaction{
public:
	CashIn(const std::string & transactionId,
		   const std::string & multisigAddress,
		   const double        amount,
		   const std::string & currency,
		   const std::string & clientId
		   const std::string & cashOperationId
		   const bool direction = true)
	:transactionId_(transactionId), multisigAddress_(multisigAddress), currency_(currency)
	,clientId_(clientId),cashOperationId_(cashOperationId){
		amount_ = amount;
		direction_ = direction;
	}
	inline std::string toJson(){
		assert(false);
		return "";
	}
private:
	std::string transactionId_;
	std::string multisigAddress_;
	double      amount_;
	std::string currency_;
	std::string clientId_;
	std::string cashOperationId_;
	bool        direction_;         // true: in cash; otherwise outcash
};