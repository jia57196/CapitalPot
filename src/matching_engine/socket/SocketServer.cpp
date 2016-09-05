

#include "SocketServer.h"
#include <ctime>

using namespace std::chrono;

SocketServer::SocketServer(){

}


SocketServer::~SocketServer(){
	
}

void SocketServer::run(){
	
}

bool SocketServer::isConnectionAllowed(const std::list<std::string> & whitelist, const std::string & host){
	return false;
}


std::list<std::string> SocketServer::getWhiteList(){
	std::list<std::string> ss;
	return ss;

}

void SocketServer::disconnect(ClientHandler_PTR handler, const std::string & note){

}

void SocketServer::connect(ClientHandler_PTR handler, const std::string & note){

}

Line SocketServer::getMetricLine(const std::string & ip, const std::string & status, const std::string & note){
	std::vector<KeyValue> arrKeyValues;
	arrKeyValues.push_back(KeyValue(IP, ip));
	arrKeyValues.push_back(KeyValue(ME_STATUS, status));

	system_clock::time_point p = system_clock::now();
	std::time_t t = system_clock::to_time_t(p);
	
	arrKeyValues.push_back(KeyValue(TIMESTAMP, std::ctime(&t)));
	arrKeyValues.push_back(KeyValue(NOTE, note));

	return Line(ME_CONNECTIONS_DETAILS, arrKeyValues);
}