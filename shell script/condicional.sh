#!/bin/bash

echo "Enter a number:"

read NUMBER

if [ $NUMBER -gt 10 ];then
	echo "Number greater than 10"

elif [ $NUMBER -ge 5 -a $NUMBER -ge 10 ];then
	echo "Number between 5 and 10"
else 
   echo "Default"
fi 



