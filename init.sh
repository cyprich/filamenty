#!/bin/bash

# get ip from user
read -p "Zadajte IP adresu zariadenia: " ip

# files to output to
files=("./backend/config.json" "./frontend/src/config.json")

# iterate through files and create them
for i in "${files[@]}"; do
    echo -e "{\n    \"ip\": \"${ip}\"\n}" >$i
done

# ask if user wants to init database
echo
echo "Prajete si naplniť databázu počiatočnými hodnotami?"
echo "POZOR! Program vymaže terajšiu databázu bez možnosti návratu!"
read -n 1 -p "Vymazať a naplniť databázu? [ano/nie]: "

# convert to lowercase
REPLY="${REPLY,,}"

# do the job
if [ "$REPLY" = "y" ] || [ "$REPLY" = "yes" ] || [ "$REPLY" == "a" ] || [ "$REPLY" == "ano" ] || [ "$REPLY" == "á" ] || [ "$REPLY" == "áno" ]; then
    echo ""
    echo "Program sa spúšťa..."
    echo ""
    cd backend
    python3 create_db.py
    cd ..
else
    echo ""
    echo "Program sa nespustil"
fi
