# Transaction Audit System

The Transaction Audit System is a full-stack web application that simulates a peer-to-peer fund transfer system with a mandatory, immutable audit trail.
The system ensures that every transaction attempt (successful or failed) is recorded and retrievable for auditing purposes.


**Key Objectives**

Implement a reliable fund transfer API

Maintain an immutable transaction audit log

Provide a clean, responsive frontend dashboard

Demonstrate real-world backend practices such as transactions, validation, and error handling


**Tech Stack**

Backend: Node.js, Express.js, Sequelize ORM, SQLite ,RESTful APIs

Frontend: React (Vite), Axios, CSS (custom styling)

Tooling: Postman – API testing, Git & GitHub 

AI Tools – ChatGPT, Gemini


**Setup & Run Instructions**

**Clone the Repository**

git clone https://github.com/<your-username>/transaction-audit-system.git
cd transaction-audit-system


**Backend Setup**

cd backend

npm install

npm start

-> Backend runs on: http://localhost:5000

-> SQLite database is auto-created on first run


**Frontend Setup**

cd frontend

npm install

npm run dev

->Frontend runs on: http://localhost:5173


## 🔗 API Documentation

### User APIs

#### Register User
POST /api/auth/register

Request Body:
```json
{
  "name": "Sammy",
  "email": "sammy@test.com",
  "password": "password123"
}
```
Response:

-> 201 Created – User registered successfully

-> 400 Bad Request – Validation error


### Transaction APIs

#### Transfer Funds
POST /transactions/transfer

Request Body:
```json
{
  "sender_id": 1,
  "receiver_id": 2,
  "amount": 200
}
```
Behavior:

-> Uses DB transactions

-> Logs SUCCESS or FAILED status

## 🗄️ Database Schema

### User Table
```json
| Field | Type | Description |
|------|------|-------------|
| id | INTEGER | Primary Key |
| name | STRING | User name |
| email | STRING | Unique email |
| password | STRING | Hashed password |

### Transaction Table

| Field | Type | Description |
|------|------|-------------|
| id | INTEGER | Primary Key |
| sender_id | INTEGER | Sender user ID |
| receiver_id | INTEGER | Receiver user ID |
| amount | FLOAT | Transfer amount |
| status | STRING | SUCCESS / FAILED |
| createdAt | DATETIME | Timestamp |
```


