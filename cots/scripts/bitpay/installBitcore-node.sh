#!/bin/bash



cd /opt/bitpay
git clone https://github.com/bitpay/bitcore-node.git
cd bitcore-node

npm install


read -p "1. start to run bitcore full node Continue (y/n)?" choice
case "$choice" in 
  y|Y ) npm start;;
  n|N ) echo "not now to start full node.";;
  * ) echo "invalid";;
esac

