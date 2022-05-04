Minaroid Store backend
===========================

- An online store Apis.

Installation 
===========================
- Create ````.env```` file in project root folder.
- Add these variables to your ````.env```` file.
  - SERVER_PORT=SERVER-PORT
  - NODE_ENV=development
  - POSTGRES_HOST=DB-HOST
  - POSTGRES_DB=minaroid_store_dev
  - POSTGRES_TEST_DB=minaroid_store_test
  - POSTGRES_USER=DB-USER
  - POSTGRES_PASSWORD=DB-PASS

- Change database configrations in ````./db/database.json```` to match your local environment.
- Run ````npm install```` to download project dependencies. 
- For developemnt ````npm run watch```` . will automatically run database migrations.
- For compile & run  ````npm run start```` .  will automatically run database migrations.
- For migrations  ````npm run db:migrate```` .  will automatically run database migrations.

Testing
===========================
- To run integration test ````npm run test:integration````, will automatically create and delete database after testing.
- To run unit test ````npm run test:unit````
- To run development server ````npm run watch````
- For apis check ````REQUIREMENTS.md````

