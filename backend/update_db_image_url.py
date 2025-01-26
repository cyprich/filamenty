#!/usr/bin/env python3

import json
import sqlite3


def update_db_image_url(conn: sqlite3.Connection, curs: sqlite3.Cursor):
    # finding out server ip
    with open("config.json", "r") as file:
        IP = json.load(file)["ip"]

    # inserting image urls
    curs.execute("SELECT * FROM filaments")
    for i in curs.fetchall():
        id = i[0]
        curs.execute(
            "UPDATE filaments SET image_url = ? WHERE id = ?",
            (f"http://{IP}:5000/api/images/filaments/{id}.png", id),
        )

    conn.commit()
