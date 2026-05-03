# Hospital Management System

A production-style full-stack **Hospital Management System** built with **React + Tailwind CSS** (frontend) and **Node.js + Express + MongoDB** (backend).

## Core Features

- **Authentication & Authorization**
  - JWT-based login/register
  - Role-aware access (`admin`, `doctor`, `staff`)
- **Patient Records Management**
  - Create, read, update, delete patient profiles
  - Medical history and emergency details
- **Appointment Management**
  - Schedule and update appointments
  - Status tracking (`scheduled`, `completed`, `cancelled`)
- **Doctor Dashboard**
  - Upcoming appointments view
  - Completed-appointment metrics
- **Billing Management**
  - Bill creation and tracking
  - Payment status (`pending`, `partial`, `paid`)

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcryptjs
- CORS + Morgan

---

## Project Structure

```
.
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── index.js
└── README.md
```

---

## Setup Instructions

### 1) Backend Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Backend runs by default on `http://localhost:5000`.

### 2) Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs by default on `http://localhost:5173`.

Set optional frontend API URL in `client/.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoints (Summary)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Patients
- `GET /api/patients`
- `POST /api/patients`
- `PUT /api/patients/:id`
- `DELETE /api/patients/:id`

### Appointments
- `GET /api/appointments`
- `POST /api/appointments`
- `PUT /api/appointments/:id`
- `GET /api/appointments/doctor/dashboard`

### Billing
- `GET /api/billing`
- `POST /api/billing`
- `PUT /api/billing/:id`

---

## Roadmap

- Advanced analytics and reporting
- Prescription and pharmacy module
- In-patient bed/ward management
- File uploads for diagnostic reports
- Email/SMS reminders for appointments

---

## License

This project is available under the MIT License.
