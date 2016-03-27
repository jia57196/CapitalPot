#!/bin/bash


nvm install v0.12.12
nvm use v0.12.12

cd ~

sudo ln -s /home/bitcore/.nvm/versions/node/v0.12.12/bin/node /usr/bin/node

npm install express -g
npm install bitcore -g

bitcore create mynode

cd mynode

bitcore install insight-api insight-ui

sudo apt-get --yes install mongodb

cd  ~
cd /
sudo mkdir /data
cd  /data
sudo mkdir db

cd ~

sudo mongod 

cd mynode
bitcore install bitcore-wallet-service
npm install -g bitcore-wallet


