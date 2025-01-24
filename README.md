# Filamenty

Fullstack webová aplikácia na správu filamentov do 3D tlačiarne

Aplikácia umožňuje vytvoriť zoznam filamentov a následne v ňom upravovať, pridávať a odoberať filamenty  
Navyše aplikácia generuje pre filamenty štítky s QR kódami, ktoré po naskenovaní umožňujú jednoducho spravovať dané filamenty

## Použité technológie

- Backend
  - Python - Hlavný programovací jazyk
  - Flask - Webový framework na vytvorenie API a obsluhu požiadaviek
  - SQLite - Databáza na uchovávanie informácií o filamentoch
  - qrcode - Python knižnica na generovanie QR kódov
- Frontend
  - React a JavaScript - Tvorba dynamického používateľského rozhrania
  - Axios - Vykonávanie HTTP požiadaviek
- Ostatné
  - Docker a docker-compose - Kontajnerizácia pre jednoduchšie nasadenie aplikácie

## Použité zdroje

- Dokumentácia Python knižnice _qrcode_ dostupná na stránke [https://pypi.org/project/qrcode/](https://pypi.org/project/qrcode/)
- Článok _"How To Use Axios With React"_ dostupný na stránke [https://www.freecodecamp.org/news/how-to-use-axios-with-react/](https://www.freecodecamp.org/news/how-to-use-axios-with-react/)
