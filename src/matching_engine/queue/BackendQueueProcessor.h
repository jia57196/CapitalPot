
#pragma once

#include "transaction/Transaction.h"
#include "../threads/BaseThread.h"

class BackendQueueProcessor : public ThreadBase<BackendQueueProcessor>{
public:
	BackendQueueProcessor();
	
	~BackendQueueProcessor();

	void run();
};