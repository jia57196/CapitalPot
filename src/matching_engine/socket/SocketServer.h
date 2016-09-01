


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

	/* data */
private:
	uint DEFAULT_PORT = 8888;
    uint DEFAULT_MAX_CONNECTIONS = 10;

};