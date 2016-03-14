#!/bin/bash

echo "-----------Start to install the depends libs to Bitcoin--------------"
sudo apt-get --yes install build-essential

echo ": Get DB database.... "
wget http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz
echo ‘12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef  db-4.8.30.NC.tar.gz’ | sha256sum -c

echo ": Compiling the Berkeley DB..."
sh ./compileDB.sh


echo ": Install the other dependency.... "
sudo apt-get --yes install autoconf libboost-all-dev libssl-dev libprotobuf-dev protobuf-compiler libqt4-dev libqrencode-dev libtool
sudo apt-get install build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils
sudo apt-get install libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev
#or by below command
#sudo apt-get install libboost-all-dev
sudo apt-get install libzmq3-dev
sudo apt-get install libminiupnpc-dev
sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler
sudo apt-get install libqrencode-dev

