#!/bin/bash


echo "0. Install the LibBitcoind first"
cd /opt
mkdir libbitcoin
cd libbitcoin

echo "1. build the libitcoind"
git clone https://github.com/libbitcoin/libbitcoin.git
cd libbitcoin
./autogen.sh
./configure
make
sudo make install
sudo ldconfig




