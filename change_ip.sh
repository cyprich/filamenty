#!/bin/bash

# get ip from user
read -p "Zadajte IP adresu zariadnia: " ip

# files to output to
files=("./backend/config.json" "./frontend/src/config.json")

# iterate through files and create them
for i in "${files[@]}"; do
    echo -e "{\n    \"ip\": \"${ip}\"\n}" >$i
done
