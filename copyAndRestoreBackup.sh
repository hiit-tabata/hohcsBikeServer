#!/bin/bash

echo "---- copy back to local machine ---- folder "$1
scp -r root@server.holmantai.net:"/data/backup/"$1 "/home/holman/Desktop/"$1
echo "---- clear local db -------"
npm run clearMongo
echo "---- restore local db -------"
npm run restore
