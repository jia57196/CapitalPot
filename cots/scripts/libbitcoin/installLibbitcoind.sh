#!/bin/bash


echo "0. Install the LibBitcoind first"
cd /opt
mkdir libbitcoin
cd libbitcoin
echo "0.1 Install Boost..."
sudo apt-get --purge remove libboost-dev
sudo apt-get --purge remove libboost-all-dev
dpkg -S /usr/include/boost/version.hpp
sudo add-apt-repository ppa:boost-latest/ppa
sudo apt-get install libboost1.55-all-dev


echo "1. build the libitcoind"
wget https://raw.githubusercontent.com/libbitcoin/libbitcoin/version2/install.shchmod +x install.sh
sudo ./install.sh




