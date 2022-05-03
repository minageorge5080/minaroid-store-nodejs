# API Requirements
The company stakeholders want to create an online store to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

#### Products
- Index ````/products```` [GET]
- Show ````/products/(product-uid)```` [GET]
- Create ````/products````  [POST] (body: Product)[token required] 

#### Authentication
- Login  ````auth/login````(body: (username & password))
- Signup  ````auth/signup````(body: User)

#### Users
- Index  ````/users```` [token required]
- Show ````/users/(user-uid```` [token required]

#### Orders
- Current Order by user ````/orders/(product-uid)````  (args: user id)[token required]


## Data Shapes

#### Product
- id  [Number]
- uid [String]
- title [String]
- description [String]
- price [Number]

#### User
- id  [Number]
- uid [String]
- username [String]
- firstName [String]
- lastName [String]
- password [String]

* #### Orders
* - id
* - id of each product in the order
* - quantity of each product in the order
* - user_id
* - status of order (active or complete)
* 
