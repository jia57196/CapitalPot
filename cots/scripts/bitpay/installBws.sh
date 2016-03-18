#!/bin/bash


echo "      Install bitpay wallet client @ $1"
cd $1 
if [ ! -e "bitcore-wallet-service" ]
then
    git clone https://github.com/bitpay/bitcore-wallet-service.git
fi
cd  bitcore-wallet-service
npm install


