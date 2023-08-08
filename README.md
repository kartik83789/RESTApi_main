# RESTApi_main
REST API specifically designed for e-commerce applications. With JWT authentication.
It is built using **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **JWT authentication**. The API provides various features for managing products, orders, and user authentication.

## Features

- **Get products**: Retrieve a list of products.
- **Get product by ID**: Retrieve detailed information about a specific product.
- **Create product**: Add a new product to the inventory.
- **Delete product**: Remove a product from the inventory.
- **Get orders**: Fetch a list of orders.
- **Get order by ID**: Retrieve detailed information about a specific order.
- **Create order**: Place a new order.
- **Delete order**: Remove an order from the system.
- **User signup**: Allow users to sign up using their email and password.
- **User login**: Authenticate users and generate a JWT token for authorization.
- **User delete**: Delete a user account.

## Folder Structure

The project follows a common folder structure for organizing different components:

- **controllers**: Contains the logic for handling API requests and responses.
- **middleware**: Includes middleware functions for handling authentication and other request processing.
- **routes**: Defines the API routes and maps them to the respective controller functions.
- **models**: Contains the data models or schemas for MongoDB using Mongoose.

## Dependencies

The following dependencies are used in this project:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt
- JSON Web Token (JWT)

## Getting Started

To get started with the API, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies using `npm install`.
3. Set up a MongoDB database, preferably using the MongoDB Atlas cloud service.
4. Configure the connection to the MongoDB database in the project.
5. Set the JWT secret key in the environment variable.
6. Start the server using `npm start`.


## Security

The API uses bcrypt service to securely store and compare passwords. It also utilizes JWT authentication for user login and authorization.

## Usage
Use mongoDB local or Add your own Mongo Atlas Admin Username, (required to be updated in nodemon.json)
