# Propease

A full-stack property management and real estate platform.

Propease simplifies real estate interactions by offering an interactive map-based property search, real-time community chat, property ownership tracking, and seamless payment integrations.

## Features

- **Interactive Property Maps**: View and explore properties using an interactive Leaflet map.
- **Real-Time Community Chat**: Connect with other users instantly via WebSockets (STOMP).
- **Property Management**: Add new properties, track ownership, and view your purchased properties.
- **Authentication**: User login and registration.
- **Payment System**: Record transactions and track user payment histories.

## Tech Stack

**Frontend**
- React 19
- React Router v7
- Leaflet & React-Leaflet
- STOMP.js & SockJS
- Axios

**Backend**
- Java 17
- Spring Boot 3.4
- Spring Data JPA
- Spring WebSockets
- MySQL
- Maven

## Project Structure

```text
Propease-Dynamic/
├── Propease-BE/             # Spring Boot Backend
│   ├── src/main/java/       # Java source files (Controllers, Models, Services)
│   └── src/main/resources/  # application.properties (Config)
└── propease-FE/             # React Frontend
    ├── public/              # Static assets
    └── src/                 # React components, routes, and styles
```

## Installation

### Prerequisites

- Node.js (v18+)
- Java 17
- MySQL
- Maven

### 1. Database Setup

Create a local MySQL database for the application:

```sql
CREATE DATABASE propease_db;
```

Update your backend credentials in `Propease-BE/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/propease_db
spring.datasource.username=root
spring.datasource.password=your_password
```

### 2. Backend (Spring Boot)

Navigate to the backend directory and run the Spring Boot application:

```bash
cd Propease-BE
./mvnw spring-boot:run
```

### 3. Frontend (React)

Open a new terminal, navigate to the frontend directory, install dependencies, and start the app:

```bash
cd propease-FE
npm install
npm start
```
*(The frontend runs on `http://localhost:3000`)*

## Configuration

The backend relies on the following key properties (`application.properties`):

| Variable | Description | Default |
| --- | --- | --- |
| `spring.datasource.url` | MySQL connection string | `jdbc:mysql://localhost:3306/propease_db` |
| `spring.datasource.username` | MySQL username | `root` |
| `spring.datasource.password` | MySQL password | `your_password` |
| `spring.jpa.hibernate.ddl-auto` | DB schema management | `update` |
| `spring.servlet.multipart.*` | File upload limits | `10MB` |

## Usage

1. **Sign Up / Login**: Open the app at `http://localhost:3000` and create an account.
2. **Explore**: Navigate to the map to find available properties.
3. **Add Properties**: Use the "Add Property" page to list new real estate.
4. **Community**: Join the community section to chat in real-time with other users.
5. **Manage**: View your owned properties in the profile dashboard.

## How It Works

- **Map Visualization**: The frontend uses Leaflet to plot properties. Property coordinates and details are fetched from the Spring Boot API.
- **WebSockets**: The real-time chat is powered by Spring WebSockets using STOMP. The React frontend uses `@stomp/stompjs` to subscribe to broadcast channels.
- **Data Persistence**: Spring Data JPA automatically maps Java entities (`User`, `Property`, `Payment`, `Message`) to the MySQL database, handling schema updates via Hibernate.
