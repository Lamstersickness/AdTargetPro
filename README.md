# Ad Keyword Targeting App

A full-stack Java and React application for creating and searching targeted advertisements.

## Overview

This project is an ad creation and searching application where users can post advertisements with titles, descriptions, keywords, and images. All posted ads are stored in a MySQL database and can be retrieved and searched by keywords. The application features a Spring Boot backend and a React frontend with Tailwind CSS for styling.

## Features

  * **Ad Creation**: Users can create new ads by providing a title, description, keywords, and an optional image.
  * **Ad Listing and Searching**: View a paginated list of all ads and search for ads based on keywords.
  * **Image Uploads**: Supports image uploads for ads, which are stored in an `uploads/` directory.
  * **User Authentication**: JWT-based authentication for user registration and login.
  * **RESTful API**: A comprehensive REST API for managing ads and users.

## Technologies Used

### Backend

  * **Java**: The primary language for the backend.
  * **Spring Boot**: Framework for creating the REST API.
  * **MySQL**: Database for storing ad and user data.
  * **Spring Security**: For handling authentication and authorization.
  * **JPA (Hibernate)**: For object-relational mapping.
  * **Minio**: For cloud storage of uploaded files.
  * **Maven**: For project build and dependency management.
  * **Docker**: For containerizing the application.

### Frontend

  * **React**: JavaScript library for building the user interface.
  * **React Router**: For client-side routing.
  * **Axios**: For making HTTP requests to the backend API.
  * **Tailwind CSS**: For styling the application.
  * **Lucide React**: For icons.

## Getting Started

### Prerequisites

  * Java 21 or later
  * Maven 3.9 or later
  * Node.js and npm
  * MySQL

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ad-keyword-targeting-app.git
    cd ad-keyword-targeting-app/backend
    ```
2.  **Configure the database:**
      * Open `src/main/resources/application.properties`.
      * Update the `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` properties to match your MySQL setup.
3.  **Build and run the application:**
    ```bash
    mvn spring-boot:run
    ```
    The backend will be running on `http://localhost:8081`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    ```
    The frontend will be running on `http://localhost:3000`.

## License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.
