import sqlite3
from typing import Any

from flask import Flask, jsonify
from flask_cors import CORS  # cross-origin resource sharing - for frontend

fields = (
    "id",
    "vendor",
    "material",
    "price",
    "color_hex",
    "color_second_hex",
    "dark_mode",
    "weight",
    "weight_orig",
    "weight_spool",
    "temp_min",
    "temp_max",
)


app = Flask(__name__)
CORS(app)


def get_conn() -> sqlite3.Connection:
    return sqlite3.connect("filaments.db", check_same_thread=False)


@app.route("/api", methods=["GET"])
def index():
    return jsonify(message="Hello from backend!")


@app.route("/api/filaments/", methods=["GET"])
def filaments():
    conn = get_conn()
    curs = conn.cursor()

    curs.execute("SELECT * FROM filaments")
    resp = curs.fetchall()

    parsed_filaments: list[dict[str, Any]] = []

    for row in resp:
        parsed_filaments.append({fields[i]: row[i] for i in range(len(fields))})

    conn.close()
    return jsonify(filaments=parsed_filaments)


@app.route("/api/filaments/<int:id>/", methods=["GET"])
def filament(id: int):
    conn = get_conn()
    curs = conn.cursor()

    if id > len(fields):
        return {"error": "Filament index out of range"}, 404

    curs.execute("SELECT * FROM filaments WHERE id=?", (id,))
    resp = curs.fetchone()

    if resp is None:
        return {"error": "Filament not found"}, 404

    conn.close()
    return jsonify(filaments={fields[i]: resp[i] for i in range(len(fields))})


if __name__ == "__main__":
    app.run("0.0.0.0", 5000)
