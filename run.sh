#!/bin/env bash

tsc

echo "Running $1"

node ./js/main.js $1 $2 $3 $4