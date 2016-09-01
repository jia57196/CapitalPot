

#pragma once
#include <string>
#include <muduo/base/BlockingQueue.h>

struct QuotesUpdate
{
	std::string asset_;
	double      price_;
	double      volume_;
};


typedef muduo::BlockingQueue<QuotesUpdate> QuotesUpdateQueue;
typedef muduo::BlockingQueue<BalanceUpdateNotification> BalanceUpdateNotificationQueue;

