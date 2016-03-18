#!/bin/bash

node -v

read -p "Do you want to remove existing nodejs (y/n)?" choice
case "$choice" in 
  y|Y ) sudo apt-get remove nodejs;;
  n|N ) echo "keep existing nodejs.";;
  * ) echo "invalid";;
esac


curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
source ~/.profile

nvm ls-remote | grep v0.12.12

nvm install v0.12.12

ln -s /usr/bin/nodejs /usr/bin/node

node --version

nvm use v0.12.12

echo "Now the node version is:"
which node


