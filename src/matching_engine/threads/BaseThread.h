
#pragma once

#include <typeinfo>

#include "muduo/base/Thread.h"
#include <boost/bind.hpp>


template<typename T>
class ThreadBase: boost::noncopyable {
public:
	ThreadBase(){
	}
	~ThreadBase(){
	}

	void doIt(T* derived){
		derived->run();
	}; 

	virtual void run() = 0;

	void start(){
		T* derived = dynamic_cast<T*>(this);
		thread_ptr_ = std::unique_ptr<muduo::Thread>(
			new muduo::Thread(boost::bind(&ThreadBase::doIt, this, boost::ref(*derived)), typeid(*derived).name()));
	}

	bool isFinished() {
		if (thread_ptr_){
			return !thread_ptr_->started();
		}
		return true;
	}
	void join() {
		if(thread_ptr_) {
			thread_ptr_->join();
		}
	}	
private:
	std::unique_ptr<muduo::Thread> thread_ptr_;
};