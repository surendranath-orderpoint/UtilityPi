pwd
#chmod 7 UtilityPi
#cd UtilityPi
cd ..
mkdir UtilityPiNew
cp UtilityPi/Utilitypi.zip UtilityPiNew/
cp UtilityPi/node_modules/ UtilityPiNew/node_modules/
cd UtilityPiNew
unzip Utilitypi.zip
cp -rf UtilityPi/ .
rm -rf Utilitypi.zip
rm -rf UtilityPi
pm2 restart oputility
