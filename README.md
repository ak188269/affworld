# AffWorld Project

AffWorld is a web application that consists of both frontend and backend components. Follow the instructions below to set up and run the project.

## Frontend Setup

1. Navigate to the `frontend` directory.

    ```bash
    cd frontend
    ```


2. To start the frontend development server, run the following command:

    ```bash
    npm run dev
    ```

## Backend Setup

1. Navigate to the `backend` directory.

    ```bash
    cd backend
    ```

2. Create a file named `.env` in the `backend` directory and add the following environment variables. 

    ```plaintext
    DB_URL
    PORT
    SECRET
    JWT_SECRET_KEY
    GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET
    GOOGLE_CALLBACK_URL
    FRONTEND_URL
    ```

3. Provide the values for the environment variables in the `.env` file. The sample values are provided below:

    ```plaintext
    DB_URL=mongodb://127.0.0.1:27017/affworld
    PORT=8080
    JWT_SECRET_KEY=secretforjwttoken
    GOOGLE_CLIENT_ID=your_client_id
    GOOGLE_CLIENT_SECRET=your_secret
    GOOGLE_CALLBACK_URL=http://localhost:8080/api/v1/user/auth/google/callback
    FRONTEND_URL=http://localhost:3000/
    ```

4. Save the `.env` file.

5. To start the backend server, run the following command:

    ```bash
    npm start
    ```


Now, both the backend and frontend of AffWorld should be up and running. Access the application through the specified `FRONTEND_URL` in your browser.
```
