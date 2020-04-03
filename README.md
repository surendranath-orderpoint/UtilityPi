# 1. Download nodejs
sudo curl -sL https://deb.nodesource.com/setup_13.x |sudo -E bash -

# 2. Install nodejs
sudo apt install -y nodejs

 node -v
 
 npm -v

# 3. Create Working directory

mkdir orderpoint

cd orderpoint

# 4. Install server monitoring tool

npm install pm2@latest -g

# 5. Download orderpoint setup app

curl -LOk https://github.com/surendranath-orderpoint/UtilityPi/archive/master.zip

unzip master.zip

rm -rf master.zip

mv UtilityPi-master/ UtilityPi/

cp UtilityPi/update.sh .

cd UtilityPi

# 6. Install orderpoint node modules

npm install

# 7. Start orderpoint app
pm2 start

# 8. setup startup script
pm2 startup

echo “server started and listening on port 3000”
