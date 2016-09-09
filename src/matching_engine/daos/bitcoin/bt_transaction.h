

#pragma once

#include <string>
#include <ctime>
#include <iostream>

#include "orders.h"

class BtTransaction//: public TableServiceEntity
{
public:
	void setClientCashOperationPair(ClientCashOperationPair& clientCashOperationPair);
	void setOrders(Orders &orders);

private:
	std::string contextData_;
	std::string requestData_;

    /*/    std::time_t result = std::time(nullptr);
    std::cout << std::asctime(std::localtime(&result))
              << result << " seconds since the Epoch\n";
    result: Wed Sep 21 10:27:52 2011
    1316615272 seconds since the Epoch
    */
    std::time_t created_;  
}