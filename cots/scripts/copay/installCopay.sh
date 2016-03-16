#!/bin/bash


echo "Install the grunt"
npm install -g grunt
npm install -g angular

echo "Install the copay.........."
cd /opt
git clone https://github.com/bitpay/copay.git
cd copay
git checkout v1.9
npm install
	

