pwd
#chmod 7 UtilityPi
#cd UtilityPi
cd ..
mkdir UtilityPiNew
cp UtilityPi/Utilitypi.zip UtilityPiNew/
cp -R UtilityPi/node_modules/ UtilityPiNew/node_modules/
cd UtilityPiNew
unzip Utilitypi.zip
#cp -rf UtilityPi/ .
#echo "copy done"
rm -rf Utilitypi.zip
rm -rf UtilityPi
echo "Removed src files"
rm -rf ../UtilityPi
cd ..
mv UtilityPiNew UtilityPi
pm2 restart oputility
