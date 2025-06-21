import csv
import os
import sqlite3
from datetime import datetime
from collections import defaultdict


from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory, jsonify, send_file

app = Flask(__name__)
app.secret_key = "supersecretkey"

# Simple in-memory store to track IPs for the day
logged_ips = defaultdict(str)  # Format: {ip_address: 'YYYY-MM-DD'}
# Database setup
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


init_db()


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about-us")
def about():
    return render_template("about-us.html")

@app.route("/Health-Systems")
def Health():
    return render_template("Health-Systems.html")

@app.route("/Priority")
def Priority():
    return render_template("Priority.html")

@app.route("/Involved")
def Involved():
    return render_template("Involved.html")

@app.route("/Newsletter")
def Newsletter():
    return render_template("Newsletter.html")

@app.route("/Admin")
def Admin():
    return render_template("Admin.html")

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

@app.route("/contact", methods=["POST"])
def contact():
    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)", (name, email, message))
    conn.commit()
    conn.close()

    flash("Your message has been sent successfully!", "success")
    return redirect(url_for("home"))


@app.route('/subscribe', methods=['POST'])
def subscribe():
    if not request.is_json:
        return jsonify({'message': 'Invalid content type, expected application/json'}), 400

    data = request.get_json()
    if not data or 'email' not in data or not data['email']:
        return jsonify({'message': 'Email is required.'}), 400

    email = data['email']
    file_path = 'newsletter_subscriptions.csv'
    file_exists = os.path.isfile(file_path)

    try:
        with open(file_path, 'a', newline='') as csvfile:
            writer = csv.writer(csvfile)
            if not file_exists:
                writer.writerow(['Timestamp', 'Email'])
            writer.writerow([datetime.now().strftime('%Y-%m-%d %H:%M:%S'), email])
        return jsonify({'message': 'Thank you! Your subscription has been received.'}), 200
    except Exception as e:
        return jsonify({'message': f'Internal server error: {str(e)}'}), 500

@app.route('/admin/download-subscribers/<secret_key>')
def download_subscribers(secret_key):
    if secret_key != "BAHI_SECRET_2025":  # Change to a unique strong string
        return "Unauthorized access", 403

    file_path = 'newsletter_subscriptions.csv'
    if os.path.exists(file_path):
        return send_file(
            file_path,
            as_attachment=True,
            download_name='newsletter_subscriptions.csv',
            mimetype='text/csv'
        )
    return 'No subscriber data available.', 404


@app.route('/track-visitor', methods=['POST'])
def track_visitor():
    ip_address = request.remote_addr
    user_agent = request.headers.get('User-Agent')
    today = datetime.now().strftime('%Y-%m-%d')

    # Only log if not already logged today
    if logged_ips.get(ip_address) == today:
        return '', 204  # Already logged today

    log_path = 'visitor_log.csv'
    file_exists = os.path.isfile(log_path)

    try:
        with open(log_path, 'a', newline='') as csvfile:
            writer = csv.writer(csvfile)
            if not file_exists:
                writer.writerow(['Timestamp', 'IP Address', 'User Agent'])
            writer.writerow([datetime.now().strftime('%Y-%m-%d %H:%M:%S'), ip_address, user_agent])

        # Store this IP as logged for today
        logged_ips[ip_address] = today

        return '', 204
    except Exception as e:
        print(f"Error logging visitor: {e}")
        return 'Failed to log visitor', 500

@app.route('/download-visitors')
def download_visitors():
    log_path = 'visitor_log.csv'
    if os.path.exists(log_path):
        return send_file(
            log_path,
            as_attachment=True,
            download_name='visitor_log.csv',
            mimetype='text/csv'
        )
    return 'No visitor log available.', 404


### **RUN FLASK APP**
if __name__ == "__main__":
    app.run()
