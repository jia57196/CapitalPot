#!/bin/bash

cd $1 
echo "   start to install the insight-api ..............."
if [ ! -e "insight-api" ] 
then
    git clone https://github.com/bitpay/insight-api.git
fi
cd insight-api
npm install

cd $1 
echo "   start to install the insight-ui ................"
if [ ! -e "insight-ui"]
then
    git clone https://github.com/bitpay/insight-ui.git
fi
cd insight-ui
npm install

cd $1 
echo "   start to install the bitcore-message ..........."
if [ ! -e "bitcore-message" ]
then
    git clone https://github.com/bitpay/bitcore-message.git
fi
cd bitcore-message
npm install


