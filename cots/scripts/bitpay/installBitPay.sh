#!/bin/bash

sudo apt-get --yes update
sudo apt-get --yes install build-essential libssl-dev npm


echo "0. Install the Npm first................................."
read -p " remove exisitng nodejs (y/n)?" choice
case "$choice" in 
  y|Y ) sudo apt-get remove --purge nodejs
        echo "1.1 Install the Nodejs 0.12.............................."
        curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh
        source ~/.profile
        nvm uninstall v0.12.12
        nvm ls-remote | grep 0.12.12
        nvm install v0.12.12
        node -v
        nvm alias default v0.12.12
        ;;
  n|N ) echo "not now to start full node.";;
  * ) echo "invalid";;
esac

npm install -g express

if  [[ !  -z  $2  ]]; then
  echo "The install path is empty."   
fi

echo "2.Install bitcore-build................................."
cd "$1"
echo "Pisiton is now $1"

BITPAY_FOLDER=$1/bitpay
if [ ! -e "$BITPAY_FOLDER" ]
then
   mkdir bitpay
fi

cd ${BITPAY_FOLDER}
if [ ! -e "bitcore-build" ]
then
   git clone https://github.com/bitpay/bitcore-build.git
fi
cd bitcore-build
npm install

cd ${BITPAY_FOLDER}
echo "3. Install the bitcore-lib .........................."
if [ ! -e "bitcore-lib" ]
then
   git clone https://github.com/bitpay/bitcore-lib
fi
cd bitcore-lib
npm install

cd ${BITPAY_FOLDER}
echo "4. Install the bitcore..............................."
if [ ! -e "bitcore" ]
then
   git clone https://github.com/bitpay/bitcore
fi
cd bitcore
npm install
cp etc/init/bitcored.conf /etc/init/

cd ${BITPAY_FOLDER}
BITNODE=$2/installBitcore-node.sh

cd ${BITPAY_FOLDER}
BITNODE=$2/installBitcore-node.sh
echo "5. Install the bitcoin-node @ ${BITNODE}........"
sh ${BITNODE} ${BITPAY_FOLDER}

cd ..
BWS=$2/installBws.sh
echo "6. Install the BWS @ ${BWS}....................."
sh ${BWS} ${BITPAY_FOLDER}

cd ..
INSIGHT=$2/installInsight.sh
echo "7. Install the Insight @ ${INSIGHT}....................."
sh ${INSIGHT} ${BITPAY_FOLDER}

