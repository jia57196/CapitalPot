#!/bin/bash



sudo apt-get install software-properties-common
sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xcbcb082a1bb943db
sudo add-apt-repository 'deb http://mirror.jmu.edu/pub/mariadb/repo/10.1/ubuntu trusty main'

sudo apt-get update
sudo apt-get install -y mariadb-server


sudo service mysql start
