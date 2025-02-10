const m2s = require('mongoose-to-swagger');
const User = require('./models/user-model');

exports.options = {
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Node API",
        "description": "Posts and Users application with Node.js and MongoDB, with Swagger documentation, CORS, Helmet, CookieParser, validations, and JWT for authentication, custom roles Admin and User",
        "contact": {
            "name": "Theofanis",
            "email": "theofaniskavvadias@gmail.com"
        }
    },
    "components": {
        "schemas": {
            "User": m2s(User),
            "Post": {
                "type": "object",
                "properties": {
                    "content": {
                        "type": "string"
                    },
                    "date": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "_id": {
                        "type": "string"
                    }
                }
            }
        },
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    },
    "security": [
        {
            "bearerAuth": []
        }
    ],
    "servers": [
        {
            "url": "http://localhost:3000",
            "description": "Local server"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "Requests for Users"
        },
        {
            "name": "Posts",
            "description": "Requests for user's posts"
        }
    ],
    "paths": {
        "/api/users/admin/view": {
            "get": {
                "tags": ["Users"],
                "description": "Returns all users",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "responses": {
                    "200": {
                        "description": "List of all users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/admin/delete/{username}": {
            "delete": {
                "tags": ["Users"],
                "description": "Delete a user",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User deleted",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/checkemail": {
            "get": {
                "tags": ["Users"],
                "description": "Check if email exists",
                "responses": {
                    "200": {
                        "description": "Email check result",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/checkusername": {
            "get": {
                "tags": ["Users"],
                "description": "Check if username exists",
                "responses": {
                    "200": {
                        "description": "Username check result",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/register": {
            "post": {
                "tags": ["Users"],
                "description": "Create a new user",
                "requestBody": {
                    "description": "Data for user that we create",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/User"
                            }
                        }
                    },
                    "required": ["username", "firstname", "lastname", "email", "password", "age"]
                },
                "responses": {
                    "200": {
                        "description": "User created",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/login": {
            "post": {
                "tags": ["Users"],
                "description": "Login a user",
                "requestBody": {
                    "description": "Login credentials",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    }
                                },
                                "required": ["username", "password"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User logged in",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/{username}": {
            "get": {
                "tags": ["Users"],
                "description": "Returns a user",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/update/credentials": {
            "patch": {
                "tags": ["Users"],
                "description": "Update user credentials",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "requestBody": {
                    "description": "Data for user update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/User"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User updated",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/admin/edit/role": {
            "patch": {
                "tags": ["Users"],
                "description": "Update user role",
                "security": [
                    {
                        "bearerAuth": []
                    }
                ],
                "requestBody": {
                    "description": "Data for role update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {
                                        "type": "string"
                                    },
                                    "role": {
                                        "type": "string"
                                    }
                                },
                                "required": ["username", "role"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User role updated",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/posts": {
            "get": {
                "tags": ["Posts"],
                "description": "Returns all posts",
                "parameters": [
                    {
                        "name": "page",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "List of all posts",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Post"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/posts/{username}": {
            "get": {
                "tags": ["Posts"],
                "description": "Returns posts of a user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "List of posts of a user",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Post"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/posts/{username}/create": {
            "post": {
                "tags": ["Posts"],
                "description": "Create a new post for a user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "description": "Data for the new post",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "post": {
                                        "type": "string"
                                    }
                                },
                                "required": ["post"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Post created",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Post"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/posts/{username}/update": {
            "patch": {
                "tags": ["Posts"],
                "description": "Update a post for a user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "description": "Data for the post update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "_id": {
                                        "type": "string"
                                    },
                                    "post": {
                                        "type": "string"
                                    }
                                },
                                "required": ["_id", "post"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Post updated",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Post"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/posts/{username}/delete": {
            "delete": {
                "tags": ["Posts"],
                "description": "Delete a post for a user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "description": "Data for the post to delete",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "_id": {
                                        "type": "string"
                                    }
                                },
                                "required": ["_id"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Post deleted",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Post"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/posts/latest": {
            "get": {
                "tags": ["Posts"],
                "description": "Returns the latest posts",
                "parameters": [
                    {
                        "name": "page",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "List of the latest posts",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Post"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};