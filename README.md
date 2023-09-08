# train-controller

## Assignment 1

### Få applikationen att fungera
1. Skapade GitHub-repo & la till .gitignore
2. Körde `npm audit fix --dry-run --json` och skrev output till .json-fil
3. Körde `npm audit fix` vilket ledde till 0 vulnerabilites
4. La till dev-kommando i pacakge.json (`npm run dev` -> `node app.js`)
5. Kör `npm run dev`, får error:

    ```
    > backend@1.0.0 dev
    > node app.js

    Example app listening on port 1337
    /Users/malinolsson/dev/bth/js-ramverk/train-controller/backend/models/trains.js:22
        const sseurl = result.RESPONSE.RESULT[0].INFO.SSEURL
                                                      ^

    TypeError: Cannot read properties of undefined (reading 'SSEURL')
        at fetchTrainPositions (/Users/malinolsson/dev/bth/js-ramverk/train-controller/backend/models/trains.js:22:51)
        at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

    Node.js v20.5.1
    ```
   Api-key är inte definerad därför uppstår felet i trains.js.

6. Skapa API-key på trafikverkets hemsida
7. Spara API-key i env-fil
8. Kör `npm run dev`
   Får följade utskrift:

    ```
    > backend@1.0.0 dev
    > node app.js

    Example app listening on port 1337
    Connection to server opened.
    ```
   Backend fungerar och snurrar på port 1337.

9. Testa API endpoints via Postman.
    1.  http://localhost:1337/delayed  
        Får `200 OK` och JSON objekt med försenade tåg.
    2. http://localhost:1337/tickets  
       Får `Error: socket hang up` och följande fel i konsolen:
        ```
        > backend@1.0.0 dev
        > node app.js

        Example app listening on port 1337
        Connection to server opened.
        node:internal/process/promises:288
                    triggerUncaughtException(err, true /* fromPromise */);
                    ^

        Error: SQLITE_ERROR: no such table: tickets
        --> in Database#all('SELECT *, ROWID as id FROM tickets ORDER BY ROWID DESC', [Function (anonymous)])
            at /Users/filiplindberg/dev/train-controller/backend/node_modules/sqlite/build/Database.js:189:21
            at new Promise (<anonymous>)
            at Database.all (/Users/filiplindberg/dev/train-controller/backend/node_modules/sqlite/build/Database.js:187:16)
            at Object.getTickets (/Users/filiplindberg/dev/train-controller/backend/models/tickets.js:7:35) {
          errno: 1,
          code: 'SQLITE_ERROR',
          __augmented: true
        }

        Node.js v18.12.1
        ```
    3. http://localhost:1337/codes
       Får `200 OK` och JSON objekt med koder.
10. Fixar tickets endpoint genom att:
    1. Ändra `db/` till `./` i `reset_db.bash`
    2. Köra `reset_db.bash` i terminalen
    3. När `npm run dev` körs och vi testar endpoint `/tickets` får vi nu `200 OK`, POST fungerar även och när GET körs efter får vi den ticket vi lagt till.

11. Testar att frontenden fungerar genom att köra `python3 -m http.server 9000` och gå in på 
    `http://localhost:9000/` i en webb-browser. Allt verkar fungera som det ska.

### Val av frontend-ramverk

I diskussion har vi kommit fram till följande krav på det ramverk vi vill använda i kursen:

- Nytt får båda
- Något som är mer "på uppgång"

Eftersom vi i tidigare kurser har jobbat med React väljs det bort.
Filip har under våren arbetat mycket med Vue så därför väljer vi bort det också.

När vi jämför Svelte och Angular kollar vi lite efter trender i användandet av båda ramverken och får uppfattningen 
av att Angular används mindre och mindre samt att Svelte är ett ramverk som blir mer och mer populärt. Därför kom vi 
fram till att Svelte blir ett bra ramverk att använda för den här kursen. 
