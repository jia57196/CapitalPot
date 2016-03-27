

adduser bitcore

usermod -a -G root bitcore
su bitcore

cd /home/bitcore


sudo add-apt-repository ppa:git-core/ppa

sudo apt-get update

sudo apt-get --yes install git
