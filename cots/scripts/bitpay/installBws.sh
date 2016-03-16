#!/bin/bash


echo "0. Install bitpay wallet client"
cd /opt/bitpay
git clone https://github.com/bitpay/bitcore-wallet-service.git
cd  bitcore-wallet-service
npm install


