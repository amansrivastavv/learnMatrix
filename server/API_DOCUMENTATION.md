# LearnMatrix API Documentation

Base URL: `http://localhost:5000`

## 1. System
### Health Check
- **Endpoint**: `/api/health`
- **Method**: `GET`
- **Auth Required**: No
- **Response**:
  ```json
  {
    "status": "ok",
    "timestamp": "2023-10-27T10:00:00.000Z"
  }
  ```

## 2. Authentication
### Register
- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "full_name": "John Doe"
  }
  ```

### Login
- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**: Returns `session` object containing `access_token`.

### Forgot Password
- **Endpoint**: `/api/auth/forgot`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```

### Logout
- **Endpoint**: `/api/auth/logout`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: `Bearer <access_token>`

## 3. Users (Protected)
**Note**: All endpoints below require the `Authorization` header.
- **Header**: `Authorization: Bearer <your_access_token>`

### Get All Users
- **Endpoint**: `/api/users`
- **Method**: `GET`

### Update Profile
- **Endpoint**: `/api/users/profile`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "id": "user_uuid_here",
    "bio": "Learning full stack development",
    "location": "New York, USA",
    "social_links": {
      "twitter": "@johndoe",
      "github": "johndoe"
    }
  }
  ```
