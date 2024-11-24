## Project Overview

This project demonstrates a token-based authentication system using Node.js, Express, MongoDB, and Passport.js.
[NB : (In this project i cannot follow the folder structure because of my back pain started )]

## Steps to Set Up and Use the Project

1. **Clone the Repository**

```sh
https://github.com/ashaduzzaman10/token-based-auth.git

cd token-based-auth/server
```

2. **Install Dependencies**

```sh
npm install
```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:

```
DBURL=<your-mongodb-url>
SECRET_KEY=<your-secret-key>
PORT=<your-port>
```

4. **Start the Server**

```sh
npm start
```

5. **API Endpoints**

- **Register User**

  ```
  POST /register
  Body: { "userName": "your-username", "password": "your-password" }
  ```

- **Login User**

  ```
  POST /login
  Body: { "userName": "your-username", "password": "your-password" }
  ```

- **Get User Profile**

  ```
  GET /profile
  Headers: { "Authorization": "Bearer <your-jwt-token>" }
  ```

- **Health Check**

  ```
  GET /health
  ```

- **Home Route**
  ```
  GET /
  ```

## Project Structure

- `config/`
  - `db/dbConnection.js`: Database connection setup.
  - `passport/passport.js`: Passport.js configuration for JWT strategy.
- `models/`
  - `userModel.js`: Mongoose schema and model for user.
- `routes/`
  - `app.js`: Main application routes and middleware.
- `index.js`: Entry point of the application.

## Additional Information

- Ensure MongoDB is running and accessible.
- Use tools like Postman to test the API endpoints.
- The project uses JWT for securing routes and user authentication.
