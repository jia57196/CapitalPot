


#pragma once 

#include "../threads/BaseThread.h"

class ClientHandler : public ThreadBase<SocketServer>  {

public:
	void run();

	bool isConnected();

	void disconnect();
private:
	uint incomingSize = 0;
	uint outgoingSize = 0;
};