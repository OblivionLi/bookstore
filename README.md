# Bookstore Application

Welcome to the Bookstore Application! This application is designed to provide a seamless and user-friendly experience for both customers and administrators. Below are the key features and functionalities:

---
## Features

### User Registration and Library Access
- Users can easily create accounts to access the extensive library.
- The library offers a wide range of books, including physical copies, audiobooks, and ebooks.

### User Section
- A dedicated user section enables users to manage their account settings.
- Users can update personal information, addresses, and conveniently review their order history.

### Book Section
- While viewing a book, the user can read and submit reviews.
- The review section provides valuable insights for users considering a purchase.

### Cart System and Secure Payments
- The application features a robust cart system for smooth shopping experiences.
- Secure payments are facilitated through the Stripe payment gateway.

### Admin Content Management System (CMS)
- Admins have access to a custom-built CMS for efficient content management.
- The CMS allows administrators to oversee and manage all aspects of the application's content.

---
### Installation
1. Replace the application.properties env. variables values
2. Build the Docker image for the backend:
    ```
    docker build -t dockerfile-backend -f Dockerfile-backend --no-cache .
    ```

3. Start the application using Docker Compose:
    ```
    docker-compose up --build
    ```
---   

## Tools Used

- Java
- Spring Boot
- Typescript
- Docker
- MySQL

---
Feel free to explore and enhance the Bookstore Application.