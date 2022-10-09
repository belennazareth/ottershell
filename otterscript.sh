#! /usr/bin/bash

npm run build 
git commit -am "build"
vercel --prod
