

#include "loggable_object.h"
#include <sstream>

std::string KeyValue::toString(){
	std::stringstream ss;
	ss << "KeyValue(Key='" << key_ << "', Value='" << value_ << "'')" << std::endl;
	return ss.str();
}

std::string KeyValue::getJson(){
	return root_.asString();
}


std::string Line::toString(){
	std::stringstream ss;
	ss <<"Line(Id='" << id_ << "Data=";
	for (auto const &n : data_)
		ss << n.toString();
	}
	
	ss << ")" << std::endl;
	return ss.str();
}

std::string Line::getJson(){
	return root_.asString();
}


void Line::addKeyValue(const KeyValue & kv){
	data_.push_back(kv);
}