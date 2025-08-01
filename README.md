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

## ScreenShots

<img width="3199" height="1731" alt="Screenshot 2025-07-31 230639" src="https://github.com/user-attachments/assets/3c0e1b02-0503-481e-b116-e16098f1df26" />


<img width="3165" height="1728" alt="Screenshot 2025-07-31 230651" src="https://github.com/user-attachments/assets/a1979c7a-3df1-4b19-b243-dd2d97de3ec3" />


<img width="3171" height="1732" alt="Screenshot 2025-07-31 230710" src="https://github.com/user-attachments/assets/0158c2ee-7d43-442e-8a1b-536ebc414e98" />


<img width="3199" height="1725" alt="Screenshot 2025-07-31 230720" src="https://github.com/user-attachments/assets/87392765-1787-4181-a196-912628d05388" />


<img width="3199" height="1727" alt="Screenshot 2025-07-31 230730" src="https://github.com/user-attachments/assets/50fac05d-4b4f-4c37-9237-960e915bb153" />


<img width="3165" height="1730" alt="Screenshot 2025-07-31 230805" src="https://github.com/user-attachments/assets/e746c361-d813-46d8-a20c-efb5d479a6db" />


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
