
#pragma once 

#inlcude <string>


class QueueWriter{

public:
	virtual void write(const std::string strData) = 0;
};