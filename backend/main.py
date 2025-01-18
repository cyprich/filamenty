import sqlite3
from flask import Flask, jsonify, abort
from typing import Any

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


@app.route("/")
def index():
    return jsonify(message="Hello from backend!")


@app.route("/filaments")
def filaments():
    curs.execute("SELECT * FROM filaments")
    resp = curs.fetchall()

    parsed_filaments: list[dict[str, Any]] = []

    for row in resp:
        parsed_filaments.append({fields[i]: row[i] for i in range(len(fields))})

    return jsonify(filaments=parsed_filaments)


@app.route("/filaments/<int:id>")
def filament(id: int):
    if id > len(fields):
        abort(404, description="Filament index out of range")

    curs.execute("SELECT * FROM filaments WHERE id=?", (id,))
    resp = curs.fetchone()

    if resp is None:
        abort(404, description="Filament not found")

    return jsonify(filament={fields[i]: resp[i] for i in range(len(fields))})


if __name__ == "__main__":
    conn = sqlite3.connect("filaments.db", check_same_thread=False)
    curs = conn.cursor()

    app.run("127.0.0.1", 5000)

    conn.close()
