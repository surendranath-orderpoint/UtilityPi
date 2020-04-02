cd UtilityPi
unzip Utilitypi.zip
cp -R UtilityPi/ .
rm -rf Utilitypi.zip
rm -rf UtilityPi
pm2 restart index
