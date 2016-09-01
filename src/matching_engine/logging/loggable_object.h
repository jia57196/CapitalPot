

#pragma once

#include <string>
#include <vector>
#include <json/json.h>


class LoggableObject{

public:
	virtual std::string getJson() = 0;
	virtual std::string toString() = 0;
private:
	Json::Value	root_;
};


class KeyValue: public LoggableObject{
public:
	KeyValue(const std::string & key, const std::string & value_)
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