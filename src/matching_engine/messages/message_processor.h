
#pragma once 

#include "../threads/BaseThread.h"
#include <muduo/base/BlockingQueue.h>

class MessageWrapper{

public:
	MessageWrapper(const ClientHandler & that):clientHandler_(that){

	}
	void writeResponse(const ProtocolMessages.Response response);
private:
	ClientHandler & clientHandler_;
};


class MessageProcessor: public ThreadBase<MessageProcessor>{

public:
	MessageProcessor();
	~MessageProcessor();

	void run();

private:
	void processMessage(MessageWrapper & message);
};

typedef  BlockingQueue<MessageWrapper>  MessageWrapperQueue;