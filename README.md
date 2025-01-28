# Filamenty

Fullstack webová aplikácia na správu filamentov do 3D tlačiarne

Aplikácia umožňuje vytvoriť zoznam filamentov a následne v ňom upravovať, pridávať a odoberať filamenty  
Navyše aplikácia generuje pre filamenty štítky s QR kódami, ktoré po naskenovaní umožňujú jednoducho spravovať dané filamenty

## Požiadavky a spúštanie aplikácie

1. Klonovanie Git repozitára
   - Repozitár je verejne dostupný na [GitHub](https://github.com/cyprich/filamenty)
   - Uistite sa, že máte nainštalovaný _git_, a spustite nasledovný príkaz
     - `git clone https://github.com/cyprich/filamenty filamenty`
   - Následne sa presuňte do priečinku klonovaného repozitára
     - `cd filamenty`
1. Inštalácia potrebných balíčkov
   - `docker`
   - `docker-compose`
   - Konkrétny príkaz na inštaláciu balíčkov závisí od vašej Linux distribúcie, napr.:
     - `sudo apt install docker docker-compose` pre Ubunutu-based distribúcie
     - `sudo pacman -Syu docker docker-compose` pre Arch-based distribúcie
1. Spustenie systémových procesov pre Docker
   - `sudo systemctl start docker`
   - `sudo systemctl enable docker` - _nepovinné_ - automaticky spustí proces pri bootovaní zariadenia
1. Pridanie používateľa do skupiny _docker_
   - `sudo usermod -aG docker ${USER}`
1. Používateľ sa musí odhlásiť a znova prihlásiť pre aplikovanie zmien
1. Kroky pred prvým spustením na novom zariadení
   - Nastavenie IP adresy
     - Zistite IP adresu vášho zariadenia cez GUI (v nastaveniach) alebo pomocou príkazu `ip -c address`
     - Spustite súbor _change_ip.sh_ príkazom `./change_ip.sh` a zadajte IP adresu vášho zariadenia
     - IP adresa by mala vyzerať nejak takto: _192.168.1.100_
   - _Nepovinné_ - naplnenie databázy počiatočnými hodnotami
     - **Pozor!** - spustenie súboru vymaže všetky údaje v terajšej databáze bez možnosti návratu!
     - Na spustenie súboru je potrebné mať nainštalovaný balíček _python3_
     - `cd backend`
     - `python3 create_db.py`
     - `cd ..`
1. Spustenie aplikácie pomocou súboru _run.sh_
   - `./run.sh`
1. Príkazový riadok nechajte otvorený
1. Aplikáciu zobrazíte vo webovom prehliadači na adrese `http://vaša_IP_adresa:3000` alebo `http://localhost:3000`
1. Pre zastavenie aplikácie použite klávesovú skratku `ctrl + c` v príkazovom riadku

## Použité technológie

- Backend
  - Python - Hlavný programovací jazyk
  - Flask - Webový framework na vytvorenie API a obsluhu požiadaviek
  - SQLite - Databáza na uchovávanie informácií o filamentoch
  - qrcode - Python knižnica na generovanie QR kódov
- Frontend
  - React a JavaScript - Tvorba dynamického používateľského rozhrania
  - Tailwind CSS - CSS framework na vizuálne formátovanie webovej aplikácie
  - Axios - Vykonávanie HTTP požiadaviek
- Ostatné
  - Docker a docker-compose - Kontajnerizácia pre jednoduchšie nasadenie aplikácie

## Použité zdroje

| Popis                                                                    | Autor                                                                                             | Súbor                                                                | Link                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dokumentácia Python knižnice _qrcode_                                    | Lincoln Loop                                                                                      | `backend/generate_qrcodes.py` riadky 45 - 50                         | [https://pypi.org/project/qrcode/](https://pypi.org/project/qrcode/)                                                                                                                                                       |
| Dokumentácia Tailwind CSS                                                | Tailwind Labs Inc.                                                                                | `frontend/src/Filaments.jsx` riadky 27 - 89                          | [https://tailwindcss.com/](https://tailwindcss.com/)                                                                                                                                                                       |
| Článok _"How to use Axios With React"_                                   | Reed                                                                                              | `frontend/src/Filaments.jsx` riadky 18 - 24                          | [https://www.freecodecamp.org/news/how-to-use-axios-with-react/](https://www.freecodecamp.org/news/how-to-use-axios-with-react/)                                                                                           |
| Článok _"How to upload files in React app using Axios?"_                 | Ushna Ijaz                                                                                        | `frontend/src/AddFilament.jsx` riadky 31 - 65                        | [https://rapidapi.com/guides/upload-files-react-axios](https://rapidapi.com/guides/upload-files-react-axios)                                                                                                               |
| Príspevok _"Get the data received in a Flask request"_ na Stack Overflow | bkoiki950                                                                                         | `backend/main.py` riadok 118                                         | [https://stackoverflow.com/a/69941645](https://stackoverflow.com/a/69941645)                                                                                                                                               |
| Hlavná ikonka stránky                                                    | Freepik                                                                                           | `frontend/src/images/icon.png` </br>`frontend/public/favicon.ico`    | [https://www.flaticon.com/free-icon/3d-printing-filament_2442882](https://www.flaticon.com/free-icon/3d-printing-filament_2442882)                                                                                         |
| Ostatné použité ikonky                                                   | Ilham Fitroutul Hayat                                                                             | `frontend/src/images/edit.png` </br>`frontend/src/images/delete.png` | [https://www.flaticon.com/search?author_id=448&style_id=1223](https://www.flaticon.com/search?author_id=448&style_id=1223)                                                                                                 |
| Obrázky filamentov                                                       | Bambu Lab EU </br>Plasty Mladeč </br>eSun </br>Majkl3D-Technology s.r.o. </br>Prusa Research a.s. | Všetky súbory v priečinku `backend/images/filaments`                 | [eu.store.bambulab.com](eu.store.bambulab.com) </br> [www.filament-pm.cz](www.filament-pm.cz) </br> [esun3dstoreeu.com](esun3dstoreeu.com) </br> [www.majkl3d.sk](www.majkl3d.sk) </br> [www.prusa3d.com](www.prusa3d.com) |
