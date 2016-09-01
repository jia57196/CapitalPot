

#pragma once 

#include <string>

class WalletCredentials{
public:
	WalletCredentials(const std::string & partitionKey, const  std::string & rowKey, 
		const std::string & multiSig)
	:rowKey_(rowKey), multiSig_(multiSig){

	}

	inline std::string getMultiSig(){
		return multiSig_;
	}

	void setMultiSig(const std::string & multiSig){
		multiSig_ = multiSig;
	}

	std::string getClientId(){
		return rowKey_;
	}
private:
	std::string multiSig_;
	std::string rowKey_;
};