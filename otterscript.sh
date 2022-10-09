#! /usr/bin/bash

if [[ npm run build = 0 ]];
then
	vercel --prod
else
	echo "Error de compilación"
fi
