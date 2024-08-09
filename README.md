## Installation
### Backend
    1. Navigate to the backend directory:
    ```
    cd backend
    ```

1. Install backend dependencies:
    ```
    npm install
    ```

### Frontend
1. Navigate to the frontend directory:
    ```
    cd frontend
    ```

2. Install frontend dependencies:
    ```
    npm install
    ```

# Usage
### Backend
1. Start the backend server:
    ```

    node index.js
    nodemon index.js

    ```

### Frontend
1. Navigate to the frontend directory:
    ```
    cd frontend
    ```


2. Start the frontend server:
   ```
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173/`
   You can now use the application.

## Features
- User authentication
- CRUD operations for the user
- API endpoints for managing data
- Responsive and dynamic frontend interface

## Dependencies
### Backend

 -"cors": "^2.8.5",
-"jsonwebtoken": "^9.0.2"

### Frontend
- React: ^18.3.3
- vite: ^5.2.0

## Configuration
### Backend
- Create a config.js file in the root directory with the following environment variables:

    ```
    const PORT= 3000;
    const mongoDBURL= ('mongodb+srv://samarxhiuxhesika:Xhesika1999.@cluster0.vxfzavg.mongodb.net/ChemnitzEducation')

    ```

### Frontend
- Check these files in the frontend directory with the backend API URL:
 1.Signup.tsx
 2.Login.tsx
 3.MapComponent.tsx
 4. UserProfile.tsx

## Documentation
- [React Vite Documentation](https://vitejs.dev/guide/)
- [Express Documentation](https://expressjs.com/en/4x/api.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)

## Troubleshooting
- Ensure MongoDB is running and accessible.
- Check for environment variables in the config.js file.
- Verify the backend server is running on the specified port.
- Ensure the frontend server is running and able to communicate with the backend API.
