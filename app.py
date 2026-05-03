from datetime import datetime
import sqlite3
from pathlib import Path
from flask import Flask, g, redirect, render_template, request, url_for, flash

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "hostel.db"

app = Flask(__name__)
app.secret_key = "change-this-secret"


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(exception=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db():
    db = sqlite3.connect(DB_PATH)
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_number TEXT UNIQUE NOT NULL,
            capacity INTEGER NOT NULL,
            occupied INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            course TEXT,
            room_id INTEGER,
            check_in_date TEXT,
            FOREIGN KEY(room_id) REFERENCES rooms(id)
        );

        CREATE TABLE IF NOT EXISTS fees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            amount_due REAL NOT NULL,
            amount_paid REAL NOT NULL DEFAULT 0,
            due_date TEXT,
            status TEXT NOT NULL DEFAULT 'Pending',
            FOREIGN KEY(student_id) REFERENCES students(id)
        );

        CREATE TABLE IF NOT EXISTS complaints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            subject TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Open',
            created_at TEXT NOT NULL,
            FOREIGN KEY(student_id) REFERENCES students(id)
        );
        """
    )
    db.commit()
    db.close()


@app.route("/")
def dashboard():
    db = get_db()
    metrics = {
        "students": db.execute("SELECT COUNT(*) FROM students").fetchone()[0],
        "rooms": db.execute("SELECT COUNT(*) FROM rooms").fetchone()[0],
        "vacant_rooms": db.execute("SELECT COUNT(*) FROM rooms WHERE occupied < capacity").fetchone()[0],
        "pending_fees": db.execute("SELECT COUNT(*) FROM fees WHERE status != 'Paid'").fetchone()[0],
        "open_complaints": db.execute("SELECT COUNT(*) FROM complaints WHERE status = 'Open'").fetchone()[0],
    }

    recent_complaints = db.execute(
        """
        SELECT c.id, s.name, c.subject, c.status, c.created_at
        FROM complaints c
        JOIN students s ON s.id = c.student_id
        ORDER BY c.created_at DESC
        LIMIT 5
        """
    ).fetchall()
    return render_template("dashboard.html", metrics=metrics, complaints=recent_complaints)


@app.route("/rooms", methods=["GET", "POST"])
def rooms():
    db = get_db()
    if request.method == "POST":
        db.execute(
            "INSERT INTO rooms (room_number, capacity, occupied) VALUES (?, ?, 0)",
            (request.form["room_number"], int(request.form["capacity"])),
        )
        db.commit()
        flash("Room added successfully.")
        return redirect(url_for("rooms"))

    room_rows = db.execute("SELECT * FROM rooms ORDER BY room_number").fetchall()
    return render_template("rooms.html", rooms=room_rows)


@app.route("/students", methods=["GET", "POST"])
def students():
    db = get_db()
    if request.method == "POST":
        name = request.form["name"]
        email = request.form["email"]
        course = request.form.get("course")
        room_id = int(request.form["room_id"])

        room = db.execute("SELECT * FROM rooms WHERE id = ?", (room_id,)).fetchone()
        if not room or room["occupied"] >= room["capacity"]:
            flash("Selected room is full or invalid.")
            return redirect(url_for("students"))

        db.execute(
            "INSERT INTO students (name, email, course, room_id, check_in_date) VALUES (?, ?, ?, ?, ?)",
            (name, email, course, room_id, datetime.utcnow().date().isoformat()),
        )
        db.execute("UPDATE rooms SET occupied = occupied + 1 WHERE id = ?", (room_id,))
        db.commit()
        flash("Student allocated to room successfully.")
        return redirect(url_for("students"))

    student_rows = db.execute(
        """
        SELECT s.id, s.name, s.email, s.course, s.check_in_date, r.room_number
        FROM students s
        LEFT JOIN rooms r ON s.room_id = r.id
        ORDER BY s.id DESC
        """
    ).fetchall()
    available_rooms = db.execute("SELECT * FROM rooms WHERE occupied < capacity ORDER BY room_number").fetchall()
    return render_template("students.html", students=student_rows, rooms=available_rooms)


@app.route("/fees", methods=["GET", "POST"])
def fees():
    db = get_db()
    if request.method == "POST":
        student_id = int(request.form["student_id"])
        amount_due = float(request.form["amount_due"])
        amount_paid = float(request.form.get("amount_paid", 0) or 0)
        due_date = request.form.get("due_date") or None
        status = "Paid" if amount_paid >= amount_due else "Pending"

        db.execute(
            "INSERT INTO fees (student_id, amount_due, amount_paid, due_date, status) VALUES (?, ?, ?, ?, ?)",
            (student_id, amount_due, amount_paid, due_date, status),
        )
        db.commit()
        flash("Fee record added.")
        return redirect(url_for("fees"))

    fee_rows = db.execute(
        """
        SELECT f.id, s.name, f.amount_due, f.amount_paid, f.due_date, f.status
        FROM fees f JOIN students s ON s.id = f.student_id
        ORDER BY f.id DESC
        """
    ).fetchall()
    students_list = db.execute("SELECT id, name FROM students ORDER BY name").fetchall()
    return render_template("fees.html", fees=fee_rows, students=students_list)


@app.route("/complaints", methods=["GET", "POST"])
def complaints():
    db = get_db()
    if request.method == "POST":
        db.execute(
            "INSERT INTO complaints (student_id, subject, description, created_at) VALUES (?, ?, ?, ?)",
            (
                int(request.form["student_id"]),
                request.form["subject"],
                request.form["description"],
                datetime.utcnow().isoformat(timespec="seconds"),
            ),
        )
        db.commit()
        flash("Complaint submitted.")
        return redirect(url_for("complaints"))

    complaint_rows = db.execute(
        """
        SELECT c.id, s.name, c.subject, c.description, c.status, c.created_at
        FROM complaints c JOIN students s ON s.id = c.student_id
        ORDER BY c.id DESC
        """
    ).fetchall()
    students_list = db.execute("SELECT id, name FROM students ORDER BY name").fetchall()
    return render_template("complaints.html", complaints=complaint_rows, students=students_list)


@app.route("/complaints/<int:complaint_id>/resolve", methods=["POST"])
def resolve_complaint(complaint_id: int):
    db = get_db()
    db.execute("UPDATE complaints SET status = 'Resolved' WHERE id = ?", (complaint_id,))
    db.commit()
    flash("Complaint marked as resolved.")
    return redirect(url_for("complaints"))


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
