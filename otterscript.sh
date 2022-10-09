#! /usr/bin/bash

if [[ npm run build = true ]];
then
	vercel --prod
else
	echo "Error de compilación"
fi
