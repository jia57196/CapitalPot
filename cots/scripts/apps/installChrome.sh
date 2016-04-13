#!/bin/bash


echo "1. install Chrome"
sudo apt-get install libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome*.deb


echo "2. install Sublime"
sudo add-apt-repository ppa:webupd8team/sublime-text-3 
sudo apt-get update 
sudo apt-get install sublime-text-installer

