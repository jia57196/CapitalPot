#!/bin/bash


sudo apt-get -y install autoconf automake libtool curl make g++ unzip libgd2-noxpm-dev libc-ares-dev

CUURENT_FOLDER=$(pwd)

cd /tmp

git clone https://github.com/google/protobuf.git
cd protobuf
./autogen.sh
./configure --prefix=/usr
make all
make check
sudo make install

echo "Finish install Google protobuf"

cd $CUURENT_FOLDER