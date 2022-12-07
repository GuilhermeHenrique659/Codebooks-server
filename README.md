# How Start:
 ## Requirements:
    - Docker
    - Node
 ## Commands:
 <p> 1 - <code> npm install </code> </p>

 <p> 2 - <code> docker-compose up -d db </code> </p>
 
 <p> 3 - <code> npm run typeorm -- -d ./src/shared/infra/database/index.ts migration:run </code> </p>
 
 <p> 4 - <code> npm run start </code> </p>
