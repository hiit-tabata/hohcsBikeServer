#!/bin/bash
timeFile=$(date +'%d_%m_%Y_%H_%M')

ssh root@server.holmantai.net << EOF
  cd /data/hohcsBikeServer
  echo "---- backup db ----"
  mongodump --out "/data/backup/"$timeFile
  echo "---- git pull latest version ----"
  git pull
  echo "---- pm2 reload ----"
  sudo pm2 reload all
  echo "---- pm2 log ----"
  sudo pm2 logs
EOF
