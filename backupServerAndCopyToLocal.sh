#!/bin/bash
timeFile=$(date +'%d_%m_%Y_%H_%M')

ssh root@server.holmantai.net << EOF
  cd /data/hohcsBikeServer
  echo "---- backup db ----"
  mongodump --out "/data/backup/"$timeFile
  exit
EOF
echo "---- copy back to local machine ----"
scp -r root@server.holmantai.net:"/data/backup/"$timeFile "/home/holman/Desktop/"$timeFile
echo "---- clear local db -------"
npm run clearMongo
echo "---- restore local db -------"
npm run restore
