#!/usr/bin/env python3

import json
import os
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


# connects to database and returns the connection
def get_conn() -> sqlite3.Connection:
    return sqlite3.connect("filaments.db", check_same_thread=False)


# initialize app
app = Flask(__name__)
CORS(app)


# /api endpoint
@app.route("/api/", methods=["GET"])
def index():
    return jsonify(message="Hello from backend!")


# endpoint for getting all info about filaments
@app.route("/api/filaments/", methods=["GET"])
def filaments():
    conn = get_conn()
    curs = conn.cursor()

    curs.execute("SELECT * FROM filaments")

    parsed_filaments: list[dict[str, Any]] = []

    for row in curs.fetchall():
        parsed_filaments.append({fields[i]: row[i] for i in range(len(fields))})

    conn.close()
    return jsonify(filaments=parsed_filaments)


# endpoint for getting info about specific filament by it's id
@app.route("/api/filaments/<int:id>/", methods=["GET"])
def filament(id: int):
    conn = get_conn()
    curs = conn.cursor()

    curs.execute("SELECT * FROM filaments WHERE id=?", (id,))
    resp = curs.fetchone()

    if resp is None:
        return {"error": "Filament not found"}, 404

    conn.close()
    return jsonify(filaments={fields[i]: resp[i] for i in range(len(fields))})


# endpoint for getting info about random filament
@app.route("/api/filaments/random/", methods=["GET"])
def filament_random():
    # get all available filaments
    response = requests.get(f"http://{IP}:5000/api/info/")

    if response.status_code != 200:
        return {"error": "Failed to get info"}, 500

    id = random.choice(response.json()["ids"])

    return requests.get(f"http://{IP}:5000/api/filaments/{id}/").json()


# endpoint for adding filaments
@app.route("/api/filaments/", methods=["POST"])
def filament_post():
    conn = get_conn()
    curs = conn.cursor()

    data = {}

    # add all provided data to "data" variable
    for i in range(len(fields)):
        try:
            data[fields[i]] = request.form.get(fields[i])
        except Exception:
            pass

    # only values which user provided
    valid_fields = [i for i in data.keys() if data[i] is not None]
    valid_values = [data[i] for i in valid_fields]

    # string = f"INSERT OR IGNORE INTO filaments {[i for i in valid_fields]}, VALUES ({'?,' * len(valid_fields)})"
    string = f"INSERT OR IGNORE INTO filaments ({','.join(valid_fields)}) VALUES ({','.join(['?'] * len(valid_fields))})"

    curs.execute(string, valid_values)
    conn.commit()

    # find id of new added filament
    curs.execute(
        "SELECT * FROM filaments WHERE vendor=? AND material=? AND color_hex=?",
        (data["vendor"], data["material"], data["color_hex"]),
    )

    id = curs.fetchone()[0]
    image = request.files.get("image")

    if image and image.filename:
        extension = image.filename.split(".")[-1]
        image.save(f"images/filaments/{id}.{extension}")

        curs.execute(
            "UPDATE filaments SET image_url=? WHERE id=?",
            (f"http://{IP}:5000/api/images/filaments/{id}.{extension}", id),
        )

        conn.commit()

        generate_qrcodes(id)

    return requests.get(f"http://{IP}:5000/api/filaments/{id}/").json()


# endpoint for editing filmaent info
@app.route("/api/filaments/<int:id>/", methods=["PUT"])
def filament_put(id: int):
    conn = get_conn()
    curs = conn.cursor()

    data = request.get_json()
    key = data["key"]  # which field is going to be changed
    value = data["value"]  # new value

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

    curs.execute("SELECT * FROM filaments WHERE id = ?", (id,))
    resp = curs.fetchone()

    # filament not in db
    if resp is None:
        return {"error": "Filament not found"}, 404

    curs.execute("DELETE FROM filaments WHERE id = ?", (id,))
    conn.commit()

    # deleting image
    # couldnt get image path from db from "image_url" because it could be fallback image which should not be deleted
    for i in ["jpg", "png"]:
        try:
            os.remove(f"images/filaments/{id}.{i}")
        except Exception:
            pass

    conn.close()

    return jsonify(filaments={fields[i]: resp[i] for i in range(len(fields))})


# endpoint for general info in database
@app.route("/api/info/", methods=["GET"])
def info():
    conn = get_conn()
    curs = conn.cursor()

    curs.execute("SELECT * FROM filaments")
    data = curs.fetchall()

    # ids of filaments in database
    ids = [i[0] for i in data]

    return {
        "filament_count": len(data),  # number of filaments
        "ids": ids,  # valid filament ids
        "invalid_ids": [
            i for i in range(len(data)) if i not in ids
        ],  # invalid filament ids
    }


# endpoint for getting images
@app.route("/api/images/<path:filename>/", methods=["GET"])
def get_image(filename: str):
    return send_from_directory("images/", filename)


# running backend
if __name__ == "__main__":
    app.run("0.0.0.0", 5000)
