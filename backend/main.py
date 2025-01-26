#!/usr/bin/env python3

import json
import random
import sqlite3
from typing import Any

import requests
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

from generate_qrcodes import generate_qrcodes

# re-generate qr codes
generate_qrcodes()

# items in database
fields = (
    "id",
    "vendor",
    "material",
    "price",
    "color_hex",
    "color_second_hex",
    "weight",
    "weight_orig",
    "weight_spool",
    "temp_min",
    "temp_max",
    "temp_bed_min",
    "temp_bed_max",
    "image_url",
)

# get server ip
with open("config.json", "r") as file:
    IP = json.load(file)["ip"]


# initialize app
app = Flask(__name__)
CORS(app)


# connects to database and returns the connection
def get_conn() -> sqlite3.Connection:
    return sqlite3.connect("filaments.db", check_same_thread=False)


# /api endpoint
@app.route("/api", methods=["GET"])
def index():
    return jsonify(message="Hello from backend!")


# endpoint for getting all info about filaments
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


# endpoint for getting info about specific filament by it's id
@app.route("/api/filaments/<int:id>/", methods=["GET"])
def filament(id: int):
    conn = get_conn()
    curs = conn.cursor()

    if id > len(fields) + 1:
        return {"error": "Filament index out of range"}, 404

    curs.execute("SELECT * FROM filaments WHERE id=?", (id,))
    resp = curs.fetchone()

    if resp is None:
        return {"error": "Filament not found"}, 404

    conn.close()
    return jsonify(filaments={fields[i]: resp[i] for i in range(len(fields))})


# endpoint for getting info about random filament
@app.route("/api/filaments/random/", methods=["GET"])
def filament_random():
    conn = get_conn()
    curs = conn.cursor()

    # get all ids
    response = requests.get(f"http://{IP}:5000/api/info/")

    if response.status_code != 200:
        return {"error": "Failed to get info"}, 500

    id = random.choice(response.json()["ids"])

    return requests.get(f"http://{IP}:5000/api/filaments/{id}/").json()

    # curs.execute("SELECT * FROM filaments WHERE id=?", (id,))
    # resp = curs.fetchone()
    #
    # if resp is None:
    #     return {"error": "Filament not found"}, 404
    #
    # conn.close()
    # return jsonify(filaments={fields[i]: resp[i] for i in range(len(fields))})


# # endpoint for adding filaments
# @app.route("/api/filaments/", methods=["POST"])
# def filament_post():
#     conn = get_conn()
#     curs = conn.cursor()
#
#     data = request.get_json()
#
#     # finding out what info user provided
#     insert = []
#     for i in fields:
#         try:
#             insert.append(data[i])
#         except error:
#             pass
#
#     return insert
#
#     curs.execute("""INSERT OR IGNORE into filaments(
#
#     )""")
#
#     return {}


# endpoint for editing filmaent info
@app.route("/api/filaments/<int:id>/", methods=["PUT"])
def filament_put(id: int):
    conn = get_conn()
    curs = conn.cursor()

    if id > len(fields) + 1:
        return {"error": "Filament index out of range"}, 404

    data = request.get_json()
    key = data["key"]  # ktora hodnota sa ide menit
    value = data["value"]  # na aku hodnotu sa ide menit

    curs.execute(f"UPDATE filaments SET {key} = ? WHERE id = ?", (value, id))
    conn.commit()

    curs.execute("SELECT * FROM filaments WHERE id = ?", (id,))
    resp = curs.fetchone()

    conn.close()

    return jsonify(filaments={fields[i]: resp[i] for i in range(len(fields))})


# endpoint for deleting filaments
@app.route("/api/filaments/<int:id>/", methods=["DELETE"])
def filament_delete(id: int):
    conn = get_conn()
    curs = conn.cursor()

    if id > len(fields) + 1:
        return {"error": "Filament index out of range"}, 404

    curs.execute("SELECT * FROM filaments WHERE id = ?", (id,))
    resp = curs.fetchone()

    if resp is None:
        return {"error": "Filament not found"}, 404

    curs.execute("DELETE FROM filaments WHERE id = ?", (id,))
    conn.commit()

    conn.close()

    return jsonify(filaments={fields[i]: resp[i] for i in range(len(fields))})


# endpoint for info about filments in database
@app.route("/api/info/", methods=["GET"])
def info():
    conn = get_conn()
    curs = conn.cursor()

    curs.execute("SELECT * FROM filaments")
    data = curs.fetchall()

    ids = [i[0] for i in data]

    return {
        "filament_count": len(data),
        "ids": ids,
        "invalid_ids": [i for i in range(len(data)) if i not in ids],
    }


# endpoint for getting images
@app.route("/api/images/<path:filename>/", methods=["GET"])
def get_image(filename: str):
    return send_from_directory("images/", filename)


# running backend
if __name__ == "__main__":
    app.run("0.0.0.0", 5000)
