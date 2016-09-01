#pragma once


#include <string>
#include "../socket/ClientHandler.h"

class QuotesUpdateHandler : public ThreadBase<QuotesUpdateHandler>{
public:	
	QuotesUpdateHandler(QuotesUpdateQueue & queue)
	:notificationQueue_(queue){

	}
	void run();

	void subscribe(ClientHandler & handler);

private:
	QuotesUpdateQueue notificationQueue_;
};


class BalanceUpdateHandler : public ThreadBase<QuotesUpdateHandler>{
public:	
	BalanceUpdateHandler(BalanceUpdateNotificationQueue & queue)
	:notificationQueue_(queue){

	}
	void run();

	void subscribe(ClientHandler & handler);

private:
	BalanceUpdateNotificationQueue notificationQueue_;	
};