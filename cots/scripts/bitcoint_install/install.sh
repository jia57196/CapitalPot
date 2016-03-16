#!/bin/bash

SCRIPT_ROOT=$(pwd)
INSTALL_DIR=/opt

echo "1. Install the VIM---------------------"
apt-get --yes install vim

echo "2. Update Ubuntu-----------------------"
sudo apt-get update

echo "3. Install Git-------------------------"
sudo apt-get --yes install git

BITCOIND_DIR="${INSTALL_DIR}/bitcoind"
mkdir -p $BITCOIND_DIR
cd ${BITCOIND_DIR}

echo "4. start to install the depency of compiling Bitcoin"
${SCRIPT_ROOT}/installDepends.sh


echo "5. to compile bitcoind service"
${SCRIPT_ROOT}/installBitcoind.sh


echo "6. to configure and run the bitcoind service"
${SCRIPT_ROOT}/configBitcoind.sh

