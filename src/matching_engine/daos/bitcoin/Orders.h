
#pragma once

#include <string>
#include <deque>

typedef struct TradeOrderPair{
    std::string ClientId_;
    std::string TradeId_;
} ClientOrderPair, ClientTradePair;

typedef std::deque<ClientTradePair> ClientTradePairQueue;




class Orders{
public:
	Orders(const ClientOrderPair & marketOrder,
	       const ClientOrderPair & limitOrder,
	       const ClientTradePairQueue & trades){
		//todo....
	}
private:	
	ClientOrderPair      marketOrder_;
	ClientOrderPair      limitOrder_;
	ClientTradePairQueue trades_;
};

struct ClientCashOperationPair{
	std::string ClientId_;
	std::string CashOperationId_;

};