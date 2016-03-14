#!/bin/bash

echo "1. Install the VIM---------------------"
apt-get --yes install vim

echo "2. Update Ubuntu-----------------------"
sudo apt-get update

echo "3. Install Git-------------------------"
sudo apt-get --yes install git


echo "4. Clone the Bitcoin source code-------"
cd /opt

mkdir -p src && cd src
git clone https://github.com/bitcoin/bitcoin.git

ls bitcoin

echo "5. Install the depency of compiling Bitcoin"
sh ../installDepends.sh


echo "6. Complile the BitCoin----------------"
cd /opt
BDB_PREFIX=$(pwd)/src/db-4.8.30.NC/build
cd src/bitcoin
git checkout v0.10.0
./autogen.sh
./configure CPPFLAGS="-I${BDB_PREFIX}/include/ -O2“ LDFLAGS=”-L${BDB_PREFIX}/lib/" --with-gui
make
sudo make install

echo "The Bitcoin is build out and installed."

