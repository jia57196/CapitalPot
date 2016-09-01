#!/bin/bash


sudo apt-get install autoconf automake libtool curl make g++ unzip

CUURENT_FOLDER=$(pwd)

cd /tmp

git clone https://github.com/google/protobuf.git
cd protobuf
./autogen.sh
./configure --prefix=/usr
make
make check
sudo make install

echo "Finish install Google protobuf"

cd $CUURENT_FOLDER