


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

typedef boost::shared_ptr<ClientHandler> ClientHandler_PTR;

typedef std::unordered_set<ClientHandler_PTR>  ClientHandler_Set;