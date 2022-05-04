Minaroid Store backend
===========================

- An online store Apis.

Installation 
===========================
- Create ````.env```` file in project root folder.
- Add these variables to your ````.env```` file.
  - SERVER_PORT=2000
  - NODE_ENV=development
  - POSTGRES_HOST=localhost
  - POSTGRES_PORT=5430
  - POSTGRES_DB=minaroid_store_dev
  - POSTGRES_TEST_DB=minaroid_store_test
  - POSTGRES_USER=postgres
  - POSTGRES_PASSWORD=admin
  - SALT_PASSWORD=10
  - BCRYPT_PASSWORD=MinaRoid12809@l234234
  - TOKEN_SECRET=minaroid000012032

- Run ````docker-compose up -d ```` to install databse docker contianer. 
- Run ````npm install```` to download project dependencies. 
- For developemnt ````npm run watch```` . will automatically run database migrations.
- For compile & run  ````npm run start```` .  will automatically run database migrations.
- For run migrations  only  ````npm run db:migrate```` 

Testing
===========================
- To run integration test ````npm run test:integration````, will automatically create and delete database after testing.
- To run unit test ````npm run test:unit````
- To run development server ````npm run watch````
- For apis check ````REQUIREMENTS.md````

