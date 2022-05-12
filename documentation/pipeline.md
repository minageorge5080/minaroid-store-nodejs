Minaroid Store Pipline
===========================

- backend-test
  -  run unit test cases
  -  run integration test cases & launch postgres docker images for test.

- backend-deploy
  -  add production env variables to Elastic beanstalk configrations.
  -  zip the build & migrations & package.json & database.json and package-lock.json then upload it to Elastic beanstalk.


- frontend-deploy
  -  copy the build folder to application bucket on s3.