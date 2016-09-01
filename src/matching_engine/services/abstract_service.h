#pragma once

#include "../messages/message_processor.h"

template<typename T>
class AbsractService<T>{
public:
	virtual void processMessage(const MessageWrapper & messageWrapper) = 0;
}