


#pragma once

#include "../threads/BaseThread.h"

enum ConnectionStatus{
	Connected, 
	Disconnected, 
	Blocked,
	none
};

class SocketServer: public ThreadBase<SocketServer>
{
public:
	SocketServer();
	~SocketServer();

	/* interface */
public:
	void run();

private:
	void initMetricLogger();

	bool isConnectionAllowed(const std::list<std::string> & whitelist, const std::string & host);

	void disconnect(ClientHandler_PTR handler, const std::string & note);

	void connect(ClientHandler_PTR handler, const std::string & note);

	std::list<std::string> getWhiteList();
	/* data */
private:
	uint DEFAULT_PORT = 8888;
    uint DEFAULT_MAX_CONNECTIONS = 10;

	MessageWrapperQueue messageQueue_;
	ClientHandler_Set   connections_;


};