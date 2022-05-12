<p >
  <a href="https://app.circleci.com/pipelines/github/minageorge5080/minaroid-store-nodejs?branch=master&filter=all">
    <img src="https://img.shields.io/circleci/build/github/minageorge5080/minaroid-store-nodejs/master.svg?logo=circleci&logoColor=fff&label=CircleCI" alt="CI status" />
  </a>&nbsp;
</p>

<hr>Minaroid Store backend
===========================

- An online store Apis.

Installation 
===========================
- Create ````.env```` file in project root folder.
- Add these variables to your ````backend/.env```` file.
  - SERVER_PORT=3000
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

- Add this variable to your ````frontend/.env```` file.
    - REACT_APP_PRODUCTS_API_URL=http://localhost:3000


- Run ````cd backend && docker-compose up -d ```` to install databse docker contianer. 
- Run ````npm run backend:install```` and ````npm run frontend:install```` to download project dependencies. 
- Run backend in development mode ````npm run backend:develop```` . will automatically run database migrations.
- Run backend  ````npm run backend:start```` .  will automatically run database migrations.
- Run frontend  ````npm run frontend:start````
- For run migrations  only  ````cd backend && npm run db:migrate```` 

Testing
===========================
- To run integration test ````npm run backend:test:integration````, will automatically create and delete database after testing.
- To run unit test ````npm run backend:test:unit````
- For apis check ````REQUIREMENTS.md````
- Backend url : ````http://minaroid-store.eba-rvjzq2ci.us-east-1.elasticbeanstalk.com````
- Frontend url : ````http://minaroid-store.s3-website-us-east-1.amazonaws.com/````


