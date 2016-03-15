#!/bin/bash


echo "0. Install the Npm first"
sudo apt-get remove --purge node
sudo apt-get --yes update
sudo apt-get --yes install build-essential libssl-dev

echo "1.1 Install the Nodejs 0.12."
curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh
source ~/.profile
nvm ls-remote | grep 0.12.12
nvm install 0.12.12
node -v
nvm alias default 0.12.12

npm install -g express

echo "2.Install bitcore-build"
cd /opt
mkdir bitpay
cd bitpay
git clone https://github.com/bitpay/bitcore-build.git
cd bitcore-build
npm install

cd ..
echo "3. install the bitcore-lib"
git clone https://github.com/bitpay/bitcore-lib
cd bitcore-lib
npm install

