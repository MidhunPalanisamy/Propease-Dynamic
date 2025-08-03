🏠 Propease-Dynamic
A full-stack property listing and management platform with authentication, chat functionality, and interactive frontend views built using Spring Boot and ReactJS.

📚 Table of Contents
Overview

Features

Tech Stack

Project Structure

Installation

Running the App

API Overview

Contributing

License

📖 Overview
Propease-Dynamic is designed to manage and showcase properties through a modern web interface backed by a scalable backend. It supports user authentication, property creation, real-time messaging via WebSockets, and a clean React-based frontend.

✨ Features
🔐 User Sign-Up / Login (Authentication with Spring Security)

🏡 Create, View, and Manage Properties

🧠 Property logic handled dynamically via services

�� Real-time messaging using WebSockets

🌐 RESTful APIs for all major operations

🎨 Responsive React UI with reusable components

🧰 Tech Stack
🔧 Backend (Spring Boot)
Spring Boot (Java)

Spring Security (Auth)

Spring WebSocket (Live chat)

JPA / Hibernate

REST APIs

Maven

🌐 Frontend (ReactJS)
React.js (functional components)

CSS modules

Axios (for HTTP calls)

React Router

🗂 Project Structure
Backend — Propease-BE/
mathematica
Copy
Edit
├── Controllers/
│   ├── AuthController.java
│   ├── ChatController.java
│   └── PropCont.java
├── Services/
│   ├── AuthService.java
│   └── PropServ.java
├── Models/
│   ├── User.java
│   ├── Property.java
│   └── Message.java
├── Repository/
│   ├── UserRepository.java
│   └── PropRepo.java
├── Config/
│   └── WebSocketConfig.java
└── PropeaseBeApplication.java
Frontend — propease-FE/
typescript
Copy
Edit
├── public/
├── src/
│   ├── Assets/
│   ├── Components/
│   │   ├── CSS/
│   │   ├── AddProp.js
│   │   ├── Map.js
│   │   └── Login.js ...
│   ├── App.js
│   └── index.js
🚀 Installation
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/MidhunPalanisamy/Propease-Dynamic.git
cd Propease-Dynamic
2. Backend Setup (Spring Boot)
bash
Copy
Edit
cd Propease-BE
./mvnw clean install
Ensure that you have Java 17+ and Maven installed.

3. Frontend Setup (React)
bash
Copy
Edit
cd ../propease-FE
npm install
▶ Running the App
Start Backend (Spring Boot)
bash
Copy
Edit
cd Propease-BE
./mvnw spring-boot:run
By default, runs on: http://localhost:8080

Start Frontend (React)
bash
Copy
Edit
cd propease-FE
npm start
By default, runs on: http://localhost:3000

🔌 API Overview (Backend)
Method	Endpoint	Description
POST	/auth/signup	Register a new user
POST	/auth/login	Login and get token
GET	/prop/all	Get all properties
POST	/prop/create	Add a new property
WebSocket	/chat	Connect for messaging

Security is handled via JWT tokens passed in the Authorization header.

🧪 Development Tips
Make sure your backend and frontend ports don’t clash.

You may need to enable CORS in Spring for development.

React components are modular—add new pages easily via src/Components/.

🤝 Contributing
Fork the repo

Create your feature branch: git checkout -b feature/my-feature

Commit your changes: git commit -m "Add some feature"

Push to the branch: git push origin feature/my-feature

Submit a pull request

📄 License
This project is open-source and available under the MIT License.

🙌 Acknowledgements
Built with by Midhun Palanisamy and contributors.
