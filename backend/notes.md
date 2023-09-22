# Backend refactoring

1. Driftsatte MongoDB databas enligt [instruktionerna](https://jsramverk.se/deploy)
   - `databas.js` exporterar nu en klient som kan användas för att nå databasen.
   -  `.env` innehåller inloggning till databasen
   -  `app.js` importerar inloggning från `.env`

2. Istället för att exportera klienten i `database.js` vill vi exportera databasen för undvika att behöva koppla upp till klienten och hämta databasen i varje modul som använder den. Därför ändrade vi så att `database.js` exporterar databas-objektet.

3. För underlätta och hålla koden mer organiserad gjorde vi backend-filerna till ES moduler. Detta gör det enklare att exportera och importera objekt mellan modulerna och hålla koden med städad. 

4. `loadEnvironment.mjs` är skapad för att kunna nå miljövariabler i modulerna på ett smidigare sätt.

5. `.env` är tillagt i `.gitignore` för att förhindra spridning av lösenord och nyklar.