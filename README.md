# Project

## Description
This project consists of  Angular frontend and  Node.js backend.The Project is a user and post management application that follows the MVC (Model-View-Controller) pattern. The application allows users to register, log in, create posts, and manage their profiles. Administrators have additional capabilities to manage users and posts.

## Table of Contents
- [Installation](#Installation)
- [Usage](#usage)
- [Build and Deploy](#build-and-deploy)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contact Information](#contact-information)

## Installation
Instructions on how to install and set up the project.

### Cloning the Repository
To clone the repository, run the following commands:

- git clone https://github.com/s1naf/project.git
- cd project

### Frontend
The frontend is located in the `Angular/project` directory. It is built using Angular and includes various components such as `navbar`, `user-update`, `post-by-username`, and more. To start the development server, open a terminal and navigate to the `Angular/project` directory and run:

- npm install
- ng serve

### Backend
The backend is located in the `Node` directory. It is built using Node.js and includes parts such as `middleware`,`controllers`,`routes`. To start the development server, navigate to the `Node` directory and run:

- npm install
- npm run dev

## Usage
Setting up the Environment Variables

1. Create a `.env` file in the `Node` directory.
2. Add the following environment variables to the `.env` file:
- `MONGODB_URI` = your_mongodb_uri
- `JWT_SECRET` = your_jwt_secret

Replace `your_mongodb_uri` with your actual MongoDB URI and `your_jwt_secret` with your desired JWT secret.

### Running the Application
1. Start the Angular frontend:
- cd `Angular/project`
- npm install
- ng serve

2. Start the Node.js backend:
- cd `Node`
- npm install
- npm run dev

3. Open your browser and navigate to http://localhost:4200/ to view the application.

## Build and Deploy
1. To build the Angular frontend for production, navigate to the `Angular/project` directory and run:
- npm run build
    - This will create a `dist/` directory with the production build of the Angular application.
    - You can deploy the contents of the dist/ directory to any static file server or hosting service, such as GitHub Pages, Netlify, or Vercel.

2. To deploy the Node.js backend, you will need to set up a server environment. Here are the general steps:
- You can use services like Heroku, AWS, DigitalOcean, or any other cloud provider.
- On your server, navigate to the `Node` directory and run:
    npm install
- Make sure to set the necessary environment variables (MONGODB_URI, JWT_SECRET, etc.) on your server.
- Run the following command to start the server:
    npm start

### Environment Configuration

 **Update `environments` for production**:
   - Open the `environment.ts` file in the `src/environments` directory.
   - Update the configuration to match your production environment:
     ```typescript
     export const environment = {
       production: true,
       apiUrl: 'https://your-production-api-url'
     };
     ```


## Features
- **User Authentication and Authorization**: Secure login and registration with JWT-based authentication.
- **Role-based Access Control**: Different access levels for users and admins.
- **CRUD Operations**: Create, read, update, and delete operations for posts and users.
- **Admin Panel**: Manage users and posts through an admin dashboard.
- **Design**: Design using Angular Material and Bootstrap.
- **Real-time Updates**: Real-time updates using WebSockets.
- **RESTful API**: Well-documented API endpoints for easy integration.
- **Error Handling**: Comprehensive error handling and logging using Winston.
- **Environment Configuration**: Easy configuration using environment variables.
- **Testing**: Tests using Jest and Supertest.
- **Swagger Documentation**: API documentation available at `http://localhost:3000/api-docs`.
- **Security**: Implemented security best practices including CORS, Helmet.
- **Pagination**: Efficient data retrieval with pagination support.
- **Middleware**: Custom middleware for authentication, authorization,paginator.



## API Documentation
The API documentation is generated using Swagger and can be accessed at `http://localhost:3000/api-docs`.

### Example Endpoints

- **GET /api/users/admin/view**: Returns all users for admin
    - **Request**:
        GET http://localhost:3000/api/users/admin/view
    - **Response**:
        [
            {
                "username": "testuser",    
                "role": "user"
            },
            {
                "username": "adminuser",
                "role": "admin"
            }
        ]


- **POST /api/users/register**: Create a new user
    - **Request**:
        POST http://localhost:3000/api/users/register
        Content-Type: application/json
        {
            "username": "newuser",
            "firstname": "New",
            "lastname": "User",
            "email": "newuser@example.com",
            "password": "password123",
            "age": 25
        }
    - **Response**:
        {
            username:"newuser"
            firstname:"New"
            lastname:"User"
            email:"newuser@example.com"
            password:"$2b$10$.lhM7wPbClpTxOtV8ykZyeq2zz3ffG/0GEX5d02sfmo/lb5MffTay"
            age:25
            posts:[]
            role:"user"
            _id:"67aa08f7cf76e245cb338013"
            createdAt:"2025-02-10T14:11:05.175Z"
            updatedAt:"2025-02-10T14:11:05.175Z"
        }
        

- **POST /api/users/login**: Login a user
    - **Request**:
       POST http://localhost:3000/api/users/login
        Content-Type: application/json
        {
            "username": "newuser",
            "password": "password123"
        }
    - **Response**:
        {
            "token": "jwt-token"
        }

- **GET /api/posts**: Returns all posts
    - **Request**:
       GET http://localhost:3000/api/posts

    - **Response**:
        content:"test"
        date: "Mon Feb 10 2025 16:16:57 GMT+0200 (Eastern European Standard Time)"
        username: "newuser"
        _id: "67aa0a59cf76e245cb33802a"

- **POST /api/posts/{username}/create**: Create a new post for a user
    - **Request**:
       POST http://localhost:3000/api/posts/newuser/create
        Content-Type: application/json
        {
            "content": "This is the content of the new post."
        }
    - **Response**:
        {
            acknowledged: true
            matchedCount:1
            modifiedCount:1
            upsertedCount:0
            upsertedId:null
        }

- **PATCH /api/posts/{username}/update**: Update a post for a user
    - **Request**:
        PATCH http://localhost:3000/api/posts/newuser/update
        Content-Type: application/json
        {
            "_id": "3",
            "content": "This is the updated content of the post."
        }
    - **Response**:
        {
        content:"This is the updated content of the post."
        date:"Mon Feb 10 2025 16:25:25 GMT+0200 (Eastern European Standard Time)"
        _id:"67aa0c55cf76e245cb33803d"
        }   

- **DELETE /api/posts/{username}/delete**: Delete a post for a user
    - **Request**:
        DELETE http://localhost:3000/api/posts/newuser/delete
        Content-Type: application/json
        {
        "_id": "3"
        }
    - **Response**:
        {
        acknowledged:true
        matchedCount:1
        modifiedCount:1
        upsertedCount:0
        upsertedId:null
        }

- **GET /api/posts/latest**: Retrieve the latest posts
    - **Request**:
        GET http://localhost:3000/api/posts/latest
    - **Response**:
        [
            {
             username: 'newuser',
             posts: {
                     content: 'This is the updated content of the post.',
                     _id: '67aa0c55cf76e245cb33803d',
                     date: 'Mon Feb 10 2025 16:25:25 GMT+0200 (Eastern European Standard Time)'
                    }
            },
            {
             username: 'adminuser',
             posts: {
                     content: 'Admin Post.',
                     _id: '67aa0c55cf76e245cb33803d',
                      date: 'Mon Feb 10 2025 16:25:25 GMT+0200 (Eastern European Standard Time)'
                    }
            }
        ]

## Testing
Navigate to the `Node` directory, to run the tests, use the following command:

- npm test

## Contact Information
For any inquiries, please contact the project maintainer at:

**Email**: kavvadiastheofanis@gmail.com
**GitHub**: https://www.github.com/s1naf
