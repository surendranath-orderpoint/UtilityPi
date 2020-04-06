pwd
#chmod 7 UtilityPi
#cd UtilityPi
unzip Utilitypi.zip
cp -fR UtilityPi/ .
rm -rf Utilitypi.zip
rm -rf UtilityPi
pm2 restart oputility
