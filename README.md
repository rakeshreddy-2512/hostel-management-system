# Hostel Management System

A simple Flask-based Hostel Management System with:

- **Room allocation** for students
- **Fee tracking** (due/paid and status)
- **Complaint management** with resolve workflow
- **Admin dashboard** with summary metrics

## Tech Stack

- Python 3
- Flask
- SQLite
- HTML/CSS templates

## Features

### 1) Room Allocation
- Add hostel rooms with capacity.
- Allocate students to available rooms only.
- Occupancy is updated automatically.

### 2) Fee Tracking
- Add fee records per student.
- Track amount due, amount paid, due date, and payment status.

### 3) Complaints
- Submit complaints linked to students.
- View all complaints.
- Mark open complaints as resolved.

### 4) Admin Dashboard
- Total students
- Total rooms
- Vacant rooms
- Pending fee records
- Open complaints
- Recent complaints table

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
python app.py
```

Then open: `http://127.0.0.1:5000`

## Project Structure

```text
.
├── app.py
├── requirements.txt
├── static/
│   └── styles.css
└── templates/
    ├── base.html
    ├── dashboard.html
    ├── rooms.html
    ├── students.html
    ├── fees.html
    └── complaints.html
```

## Notes

- Database file `hostel.db` is auto-created on first run.
- Change `app.secret_key` in `app.py` for production use.
