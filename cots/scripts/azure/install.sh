

#!/bin/bash


sudo apt-get install libxml++2.6-dev libxml++2.6-doc uuid-dev

CUURENT_FOLDER=$(pwd)

echo "Build and install casablanca......"
cd /tmp

sudo git clone https://github.com/Microsoft/cpprestsdk.git casablanca
sudo mkdir casablanca.release
cd casablanca/Release
sudo cmake . -DCMAKE_BUILD_TYPE=Release
sudo make -j4
sudo make install

cd $CUURENT_FOLDER
cd ../../

git clone https://github.com/Azure/azure-storage-cpp.git
cd azure-storage-cpp/Microsoft.WindowsAzure.Storage
sudo mkdir build.release
cd build.release
CASABLANCA_DIR=/opt:/casablanca CXX=g++-5.4 cmake .. -DCMAKE_BUILD_TYPE=Release
make -j4

echo "Finish install Microsoft Azure storage SDK"

cd $CUURENT_FOLDER