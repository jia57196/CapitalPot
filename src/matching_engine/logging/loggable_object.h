

#pragma once

#include <string>
#include <vector>
#include <json/json.h>

#define ME_STATUS "MeStatus"
#define ME_CONNECTIONS_DETAILS "MeConnectionsDetails"
#define ME_CONNECTIONS_COUNT "MeConnectionsCount"
#define ME_CONNECTIONS_INCOMING "MeConnectionsIncoming"
#define ME_CONNECTIONS_OUTGOING "MeConnectionsOutgoing"
#define ME_BALANCE_UPDATE "MeBalanceUpdate"
#define ME_CASH_OPERATION "MeCashOperation"
#define ME_LIMIT_ORDER_CANCEL "MeLimitOrderCancel"
#define ME_LIMIT_ORDER "MeLimitOrder"
#define ME_MARKET_ORDER "MeMarketOrder"
#define ME_BACKEND_QUEUE "MeBackendQueue"
#define ME_ERRORS "MeErrors"

#define UID "Uid"
#define ID "Id"
#define BUSSINES_ID "BussinesId"
#define TIMESTAMP "Timestamp"
#define IP "Ip"
#define STATUS "Status"
#define NOTE "Note"
#define CLIENT_ID "ClientId"
#define ASSET "Asset"
#define ASSET_PAIR "AssetPair"
#define AMOUNT "Amount"
#define STRAIGHT "Straight"
#define PRICE "Price"
#define SEND_TO_BITCOIN "SendToBitcoin"
#define LIMIT_ORDER_ID "LimitOrderId"
#define TYPE "Type"
#define DATA "Data"
#define SERVICE "Service"

class LoggableObject{

public:
	virtual std::string getJson() = 0;
	virtual std::string toString() = 0;
private:
	Json::value	root_;
};


class KeyValue: public LoggableObject{
public:
	KeyValue(const std::string & key, const std::string & defineue_)
	: key_(key), value_(value){
		root_[key_] = value_;
	}

	std::string toString();

	std::string getJson();

private:
	std::string key_;
	std::string value_;
};





class Line: public LoggableObject{
public:
	Line(const std::string & id, const std::vector<KeyValue> & data)
	:id_(id), data_.assign(data){
		root_[id_] = data_;
	}

	std::string toString();

	std::string getJson();

	void addKeyValue(const KeyValue & kv);
private:
	std::string id_;
	std::vector<KeyValue> data_;
};