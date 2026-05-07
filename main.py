from flask import Flask, request, jsonify, send_from_directory, session, redirect
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os
from functools import wraps

app = Flask(__name__)
app.secret_key = "ekZeG:JoO4$tvC]c&q+G@o=3xuw*}X9P/C.V%zoS" 
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "users.db")

ALLOWED_PATHS = ['vhod.html', 'reg.html', 'login', 'register', '', 'css','css/style.css']

@app.before_request
def restrict_access():

    path = request.path.lstrip('/')
    
    if request.path.startswith('css/style.css') or request.path.startswith('/static/'):
        return
        
    if path in ALLOWED_PATHS:
        return

    if 'user_id' not in session:
        return redirect("/vhod.html")


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

with get_db_connection() as conn:
    conn.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
    """)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect('/vhod.html')
        return f(*args, **kwargs)
    return decorated_function



@app.route("/register", methods=["POST"])
def register_api():
    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")
    
    if not all([username, email, password]):
        return jsonify({"message": "❌ Заполните все поля"}), 400
    
    if len(password) < 6:
        return jsonify({"message": "❌ Пароль должен быть минимум 6 символов"}), 400
    
    hashed = generate_password_hash(password)
    try:
        with get_db_connection() as conn:
            conn.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                         (username, email, hashed))
        return jsonify({"message": "Регистрация завершена", "redirect": "/vhod.html"})
    except sqlite3.IntegrityError:
        return jsonify({"message": "❌ Ошибка: логин или email занят"}), 400

@app.route("/login", methods=["POST"])
def login_api():
    email = request.form.get("email")
    password = request.form.get("password")
    
    if not all([email, password]):
        return jsonify({"message": "❌ Заполните все поля"}), 400
    
    with get_db_connection() as conn:
        user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    
    if user and check_password_hash(user["password"], password):
        session["user_id"] = user["id"]
        session["username"] = user["username"] 
        return jsonify({"message": "✅ Доступ разрешен", "redirect": "/glavnaia.html"})
    
    return jsonify({"message": "❌ Неверный email или пароль"}), 401

@app.route("/api/me")
def get_me():
    if "user_id" not in session:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"username": session.get("username")})

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/vhod.html")


@app.route("/")
def root():
    if 'user_id' in session:
        return redirect("/glavnaia.html")
    return redirect("/vhod.html")

@app.route("/glavnaia.html")
@login_required
def glavnaia():
    return send_from_directory(BASE_DIR, "glavnaia.html")

@app.route("/<path:path>")
def static_files(path):

    if path.endswith('.css') or path.startswith('css/') or path in ALLOWED_PATHS:
        return send_from_directory(BASE_DIR, path)
    

    if 'user_id' not in session:
        return redirect('/vhod.html')
    
    return send_from_directory(BASE_DIR, path)
if __name__ == "__main__":
    print("🚀 Сервер запущен на http://localhost:5501")
    app.run(host="localhost", port=5501, debug=True)