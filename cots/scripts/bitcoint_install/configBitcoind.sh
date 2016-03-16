
#!/bin/bash


ln -s /usr/local/bin/bitcoind /usr/bin/bitcoind

cd ~/
FOLDER=$(pwd)/.bitcoin

if [ ! -e "$FOLDER" ]
then
    echo "File $FOLDER does not exists"
    mkdir .bitcoin
    cd .bitcoin
    echo "server=1" >> bitcoin.conf
    echo "daemon=1" >> bitcoin.conf
    echo "testnet=1" >> bitcoin.conf
    echo "rpcuser=UNIQUE_RPC_USERNAME" >> bitcoin.conf
    echo "rpcpassword=UNIQUE_RPC_PASSWORD" >> bitcoin.conf
fi

# possibility 3:
#cat <<EOT >> greetings.txt
#line 1
#line 2
#EOT

echo "-----------------To launch the Bitcoind service----------------"
bitcoind

