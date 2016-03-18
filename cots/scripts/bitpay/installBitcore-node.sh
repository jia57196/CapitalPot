#!/bin/bash


cd $1
if [ ! -e "bitcore-node" ]
then
     git clone https://github.com/bitpay/bitcore-node.git
fi
cd bitcore-node
npm install

read -p "   start to run bitcore full node Continue (y/n)?" choice
case "$choice" in 
  y|Y ) npm start;;
  n|N ) echo "not now to start full node.";;
  * ) echo "invalid";;
esac


cd $1 
echo "   start to install the bitcore-p2p ..............."
if [ ! -e "bitcore-p2p" ]
then
    git clone https://github.com/bitpay/bitcore-p2p.git
fi
cd bitcore-p2p
npm install

cd $1 
echo "   start to install the bitcoind-rpc ..............."
if [ ! -e "bitcoind-rpc" ]
then
    git clone https://github.com/bitpay/bitcoind-rpc.git
fi
cd bitcoind-rpc
npm install


