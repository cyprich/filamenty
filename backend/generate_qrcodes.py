import os
import json
import sqlite3
import qrcode

"""
https://pypi.org/project/qrcode/
"""


def generate_qrcodes():
    # connect to db
    conn = sqlite3.connect("filaments.db")
    curs = conn.cursor()

    # load ip address from file
    with open("./config.json", "r") as file:
        IP = json.load(file)["ip"]

    # URL address with IP
    URL = f"http://{IP}:5000/api/"

    # create directory if it doesnt exist
    DIRECTORY = "images/qr/"
    os.makedirs(DIRECTORY, exist_ok=True)

    # get filaments from db and make qrcode for each one of them
    curs.execute("SELECT * FROM filaments")

    for i in curs.fetchall():
        # data inside QR code
        DATA = f"{URL}/images/filamenty/{i[0]}.png"

        # create qrcode
        qr = qrcode.QRCode(version=None, border=0)  # auto size, no padding
        qr.add_data(DATA)  # QR code data
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")  # make image
        img.save(f"{DIRECTORY}{i[0]}.png")  # save image
