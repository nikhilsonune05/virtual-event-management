# Virtual Event Management

This is a backend project built using Node.js, Express, and Sequelize with an in-memory SQLite database. It provides RESTful APIs to manage events, categories, participants, and user authentication.

## Features

- User registration and login using JWT
- Event creation, update, deletion, and retrieval
- Dynamic category creation with events
- User-to-event registration through a participants table (many-to-many)
- In-memory SQLite database for quick testing
- Unit tests using Jest and Supertest

Entities:

1. User Model: 
    - Email - required
    - Password - required
    - Mobile - optional
    - Role - required
    - Interests - optional

2. Events Model:
    - Name
    - Desc
    - Date
    - Time
    - Participants
    - Category
    - isAvilable

## Getting Started

### 1. Clone the Repository

git clone https://github.com/nikhilsonune05/virtual-event-management
cd virtual-event-management

### 2. Install Dependencies

npm install

### 3. Environment Variables

Create a `.env` file in the root directory and define the following:

PORT=4000  
JWT_SECRET=your_jwt_secret

## Running the Server

Start the development server:

npm run 

This will run the server with nodemon on the port defined in `.env`.

## Running Tests

All tests use an in-memory SQLite database to avoid affecting the real data.

npm test

## Folder Structure

.
├── config/              # DB configuration  
├── src/  
│   ├── controllers/     # Route handler logic  
│   ├── middlewares/     # middleware logic  
│   ├── models/          # Sequelize models  
│   ├── routes/          # Express route files  
│   ├── constants/       # Common status messages/constants  
│   ├── associations.js  # Model associations  
│   └── server.js        # Application entry point  
├── tests/               # Jest test cases and test helpers  
│   ├── auth.test.js  
│   ├── event.test.js  
│   ├── testServer.js  
│   └── testDatabase.js  
├── .env                 # Environment variables  
├── package.json  
└── README.md

## License

This project is licensed under the MIT License.


